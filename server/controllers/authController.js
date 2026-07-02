const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mockDb = require('../utils/mockDb');
const User = require('../models/User');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const { JWT_SECRET } = require('../middleware/auth');

// Register Patient
const register = async (req, res) => {
  const { name, email, password, age, gender, bloodGroup, address } = req.body;

  try {
    // Check if user already exists
    let existingUser;
    if (process.env.USE_MOCK_DB === 'true') {
      existingUser = mockDb.findOne('users', { email });
    } else {
      existingUser = await User.findOne({ email });
    }

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser;
    let newPatient;

    if (process.env.USE_MOCK_DB === 'true') {
      // Create user
      newUser = mockDb.create('users', {
        name,
        email,
        password: hashedPassword,
        role: 'patient',
        profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
      });

      // Create patient profile
      newPatient = mockDb.create('patients', {
        user: newUser._id,
        name,
        age: Number(age) || 30,
        gender: gender || 'Male',
        bloodGroup: bloodGroup || 'O+',
        address: address || '',
        medicalHistory: []
      });
    } else {
      // Create user
      const userModel = new User({
        name,
        email,
        password: hashedPassword,
        role: 'patient',
        profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
      });
      newUser = await userModel.save();

      // Create patient profile
      const patientModel = new Patient({
        user: newUser._id,
        name,
        age: Number(age) || 30,
        gender: gender || 'Male',
        bloodGroup: bloodGroup || 'O+',
        address: address || '',
        medicalHistory: []
      });
      newPatient = await patientModel.save();
    }

    // Generate JWT
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        profileImage: newUser.profileImage
      },
      patient: newPatient
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user;
    if (process.env.USE_MOCK_DB === 'true') {
      user = mockDb.findOne('users', { email });
    } else {
      user = await User.findOne({ email });
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Get additional profile based on role
    let profile = null;
    if (process.env.USE_MOCK_DB === 'true') {
      if (user.role === 'patient') {
        profile = mockDb.findOne('patients', { user: user._id });
      } else if (user.role === 'doctor') {
        profile = mockDb.findOne('doctors', { user: user._id });
      }
    } else {
      if (user.role === 'patient') {
        profile = await Patient.findOne({ user: user._id });
      } else if (user.role === 'doctor') {
        profile = await Doctor.findOne({ user: user._id });
      }
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage
      },
      profile
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// Get current user details
const getMe = async (req, res) => {
  try {
    let user;
    let profile = null;

    if (process.env.USE_MOCK_DB === 'true') {
      user = mockDb.findById('users', req.user.id);
      if (user) {
        if (user.role === 'patient') {
          profile = mockDb.findOne('patients', { user: user._id });
        } else if (user.role === 'doctor') {
          profile = mockDb.findOne('doctors', { user: user._id });
        }
      }
    } else {
      user = await User.findById(req.user.id).select('-password');
      if (user) {
        if (user.role === 'patient') {
          profile = await Patient.findOne({ user: user._id });
        } else if (user.role === 'doctor') {
          profile = await Doctor.findOne({ user: user._id });
        }
      }
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user, profile });
  } catch (error) {
    console.error('GetMe Error:', error);
    res.status(500).json({ message: 'Server error fetching user details' });
  }
};

// Update profile
const updateProfile = async (req, res) => {
  const { name, email, profileImage, age, gender, bloodGroup, address, experience, qualification, fee, availableDays, availableTime } = req.body;

  try {
    let updatedUser;
    
    if (process.env.USE_MOCK_DB === 'true') {
      // Update User
      const userUpdate = {};
      if (name) userUpdate.name = name;
      if (email) userUpdate.email = email;
      if (profileImage) userUpdate.profileImage = profileImage;
      
      updatedUser = mockDb.findByIdAndUpdate('users', req.user.id, userUpdate);

      let updatedProfile = null;
      if (req.user.role === 'patient') {
        const patient = mockDb.findOne('patients', { user: req.user.id });
        if (patient) {
          const patientUpdate = { name: name || patient.name };
          if (age) patientUpdate.age = Number(age);
          if (gender) patientUpdate.gender = gender;
          if (bloodGroup) patientUpdate.bloodGroup = bloodGroup;
          if (address) patientUpdate.address = address;
          
          updatedProfile = mockDb.findByIdAndUpdate('patients', patient._id, patientUpdate);
        }
      } else if (req.user.role === 'doctor') {
        const doctor = mockDb.findOne('doctors', { user: req.user.id });
        if (doctor) {
          const doctorUpdate = { name: name || doctor.name };
          if (experience) doctorUpdate.experience = Number(experience);
          if (qualification) doctorUpdate.qualification = qualification;
          if (fee) doctorUpdate.fee = Number(fee);
          if (availableDays) doctorUpdate.availableDays = availableDays;
          if (availableTime) doctorUpdate.availableTime = availableTime;

          updatedProfile = mockDb.findByIdAndUpdate('doctors', doctor._id, doctorUpdate);
        }
      }

      return res.json({ user: updatedUser, profile: updatedProfile });
    } else {
      // MongoDB Update
      const userUpdate = {};
      if (name) userUpdate.name = name;
      if (email) userUpdate.email = email;
      if (profileImage) userUpdate.profileImage = profileImage;

      updatedUser = await User.findByIdAndUpdate(req.user.id, { $set: userUpdate }, { new: true }).select('-password');

      let updatedProfile = null;
      if (req.user.role === 'patient') {
        const patientUpdate = { name: updatedUser.name };
        if (age) patientUpdate.age = Number(age);
        if (gender) patientUpdate.gender = gender;
        if (bloodGroup) patientUpdate.bloodGroup = bloodGroup;
        if (address) patientUpdate.address = address;

        updatedProfile = await Patient.findOneAndUpdate(
          { user: req.user.id },
          { $set: patientUpdate },
          { new: true }
        );
      } else if (req.user.role === 'doctor') {
        const doctorUpdate = { name: updatedUser.name };
        if (experience) doctorUpdate.experience = Number(experience);
        if (qualification) doctorUpdate.qualification = qualification;
        if (fee) doctorUpdate.fee = Number(fee);
        if (availableDays) doctorUpdate.availableDays = availableDays;
        if (availableTime) doctorUpdate.availableTime = availableTime;

        updatedProfile = await Doctor.findOneAndUpdate(
          { user: req.user.id },
          { $set: doctorUpdate },
          { new: true }
        );
      }

      return res.json({ user: updatedUser, profile: updatedProfile });
    }
  } catch (error) {
    console.error('Update Profile Error:', error);
    res.status(500).json({ message: 'Server error updating profile' });
  }
};

module.exports = {
  register,
  login,
  getMe,
  updateProfile
};
