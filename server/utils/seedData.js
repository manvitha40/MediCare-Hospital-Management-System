const bcrypt = require('bcryptjs');

const getHashedPassword = (password) => bcrypt.hashSync(password, 10);

const getSeedData = () => {
  const adminPwd = getHashedPassword('admin123');
  const doctorPwd = getHashedPassword('doctor123');
  const patientPwd = getHashedPassword('patient123');
  const receptionPwd = getHashedPassword('reception123');

  // ─────────────────────────────────────────
  //  USERS
  // ─────────────────────────────────────────
  const users = [
    // Admin
    { _id: 'u-admin-1', name: 'MediCare Admin', email: 'admin@medicare.com', password: adminPwd, role: 'admin', profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80' },
    // Receptionist
    { _id: 'u-recep-1', name: 'Pooja Sharma', email: 'pooja.reception@medicare.com', password: receptionPwd, role: 'receptionist', profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80' },

    // ── CARDIOLOGY (5 doctors) ──
    { _id: 'u-doc-c1', name: 'Dr. Arjun Mehta', email: 'john@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-c2', name: 'Dr. Priya Sharma', email: 'priya.cardio@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-c3', name: 'Dr. Rajiv Nair', email: 'rajiv.cardio@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-c4', name: 'Dr. Sunita Rao', email: 'sunita.cardio@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-c5', name: 'Dr. Vikram Patel', email: 'vikram.cardio@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=200&q=80' },

    // ── NEUROLOGY (5 doctors) ──
    { _id: 'u-doc-n1', name: 'Dr. Shalini Joshi', email: 'shalini.neuro@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-n2', name: 'Dr. Ravi Kumar', email: 'ravi.neuro@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1618498082410-b4aa22193b9e?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-n3', name: 'Dr. Ananya Iyer', email: 'ananya.neuro@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-n4', name: 'Dr. Suresh Pillai', email: 'suresh.neuro@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-n5', name: 'Dr. Meera Krishnan', email: 'meera.neuro@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=200&q=80' },

    // ── ORTHOPEDICS (5 doctors) ──
    { _id: 'u-doc-o1', name: 'Dr. Kiran Desai', email: 'kiran.ortho@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-o2', name: 'Dr. Nikhil Joshi', email: 'nikhil.ortho@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-o3', name: 'Dr. Pooja Singh', email: 'pooja.ortho@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-o4', name: 'Dr. Aditya Verma', email: 'aditya.ortho@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-o5', name: 'Dr. Lakshmi Reddy', email: 'lakshmi.ortho@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=200&q=80' },

    // ── ENT (5 doctors) ──
    { _id: 'u-doc-e1', name: 'Dr. Amitabh Ghosh', email: 'amitabh.ent@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-e2', name: 'Dr. Deepa Menon', email: 'deepa.ent@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-e3', name: 'Dr. Farhan Qureshi', email: 'farhan.ent@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1618498082410-b4aa22193b9e?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-e4', name: 'Dr. Geeta Nambiar', email: 'geeta.ent@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-e5', name: 'Dr. Harish Tiwari', email: 'harish.ent@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=200&q=80' },

    // ── OPHTHALMOLOGY (5 doctors) ──
    { _id: 'u-doc-op1', name: 'Dr. Isha Kapoor', email: 'isha.eye@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-op2', name: 'Dr. Jagannath Rao', email: 'jagannath.eye@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-op3', name: 'Dr. Kavitha Anand', email: 'kavitha.eye@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-op4', name: 'Dr. Lalit Choudhary', email: 'lalit.eye@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-op5', name: 'Dr. Madhuri Shah', email: 'madhuri.eye@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=200&q=80' },

    // ── DERMATOLOGY (5 doctors) ──
    { _id: 'u-doc-d1', name: 'Dr. Nalini Bose', email: 'nalini.derm@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-d2', name: 'Dr. Omar Sheikh', email: 'omar.derm@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1618498082410-b4aa22193b9e?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-d3', name: 'Dr. Padma Venkat', email: 'padma.derm@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-d4', name: 'Dr. Qasim Ali', email: 'qasim.derm@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-d5', name: 'Dr. Rekha Pillai', email: 'rekha.derm@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80' },

    // ── GENERAL MEDICINE (5 doctors) ──
    { _id: 'u-doc-g1', name: 'Dr. Alok Mishra', email: 'alok.gm@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-g2', name: 'Dr. Shyam Gupta', email: 'shyam.gm@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-g3', name: 'Dr. Tara Sinha', email: 'tara.gm@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-g4', name: 'Dr. Uday Mishra', email: 'uday.gm@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-g5', name: 'Dr. Vandana Jain', email: 'vandana.gm@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=200&q=80' },

    // ── PEDIATRICS (5 doctors) ──
    { _id: 'u-doc-p1', name: 'Dr. Waqar Hussain', email: 'waqar.peds@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1618498082410-b4aa22193b9e?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-p2', name: 'Dr. Yamini Reddy', email: 'yamini.peds@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-p3', name: 'Dr. Zaheer Khan', email: 'zaheer.peds@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-p4', name: 'Dr. Anjali Dubey', email: 'anjali.peds@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-p5', name: 'Dr. Bhavesh Pandya', email: 'bhavesh.peds@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=200&q=80' },

    // ── GYNECOLOGY (5 doctors) ──
    { _id: 'u-doc-gy1', name: 'Dr. Chitra Rao', email: 'chitra.gyn@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-gy2', name: 'Dr. Divya Bhat', email: 'divya.gyn@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-gy3', name: 'Dr. Eesha Kulkarni', email: 'eesha.gyn@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-gy4', name: 'Dr. Farah Mirza', email: 'farah.gyn@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-gy5', name: 'Dr. Gita Nair', email: 'gita.gyn@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=200&q=80' },

    // ── GASTROENTEROLOGY (5 doctors) ──
    { _id: 'u-doc-ga1', name: 'Dr. Harendra Sahu', email: 'harendra.gastro@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1618498082410-b4aa22193b9e?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-ga2', name: 'Dr. Indra Basu', email: 'indra.gastro@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-ga3', name: 'Dr. Jaya Krishnan', email: 'jaya.gastro@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-ga4', name: 'Dr. Keshav Agarwal', email: 'keshav.gastro@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-ga5', name: 'Dr. Leela Iyer', email: 'leela.gastro@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80' },

    // ── PULMONOLOGY (5 doctors) ──
    { _id: 'u-doc-pu1', name: 'Dr. Mahesh Gopal', email: 'mahesh.pulmo@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-pu2', name: 'Dr. Neha Bhatt', email: 'neha.pulmo@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-pu3', name: 'Dr. Om Prakash', email: 'om.pulmo@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-pu4', name: 'Dr. Preeti Das', email: 'preeti.pulmo@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-pu5', name: 'Dr. Rajan Saxena', email: 'rajan.pulmo@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1618498082410-b4aa22193b9e?auto=format&fit=crop&w=200&q=80' },

    // ── ENDOCRINOLOGY (5 doctors) ──
    { _id: 'u-doc-en1', name: 'Dr. Savita Chouhan', email: 'savita.endo@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-en2', name: 'Dr. Tarun Kapoor', email: 'tarun.endo@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-en3', name: 'Dr. Uma Shankar', email: 'uma.endo@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-en4', name: 'Dr. Venu Gopal', email: 'venu.endo@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-en5', name: 'Dr. Warsha Mehta', email: 'warsha.endo@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=200&q=80' },

    // ── UROLOGY (5 doctors) ──
    { _id: 'u-doc-u1', name: 'Dr. Xavier D\'Souza', email: 'xavier.uro@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1618498082410-b4aa22193b9e?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-u2', name: 'Dr. Yashwant Patil', email: 'yashwant.uro@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-u3', name: 'Dr. Zubin Contractor', email: 'zubin.uro@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-u4', name: 'Dr. Abha Goel', email: 'abha.uro@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-u5', name: 'Dr. Bhushan More', email: 'bhushan.uro@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=200&q=80' },

    // ── ONCOLOGY (5 doctors) ──
    { _id: 'u-doc-on1', name: 'Dr. Chetna Saxena', email: 'chetna.onco@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-on2', name: 'Dr. Dinesh Rajan', email: 'dinesh.onco@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-on3', name: 'Dr. Esha Tomar', email: 'esha.onco@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-on4', name: 'Dr. Firoz Khan', email: 'firoz.onco@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-on5', name: 'Dr. Girija Shankar', email: 'girija.onco@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=200&q=80' },

    // ── PSYCHIATRY (5 doctors) ──
    { _id: 'u-doc-ps1', name: 'Dr. Hemal Vora', email: 'hemal.psych@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1618498082410-b4aa22193b9e?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-ps2', name: 'Dr. Indrani Paul', email: 'indrani.psych@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-ps3', name: 'Dr. Jayesh Trivedi', email: 'jayesh.psych@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-ps4', name: 'Dr. Kalpana Misra', email: 'kalpana.psych@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-ps5', name: 'Dr. Lokesh Yadav', email: 'lokesh.psych@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80' },

    // ── NEPHROLOGY (5 doctors) ──
    { _id: 'u-doc-ne1', name: 'Dr. Manisha Thakur', email: 'manisha.nephro@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-ne2', name: 'Dr. Navneet Gill', email: 'navneet.nephro@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-ne3', name: 'Dr. Ojas Dixit', email: 'ojas.nephro@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-ne4', name: 'Dr. Prabhavathi S', email: 'prabhavathi.nephro@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-ne5', name: 'Dr. Rageeth Varma', email: 'rageeth.nephro@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1618498082410-b4aa22193b9e?auto=format&fit=crop&w=200&q=80' },

    // ── RHEUMATOLOGY (5 doctors) ──
    { _id: 'u-doc-r1', name: 'Dr. Sandhya Bose', email: 'sandhya.rheum@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-r2', name: 'Dr. Trivikram Rao', email: 'trivikram.rheum@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-r3', name: 'Dr. Urmila Thadani', email: 'urmila.rheum@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-r4', name: 'Dr. Vimal Agnihotri', email: 'vimal.rheum@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-doc-r5', name: 'Dr. Wasim Baig', email: 'wasim.rheum@medicare.com', password: doctorPwd, role: 'doctor', profileImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80' },

    // ── PATIENTS (30) ──
    { _id: 'u-pat-1', name: 'Rahul Sharma', email: 'rahul@gmail.com', password: patientPwd, role: 'patient', profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-pat-2', name: 'Aisha Malik', email: 'aisha@gmail.com', password: patientPwd, role: 'patient', profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-pat-3', name: 'Priya Desai', email: 'priya.d@gmail.com', password: patientPwd, role: 'patient', profileImage: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-pat-4', name: 'Arun Kumar', email: 'arun@gmail.com', password: patientPwd, role: 'patient', profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-pat-5', name: 'Sita Patel', email: 'sita@gmail.com', password: patientPwd, role: 'patient', profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-pat-6', name: 'Jitendra Verma', email: 'jitendra@gmail.com', password: patientPwd, role: 'patient', profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-pat-7', name: 'Kavya Nair', email: 'kavya@gmail.com', password: patientPwd, role: 'patient', profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-pat-8', name: 'Mohammed Anwar', email: 'mohammed@gmail.com', password: patientPwd, role: 'patient', profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-pat-9', name: 'Sunitha Rao', email: 'sunitha@gmail.com', password: patientPwd, role: 'patient', profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-pat-10', name: 'Devendra Dixit', email: 'devendra@gmail.com', password: patientPwd, role: 'patient', profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-pat-11', name: 'Latika Mishra', email: 'latika@gmail.com', password: patientPwd, role: 'patient', profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-pat-12', name: 'Ajay Pandey', email: 'ajay@gmail.com', password: patientPwd, role: 'patient', profileImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-pat-13', name: 'Riya Banerjee', email: 'riya@gmail.com', password: patientPwd, role: 'patient', profileImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-pat-14', name: 'Karim Shaikh', email: 'karim@gmail.com', password: patientPwd, role: 'patient', profileImage: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-pat-15', name: 'Deepika Singh', email: 'deepika@gmail.com', password: patientPwd, role: 'patient', profileImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-pat-16', name: 'Rohit Malhotra', email: 'rohit@gmail.com', password: patientPwd, role: 'patient', profileImage: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-pat-17', name: 'Anita Joshi', email: 'anita@gmail.com', password: patientPwd, role: 'patient', profileImage: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-pat-18', name: 'Tejas Shah', email: 'tejas@gmail.com', password: patientPwd, role: 'patient', profileImage: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-pat-19', name: 'Pallavi Rao', email: 'pallavi@gmail.com', password: patientPwd, role: 'patient', profileImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-pat-20', name: 'Suresh Menon', email: 'suresh@gmail.com', password: patientPwd, role: 'patient', profileImage: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-pat-21', name: 'Nisha Kapoor', email: 'nisha@gmail.com', password: patientPwd, role: 'patient', profileImage: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-pat-22', name: 'Vikas Yadav', email: 'vikas@gmail.com', password: patientPwd, role: 'patient', profileImage: 'https://images.unsplash.com/photo-1489980508314-941910ded1f4?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-pat-23', name: 'Smita Bhatt', email: 'smita@gmail.com', password: patientPwd, role: 'patient', profileImage: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-pat-24', name: 'Arjun Reddy', email: 'arjun@gmail.com', password: patientPwd, role: 'patient', profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-pat-25', name: 'Pooja Thakkar', email: 'pooja@gmail.com', password: patientPwd, role: 'patient', profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-pat-26', name: 'Nilesh Patil', email: 'nilesh@gmail.com', password: patientPwd, role: 'patient', profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-pat-27', name: 'Geeta Ghosh', email: 'geeta@gmail.com', password: patientPwd, role: 'patient', profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-pat-28', name: 'Sanjay Raut', email: 'sanjay@gmail.com', password: patientPwd, role: 'patient', profileImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-pat-29', name: 'Alka Dixit', email: 'alka@gmail.com', password: patientPwd, role: 'patient', profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' },
    { _id: 'u-pat-30', name: 'Harsh Trivedi', email: 'harsh@gmail.com', password: patientPwd, role: 'patient', profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80' },
  ];

  // ─────────────────────────────────────────
  //  DOCTORS (90 total, 5+ per dept)
  // ─────────────────────────────────────────
  const doctors = [
    // CARDIOLOGY
    { _id: 'd-c1', user: 'u-doc-c1', name: 'Dr. Arjun Mehta', department: 'Cardiology', experience: 18, qualification: 'DM (Cardiology), MD, FACC', fee: 1200, rating: 4.9, reviewCount: 324, availableDays: ['Monday','Wednesday','Friday'], availableTime: '09:00 AM - 02:00 PM' },
    { _id: 'd-c2', user: 'u-doc-c2', name: 'Dr. Priya Sharma', department: 'Cardiology', experience: 14, qualification: 'DM (Cardiology), MD', fee: 1000, rating: 4.7, reviewCount: 218, availableDays: ['Tuesday','Thursday','Saturday'], availableTime: '10:00 AM - 04:00 PM' },
    { _id: 'd-c3', user: 'u-doc-c3', name: 'Dr. Rajiv Nair', department: 'Cardiology', experience: 22, qualification: 'DM (Cardiology), FRCP', fee: 1500, rating: 4.8, reviewCount: 491, availableDays: ['Monday','Tuesday','Wednesday','Friday'], availableTime: '08:00 AM - 01:00 PM' },
    { _id: 'd-c4', user: 'u-doc-c4', name: 'Dr. Sunita Rao', department: 'Cardiology', experience: 9, qualification: 'DM (Cardiology), MD', fee: 800, rating: 4.5, reviewCount: 142, availableDays: ['Wednesday','Thursday','Friday'], availableTime: '02:00 PM - 07:00 PM' },
    { _id: 'd-c5', user: 'u-doc-c5', name: 'Dr. Vikram Patel', department: 'Cardiology', experience: 12, qualification: 'MD, FACC, Interventional Cardiology', fee: 1100, rating: 4.6, reviewCount: 187, availableDays: ['Monday','Wednesday','Saturday'], availableTime: '11:00 AM - 05:00 PM' },

    // NEUROLOGY
    { _id: 'd-n1', user: 'u-doc-n1', name: 'Dr. Shalini Joshi', department: 'Neurology', experience: 15, qualification: 'DM (Neurology), MD', fee: 1100, rating: 4.8, reviewCount: 276, availableDays: ['Monday','Tuesday','Thursday'], availableTime: '09:00 AM - 03:00 PM' },
    { _id: 'd-n2', user: 'u-doc-n2', name: 'Dr. Ravi Kumar', department: 'Neurology', experience: 19, qualification: 'DM (Neurology), FRCP', fee: 1300, rating: 4.9, reviewCount: 412, availableDays: ['Wednesday','Friday','Saturday'], availableTime: '10:00 AM - 04:00 PM' },
    { _id: 'd-n3', user: 'u-doc-n3', name: 'Dr. Ananya Iyer', department: 'Neurology', experience: 11, qualification: 'DM (Neurology), MD', fee: 900, rating: 4.6, reviewCount: 163, availableDays: ['Monday','Wednesday','Friday'], availableTime: '01:00 PM - 06:00 PM' },
    { _id: 'd-n4', user: 'u-doc-n4', name: 'Dr. Suresh Pillai', department: 'Neurology', experience: 25, qualification: 'DM (Neurology), FAAN, MD', fee: 1800, rating: 5.0, reviewCount: 589, availableDays: ['Tuesday','Thursday'], availableTime: '08:00 AM - 01:00 PM' },
    { _id: 'd-n5', user: 'u-doc-n5', name: 'Dr. Meera Krishnan', department: 'Neurology', experience: 7, qualification: 'DM (Neurology), MD', fee: 750, rating: 4.4, reviewCount: 98, availableDays: ['Monday','Tuesday','Wednesday','Thursday','Friday'], availableTime: '02:00 PM - 07:00 PM' },

    // ORTHOPEDICS
    { _id: 'd-o1', user: 'u-doc-o1', name: 'Dr. Kiran Desai', department: 'Orthopedics', experience: 16, qualification: 'MS (Ortho), DNB, FRCS', fee: 1000, rating: 4.7, reviewCount: 302, availableDays: ['Monday','Wednesday','Friday'], availableTime: '09:00 AM - 02:00 PM' },
    { _id: 'd-o2', user: 'u-doc-o2', name: 'Dr. Nikhil Joshi', department: 'Orthopedics', experience: 12, qualification: 'MS (Ortho), Fellowship in Joint Replacement', fee: 1200, rating: 4.8, reviewCount: 241, availableDays: ['Tuesday','Thursday','Saturday'], availableTime: '10:00 AM - 05:00 PM' },
    { _id: 'd-o3', user: 'u-doc-o3', name: 'Dr. Pooja Singh', department: 'Orthopedics', experience: 8, qualification: 'MS (Ortho), DNB', fee: 800, rating: 4.5, reviewCount: 117, availableDays: ['Monday','Tuesday','Thursday','Friday'], availableTime: '11:00 AM - 04:00 PM' },
    { _id: 'd-o4', user: 'u-doc-o4', name: 'Dr. Aditya Verma', department: 'Orthopedics', experience: 20, qualification: 'MS (Ortho), FRCS, Sports Medicine', fee: 1500, rating: 4.9, reviewCount: 443, availableDays: ['Wednesday','Friday'], availableTime: '08:00 AM - 01:00 PM' },
    { _id: 'd-o5', user: 'u-doc-o5', name: 'Dr. Lakshmi Reddy', department: 'Orthopedics', experience: 10, qualification: 'MS (Ortho), Spine Surgery Fellowship', fee: 950, rating: 4.6, reviewCount: 178, availableDays: ['Monday','Wednesday','Saturday'], availableTime: '02:00 PM - 07:00 PM' },

    // ENT
    { _id: 'd-e1', user: 'u-doc-e1', name: 'Dr. Amitabh Ghosh', department: 'ENT', experience: 17, qualification: 'MS (ENT), FRCS (ORL-HNS)', fee: 900, rating: 4.7, reviewCount: 289, availableDays: ['Monday','Wednesday','Friday'], availableTime: '09:00 AM - 03:00 PM' },
    { _id: 'd-e2', user: 'u-doc-e2', name: 'Dr. Deepa Menon', department: 'ENT', experience: 10, qualification: 'MS (ENT), DNB', fee: 700, rating: 4.5, reviewCount: 156, availableDays: ['Tuesday','Thursday','Saturday'], availableTime: '10:00 AM - 04:00 PM' },
    { _id: 'd-e3', user: 'u-doc-e3', name: 'Dr. Farhan Qureshi', department: 'ENT', experience: 13, qualification: 'MS (ENT), Head & Neck Surgery', fee: 850, rating: 4.6, reviewCount: 204, availableDays: ['Monday','Tuesday','Wednesday','Thursday'], availableTime: '01:00 PM - 06:00 PM' },
    { _id: 'd-e4', user: 'u-doc-e4', name: 'Dr. Geeta Nambiar', department: 'ENT', experience: 21, qualification: 'MS (ENT), Cochlear Implant Surgeon', fee: 1400, rating: 4.9, reviewCount: 367, availableDays: ['Wednesday','Friday'], availableTime: '08:00 AM - 01:00 PM' },
    { _id: 'd-e5', user: 'u-doc-e5', name: 'Dr. Harish Tiwari', department: 'ENT', experience: 6, qualification: 'MS (ENT), DNB', fee: 600, rating: 4.3, reviewCount: 87, availableDays: ['Monday','Tuesday','Wednesday','Thursday','Friday'], availableTime: '02:00 PM - 07:00 PM' },

    // OPHTHALMOLOGY
    { _id: 'd-op1', user: 'u-doc-op1', name: 'Dr. Isha Kapoor', department: 'Ophthalmology', experience: 14, qualification: 'MS (Ophth), DOMS, Cataract & LASIK Surgeon', fee: 950, rating: 4.8, reviewCount: 312, availableDays: ['Monday','Wednesday','Friday'], availableTime: '09:00 AM - 02:00 PM' },
    { _id: 'd-op2', user: 'u-doc-op2', name: 'Dr. Jagannath Rao', department: 'Ophthalmology', experience: 20, qualification: 'MS (Ophth), Vitreoretinal Surgery', fee: 1300, rating: 4.9, reviewCount: 428, availableDays: ['Tuesday','Thursday'], availableTime: '10:00 AM - 04:00 PM' },
    { _id: 'd-op3', user: 'u-doc-op3', name: 'Dr. Kavitha Anand', department: 'Ophthalmology', experience: 9, qualification: 'MS (Ophth), DNB', fee: 800, rating: 4.5, reviewCount: 131, availableDays: ['Monday','Tuesday','Thursday','Friday'], availableTime: '11:00 AM - 05:00 PM' },
    { _id: 'd-op4', user: 'u-doc-op4', name: 'Dr. Lalit Choudhary', department: 'Ophthalmology', experience: 16, qualification: 'MS (Ophth), Glaucoma Specialist', fee: 1100, rating: 4.7, reviewCount: 267, availableDays: ['Wednesday','Friday','Saturday'], availableTime: '08:00 AM - 01:00 PM' },
    { _id: 'd-op5', user: 'u-doc-op5', name: 'Dr. Madhuri Shah', department: 'Ophthalmology', experience: 11, qualification: 'MS (Ophth), Cornea & External Diseases', fee: 900, rating: 4.6, reviewCount: 189, availableDays: ['Monday','Wednesday','Saturday'], availableTime: '02:00 PM - 07:00 PM' },

    // DERMATOLOGY
    { _id: 'd-d1', user: 'u-doc-d1', name: 'Dr. Nalini Bose', department: 'Dermatology', experience: 13, qualification: 'MD (Dermatology), DVD', fee: 850, rating: 4.7, reviewCount: 234, availableDays: ['Monday','Wednesday','Friday'], availableTime: '09:00 AM - 03:00 PM' },
    { _id: 'd-d2', user: 'u-doc-d2', name: 'Dr. Omar Sheikh', department: 'Dermatology', experience: 8, qualification: 'MD (Dermatology), Fellowship in Cosmetic Derm', fee: 1000, rating: 4.6, reviewCount: 198, availableDays: ['Tuesday','Thursday','Saturday'], availableTime: '10:00 AM - 05:00 PM' },
    { _id: 'd-d3', user: 'u-doc-d3', name: 'Dr. Padma Venkat', department: 'Dermatology', experience: 19, qualification: 'MD (Dermatology), FRCP', fee: 1200, rating: 4.8, reviewCount: 345, availableDays: ['Monday','Tuesday','Thursday'], availableTime: '01:00 PM - 06:00 PM' },
    { _id: 'd-d4', user: 'u-doc-d4', name: 'Dr. Qasim Ali', department: 'Dermatology', experience: 6, qualification: 'MD (Dermatology), Trichology Certificate', fee: 700, rating: 4.3, reviewCount: 92, availableDays: ['Wednesday','Friday'], availableTime: '08:00 AM - 01:00 PM' },
    { _id: 'd-d5', user: 'u-doc-d5', name: 'Dr. Rekha Pillai', department: 'Dermatology', experience: 15, qualification: 'MD (Dermatology), Laser Dermatology', fee: 1100, rating: 4.7, reviewCount: 276, availableDays: ['Monday','Wednesday','Thursday','Friday'], availableTime: '02:00 PM - 07:00 PM' },

    // GENERAL MEDICINE
    { _id: 'd-g1', user: 'u-doc-g1', name: 'Dr. Alok Mishra', department: 'General Medicine', experience: 8, qualification: 'MBBS, MD (Internal Medicine)', fee: 500, rating: 4.5, reviewCount: 312, availableDays: ['Monday','Tuesday','Wednesday','Thursday','Friday'], availableTime: '10:00 AM - 04:00 PM' },
    { _id: 'd-g2', user: 'u-doc-g2', name: 'Dr. Shyam Gupta', department: 'General Medicine', experience: 22, qualification: 'MD (Medicine), DNB, FCPS', fee: 700, rating: 4.8, reviewCount: 521, availableDays: ['Monday','Wednesday','Friday'], availableTime: '09:00 AM - 02:00 PM' },
    { _id: 'd-g3', user: 'u-doc-g3', name: 'Dr. Tara Sinha', department: 'General Medicine', experience: 11, qualification: 'MD (Medicine), Fellowship in Critical Care', fee: 600, rating: 4.6, reviewCount: 204, availableDays: ['Tuesday','Thursday','Saturday'], availableTime: '11:00 AM - 05:00 PM' },
    { _id: 'd-g4', user: 'u-doc-g4', name: 'Dr. Uday Mishra', department: 'General Medicine', experience: 15, qualification: 'MD (Medicine), Diabetes Specialist', fee: 650, rating: 4.7, reviewCount: 289, availableDays: ['Monday','Tuesday','Thursday'], availableTime: '08:00 AM - 01:00 PM' },
    { _id: 'd-g5', user: 'u-doc-g5', name: 'Dr. Vandana Jain', department: 'General Medicine', experience: 6, qualification: 'MBBS, MD (Medicine)', fee: 450, rating: 4.3, reviewCount: 128, availableDays: ['Wednesday','Friday'], availableTime: '02:00 PM - 07:00 PM' },

    // PEDIATRICS
    { _id: 'd-p1', user: 'u-doc-p1', name: 'Dr. Waqar Hussain', department: 'Pediatrics', experience: 14, qualification: 'MD (Pediatrics), DNB, Fellowship Neonatology', fee: 800, rating: 4.7, reviewCount: 387, availableDays: ['Monday','Wednesday','Friday'], availableTime: '09:00 AM - 02:00 PM' },
    { _id: 'd-p2', user: 'u-doc-p2', name: 'Dr. Yamini Reddy', department: 'Pediatrics', experience: 10, qualification: 'MD (Pediatrics), IAP Member', fee: 650, rating: 4.6, reviewCount: 243, availableDays: ['Tuesday','Thursday','Saturday'], availableTime: '10:00 AM - 04:00 PM' },
    { _id: 'd-p3', user: 'u-doc-p3', name: 'Dr. Zaheer Khan', department: 'Pediatrics', experience: 18, qualification: 'MD (Pediatrics), Pediatric Intensivist', fee: 1000, rating: 4.8, reviewCount: 412, availableDays: ['Monday','Tuesday','Thursday'], availableTime: '01:00 PM - 06:00 PM' },
    { _id: 'd-p4', user: 'u-doc-p4', name: 'Dr. Anjali Dubey', department: 'Pediatrics', experience: 7, qualification: 'MD (Pediatrics), Child Development Specialist', fee: 600, rating: 4.5, reviewCount: 167, availableDays: ['Wednesday','Friday'], availableTime: '08:00 AM - 01:00 PM' },
    { _id: 'd-p5', user: 'u-doc-p5', name: 'Dr. Bhavesh Pandya', department: 'Pediatrics', experience: 12, qualification: 'MD (Pediatrics), Pediatric Neurology', fee: 850, rating: 4.7, reviewCount: 298, availableDays: ['Monday','Wednesday','Thursday','Friday'], availableTime: '02:00 PM - 07:00 PM' },

    // GYNECOLOGY
    { _id: 'd-gy1', user: 'u-doc-gy1', name: 'Dr. Chitra Rao', department: 'Gynecology', experience: 20, qualification: 'MD (OBG), FRCOG, Laparoscopic Surgeon', fee: 1100, rating: 4.9, reviewCount: 541, availableDays: ['Monday','Wednesday','Friday'], availableTime: '09:00 AM - 02:00 PM' },
    { _id: 'd-gy2', user: 'u-doc-gy2', name: 'Dr. Divya Bhat', department: 'Gynecology', experience: 12, qualification: 'MD (OBG), DNB, Fertility Specialist', fee: 1200, rating: 4.8, reviewCount: 367, availableDays: ['Tuesday','Thursday','Saturday'], availableTime: '10:00 AM - 04:00 PM' },
    { _id: 'd-gy3', user: 'u-doc-gy3', name: 'Dr. Eesha Kulkarni', department: 'Gynecology', experience: 9, qualification: 'MD (OBG), DNB', fee: 900, rating: 4.6, reviewCount: 213, availableDays: ['Monday','Tuesday','Thursday','Friday'], availableTime: '11:00 AM - 05:00 PM' },
    { _id: 'd-gy4', user: 'u-doc-gy4', name: 'Dr. Farah Mirza', department: 'Gynecology', experience: 15, qualification: 'MD (OBG), Maternal-Fetal Medicine', fee: 1300, rating: 4.8, reviewCount: 432, availableDays: ['Wednesday','Friday'], availableTime: '08:00 AM - 01:00 PM' },
    { _id: 'd-gy5', user: 'u-doc-gy5', name: 'Dr. Gita Nair', department: 'Gynecology', experience: 7, qualification: 'MD (OBG), Gynec Oncology Fellow', fee: 800, rating: 4.5, reviewCount: 156, availableDays: ['Monday','Wednesday','Saturday'], availableTime: '02:00 PM - 07:00 PM' },

    // GASTROENTEROLOGY
    { _id: 'd-ga1', user: 'u-doc-ga1', name: 'Dr. Harendra Sahu', department: 'Gastroenterology', experience: 17, qualification: 'DM (Gastroenterology), MD, Advanced Endoscopy', fee: 1100, rating: 4.7, reviewCount: 298, availableDays: ['Monday','Wednesday','Friday'], availableTime: '09:00 AM - 02:00 PM' },
    { _id: 'd-ga2', user: 'u-doc-ga2', name: 'Dr. Indra Basu', department: 'Gastroenterology', experience: 11, qualification: 'DM (Gastroenterology), MD', fee: 900, rating: 4.6, reviewCount: 189, availableDays: ['Tuesday','Thursday','Saturday'], availableTime: '10:00 AM - 05:00 PM' },
    { _id: 'd-ga3', user: 'u-doc-ga3', name: 'Dr. Jaya Krishnan', department: 'Gastroenterology', experience: 14, qualification: 'DM (Gastroenterology), Hepatology Fellow', fee: 1000, rating: 4.7, reviewCount: 234, availableDays: ['Monday','Tuesday','Thursday'], availableTime: '01:00 PM - 06:00 PM' },
    { _id: 'd-ga4', user: 'u-doc-ga4', name: 'Dr. Keshav Agarwal', department: 'Gastroenterology', experience: 22, qualification: 'DM (Gastroenterology), FRCP, Hepatologist', fee: 1500, rating: 4.9, reviewCount: 487, availableDays: ['Wednesday','Friday'], availableTime: '08:00 AM - 01:00 PM' },
    { _id: 'd-ga5', user: 'u-doc-ga5', name: 'Dr. Leela Iyer', department: 'Gastroenterology', experience: 7, qualification: 'DM (Gastroenterology), MD', fee: 800, rating: 4.4, reviewCount: 112, availableDays: ['Monday','Wednesday','Thursday','Friday'], availableTime: '02:00 PM - 07:00 PM' },

    // PULMONOLOGY
    { _id: 'd-pu1', user: 'u-doc-pu1', name: 'Dr. Mahesh Gopal', department: 'Pulmonology', experience: 16, qualification: 'DM (Pulmonology), MD, Critical Care', fee: 1000, rating: 4.7, reviewCount: 267, availableDays: ['Monday','Wednesday','Friday'], availableTime: '09:00 AM - 02:00 PM' },
    { _id: 'd-pu2', user: 'u-doc-pu2', name: 'Dr. Neha Bhatt', department: 'Pulmonology', experience: 9, qualification: 'MD (Chest & TB), DM Respiratory Medicine', fee: 800, rating: 4.5, reviewCount: 143, availableDays: ['Tuesday','Thursday','Saturday'], availableTime: '10:00 AM - 04:00 PM' },
    { _id: 'd-pu3', user: 'u-doc-pu3', name: 'Dr. Om Prakash', department: 'Pulmonology', experience: 13, qualification: 'DM (Pulmonology), Interventional Bronchoscopy', fee: 950, rating: 4.6, reviewCount: 198, availableDays: ['Monday','Tuesday','Thursday'], availableTime: '01:00 PM - 06:00 PM' },
    { _id: 'd-pu4', user: 'u-doc-pu4', name: 'Dr. Preeti Das', department: 'Pulmonology', experience: 20, qualification: 'DM (Pulmonology), FRCP, Sleep Medicine', fee: 1200, rating: 4.8, reviewCount: 356, availableDays: ['Wednesday','Friday'], availableTime: '08:00 AM - 01:00 PM' },
    { _id: 'd-pu5', user: 'u-doc-pu5', name: 'Dr. Rajan Saxena', department: 'Pulmonology', experience: 7, qualification: 'MD (Medicine), DM Pulmonology', fee: 700, rating: 4.4, reviewCount: 97, availableDays: ['Monday','Wednesday','Saturday'], availableTime: '02:00 PM - 07:00 PM' },

    // ENDOCRINOLOGY
    { _id: 'd-en1', user: 'u-doc-en1', name: 'Dr. Savita Chouhan', department: 'Endocrinology', experience: 15, qualification: 'DM (Endocrinology), MD, Diabetes & Thyroid', fee: 1000, rating: 4.7, reviewCount: 312, availableDays: ['Monday','Wednesday','Friday'], availableTime: '09:00 AM - 02:00 PM' },
    { _id: 'd-en2', user: 'u-doc-en2', name: 'Dr. Tarun Kapoor', department: 'Endocrinology', experience: 11, qualification: 'DM (Endocrinology), MD', fee: 850, rating: 4.6, reviewCount: 214, availableDays: ['Tuesday','Thursday','Saturday'], availableTime: '10:00 AM - 04:00 PM' },
    { _id: 'd-en3', user: 'u-doc-en3', name: 'Dr. Uma Shankar', department: 'Endocrinology', experience: 19, qualification: 'DM (Endocrinology), FRCP, Reproductive Endo', fee: 1300, rating: 4.8, reviewCount: 389, availableDays: ['Monday','Tuesday','Thursday'], availableTime: '01:00 PM - 06:00 PM' },
    { _id: 'd-en4', user: 'u-doc-en4', name: 'Dr. Venu Gopal', department: 'Endocrinology', experience: 8, qualification: 'MD (Medicine), DM Endocrinology', fee: 750, rating: 4.4, reviewCount: 134, availableDays: ['Wednesday','Friday'], availableTime: '08:00 AM - 01:00 PM' },
    { _id: 'd-en5', user: 'u-doc-en5', name: 'Dr. Warsha Mehta', department: 'Endocrinology', experience: 13, qualification: 'DM (Endocrinology), Obesity Medicine', fee: 950, rating: 4.7, reviewCount: 243, availableDays: ['Monday','Wednesday','Thursday','Saturday'], availableTime: '02:00 PM - 07:00 PM' },

    // UROLOGY
    { _id: 'd-u1', user: 'u-doc-u1', name: 'Dr. Xavier D\'Souza', department: 'Urology', experience: 17, qualification: 'MCh (Urology), MS, Robotic Surgery', fee: 1200, rating: 4.8, reviewCount: 298, availableDays: ['Monday','Wednesday','Friday'], availableTime: '09:00 AM - 02:00 PM' },
    { _id: 'd-u2', user: 'u-doc-u2', name: 'Dr. Yashwant Patil', department: 'Urology', experience: 12, qualification: 'MCh (Urology), DNB, Endourology', fee: 1000, rating: 4.6, reviewCount: 212, availableDays: ['Tuesday','Thursday','Saturday'], availableTime: '10:00 AM - 04:00 PM' },
    { _id: 'd-u3', user: 'u-doc-u3', name: 'Dr. Zubin Contractor', department: 'Urology', experience: 21, qualification: 'MCh (Urology), Uro-Oncology Fellow', fee: 1500, rating: 4.9, reviewCount: 456, availableDays: ['Monday','Tuesday','Thursday'], availableTime: '01:00 PM - 06:00 PM' },
    { _id: 'd-u4', user: 'u-doc-u4', name: 'Dr. Abha Goel', department: 'Urology', experience: 9, qualification: 'MCh (Urology), Female Urology', fee: 900, rating: 4.5, reviewCount: 143, availableDays: ['Wednesday','Friday'], availableTime: '08:00 AM - 01:00 PM' },
    { _id: 'd-u5', user: 'u-doc-u5', name: 'Dr. Bhushan More', department: 'Urology', experience: 14, qualification: 'MCh (Urology), Andrology Specialist', fee: 1100, rating: 4.7, reviewCount: 267, availableDays: ['Monday','Wednesday','Saturday'], availableTime: '02:00 PM - 07:00 PM' },

    // ONCOLOGY
    { _id: 'd-on1', user: 'u-doc-on1', name: 'Dr. Chetna Saxena', department: 'Oncology', experience: 18, qualification: 'DM (Medical Oncology), MD, ESMO', fee: 1500, rating: 4.8, reviewCount: 312, availableDays: ['Monday','Wednesday','Friday'], availableTime: '09:00 AM - 02:00 PM' },
    { _id: 'd-on2', user: 'u-doc-on2', name: 'Dr. Dinesh Rajan', department: 'Oncology', experience: 14, qualification: 'DM (Oncology), Surgical Oncology, FICS', fee: 1300, rating: 4.7, reviewCount: 256, availableDays: ['Tuesday','Thursday','Saturday'], availableTime: '10:00 AM - 04:00 PM' },
    { _id: 'd-on3', user: 'u-doc-on3', name: 'Dr. Esha Tomar', department: 'Oncology', experience: 10, qualification: 'MD (Radiation Oncology), PGIMER', fee: 1200, rating: 4.6, reviewCount: 187, availableDays: ['Monday','Tuesday','Thursday'], availableTime: '01:00 PM - 06:00 PM' },
    { _id: 'd-on4', user: 'u-doc-on4', name: 'Dr. Firoz Khan', department: 'Oncology', experience: 23, qualification: 'DM (Oncology), Hematology, FRCP', fee: 2000, rating: 4.9, reviewCount: 534, availableDays: ['Wednesday','Friday'], availableTime: '08:00 AM - 01:00 PM' },
    { _id: 'd-on5', user: 'u-doc-on5', name: 'Dr. Girija Shankar', department: 'Oncology', experience: 8, qualification: 'DM (Oncology), Palliative Care', fee: 1000, rating: 4.5, reviewCount: 142, availableDays: ['Monday','Wednesday','Thursday','Saturday'], availableTime: '02:00 PM - 07:00 PM' },

    // PSYCHIATRY
    { _id: 'd-ps1', user: 'u-doc-ps1', name: 'Dr. Hemal Vora', department: 'Psychiatry', experience: 16, qualification: 'MD (Psychiatry), MRCPsych UK', fee: 1000, rating: 4.7, reviewCount: 276, availableDays: ['Monday','Wednesday','Friday'], availableTime: '09:00 AM - 02:00 PM' },
    { _id: 'd-ps2', user: 'u-doc-ps2', name: 'Dr. Indrani Paul', department: 'Psychiatry', experience: 12, qualification: 'MD (Psychiatry), CBT Certified', fee: 900, rating: 4.6, reviewCount: 198, availableDays: ['Tuesday','Thursday','Saturday'], availableTime: '10:00 AM - 04:00 PM' },
    { _id: 'd-ps3', user: 'u-doc-ps3', name: 'Dr. Jayesh Trivedi', department: 'Psychiatry', experience: 20, qualification: 'MD (Psychiatry), Child & Adolescent Psych', fee: 1200, rating: 4.8, reviewCount: 387, availableDays: ['Monday','Tuesday','Thursday'], availableTime: '01:00 PM - 06:00 PM' },
    { _id: 'd-ps4', user: 'u-doc-ps4', name: 'Dr. Kalpana Misra', department: 'Psychiatry', experience: 8, qualification: 'MD (Psychiatry), Addiction Medicine', fee: 850, rating: 4.5, reviewCount: 134, availableDays: ['Wednesday','Friday'], availableTime: '08:00 AM - 01:00 PM' },
    { _id: 'd-ps5', user: 'u-doc-ps5', name: 'Dr. Lokesh Yadav', department: 'Psychiatry', experience: 14, qualification: 'MD (Psychiatry), Geriatric Psychiatry', fee: 950, rating: 4.7, reviewCount: 243, availableDays: ['Monday','Wednesday','Thursday','Saturday'], availableTime: '02:00 PM - 07:00 PM' },

    // NEPHROLOGY
    { _id: 'd-ne1', user: 'u-doc-ne1', name: 'Dr. Manisha Thakur', department: 'Nephrology', experience: 15, qualification: 'DM (Nephrology), MD, Transplant Medicine', fee: 1100, rating: 4.7, reviewCount: 267, availableDays: ['Monday','Wednesday','Friday'], availableTime: '09:00 AM - 02:00 PM' },
    { _id: 'd-ne2', user: 'u-doc-ne2', name: 'Dr. Navneet Gill', department: 'Nephrology', experience: 11, qualification: 'DM (Nephrology), Dialysis Specialist', fee: 950, rating: 4.6, reviewCount: 189, availableDays: ['Tuesday','Thursday','Saturday'], availableTime: '10:00 AM - 04:00 PM' },
    { _id: 'd-ne3', user: 'u-doc-ne3', name: 'Dr. Ojas Dixit', department: 'Nephrology', experience: 18, qualification: 'DM (Nephrology), MD, FRCP', fee: 1300, rating: 4.8, reviewCount: 342, availableDays: ['Monday','Tuesday','Thursday'], availableTime: '01:00 PM - 06:00 PM' },
    { _id: 'd-ne4', user: 'u-doc-ne4', name: 'Dr. Prabhavathi S', department: 'Nephrology', experience: 7, qualification: 'MD (Medicine), DM Nephrology', fee: 800, rating: 4.4, reviewCount: 112, availableDays: ['Wednesday','Friday'], availableTime: '08:00 AM - 01:00 PM' },
    { _id: 'd-ne5', user: 'u-doc-ne5', name: 'Dr. Rageeth Varma', department: 'Nephrology', experience: 22, qualification: 'DM (Nephrology), Renal Transplant Surgeon', fee: 1500, rating: 4.9, reviewCount: 478, availableDays: ['Monday','Wednesday','Thursday','Saturday'], availableTime: '02:00 PM - 07:00 PM' },

    // RHEUMATOLOGY
    { _id: 'd-r1', user: 'u-doc-r1', name: 'Dr. Sandhya Bose', department: 'Rheumatology', experience: 16, qualification: 'DM (Rheumatology), MD', fee: 950, rating: 4.7, reviewCount: 234, availableDays: ['Monday','Wednesday','Friday'], availableTime: '09:00 AM - 02:00 PM' },
    { _id: 'd-r2', user: 'u-doc-r2', name: 'Dr. Trivikram Rao', department: 'Rheumatology', experience: 12, qualification: 'DM (Rheumatology), Clinical Immunology', fee: 900, rating: 4.6, reviewCount: 189, availableDays: ['Tuesday','Thursday','Saturday'], availableTime: '10:00 AM - 04:00 PM' },
    { _id: 'd-r3', user: 'u-doc-r3', name: 'Dr. Urmila Thadani', department: 'Rheumatology', experience: 20, qualification: 'DM (Rheumatology), MD, FRCP', fee: 1200, rating: 4.8, reviewCount: 356, availableDays: ['Monday','Tuesday','Thursday'], availableTime: '01:00 PM - 06:00 PM' },
    { _id: 'd-r4', user: 'u-doc-r4', name: 'Dr. Vimal Agnihotri', department: 'Rheumatology', experience: 9, qualification: 'MD (Medicine), DM Rheumatology', fee: 800, rating: 4.5, reviewCount: 143, availableDays: ['Wednesday','Friday'], availableTime: '08:00 AM - 01:00 PM' },
    { _id: 'd-r5', user: 'u-doc-r5', name: 'Dr. Wasim Baig', department: 'Rheumatology', experience: 14, qualification: 'DM (Rheumatology), Autoimmune Diseases', fee: 1000, rating: 4.7, reviewCount: 267, availableDays: ['Monday','Wednesday','Thursday','Saturday'], availableTime: '02:00 PM - 07:00 PM' },
  ];

  // ─────────────────────────────────────────
  //  PATIENTS (30)
  // ─────────────────────────────────────────
  const patients = [
    { _id: 'p-1', user: 'u-pat-1', name: 'Rahul Sharma', age: 28, gender: 'Male', bloodGroup: 'O+', address: '12 MG Road, Bengaluru', medicalHistory: ['Hypertension', 'Dust Allergy'] },
    { _id: 'p-2', user: 'u-pat-2', name: 'Aisha Malik', age: 34, gender: 'Female', bloodGroup: 'A-', address: '45 Park Street, Kolkata', medicalHistory: ['Migraine', 'Appendectomy (2022)'] },
    { _id: 'p-3', user: 'u-pat-3', name: 'Priya Desai', age: 29, gender: 'Female', bloodGroup: 'B+', address: '78 SV Road, Mumbai', medicalHistory: ['Diabetes Type 2'] },
    { _id: 'p-4', user: 'u-pat-4', name: 'Arun Kumar', age: 52, gender: 'Male', bloodGroup: 'AB+', address: '23 Connaught Place, Delhi', medicalHistory: ['Heart Disease', 'Obesity'] },
    { _id: 'p-5', user: 'u-pat-5', name: 'Sita Patel', age: 45, gender: 'Female', bloodGroup: 'O-', address: '56 CG Road, Ahmedabad', medicalHistory: ['Hypothyroidism'] },
    { _id: 'p-6', user: 'u-pat-6', name: 'Jitendra Verma', age: 38, gender: 'Male', bloodGroup: 'A+', address: '9 Church Street, Goa', medicalHistory: [] },
    { _id: 'p-7', user: 'u-pat-7', name: 'Kavya Nair', age: 26, gender: 'Female', bloodGroup: 'B-', address: '34 MG Road, Kochi', medicalHistory: ['Asthma'] },
    { _id: 'p-8', user: 'u-pat-8', name: 'Mohammed Anwar', age: 60, gender: 'Male', bloodGroup: 'O+', address: '67 Nampally, Hyderabad', medicalHistory: ['COPD', 'Diabetes', 'Hypertension'] },
    { _id: 'p-9', user: 'u-pat-9', name: 'Sunitha Rao', age: 42, gender: 'Female', bloodGroup: 'A+', address: '89 TTK Road, Chennai', medicalHistory: ['Rheumatoid Arthritis'] },
    { _id: 'p-10', user: 'u-pat-10', name: 'Devendra Dixit', age: 31, gender: 'Male', bloodGroup: 'AB-', address: '12 Hill Street, Ooty', medicalHistory: [] },
    { _id: 'p-11', user: 'u-pat-11', name: 'Latika Mishra', age: 27, gender: 'Female', bloodGroup: 'B+', address: '45 Main Road, Thrissur', medicalHistory: ['Anemia'] },
    { _id: 'p-12', user: 'u-pat-12', name: 'Ajay Pandey', age: 48, gender: 'Male', bloodGroup: 'O+', address: '67 Hazratganj, Lucknow', medicalHistory: ['Chronic Kidney Disease Stage 2'] },
    { _id: 'p-13', user: 'u-pat-13', name: 'Riya Banerjee', age: 23, gender: 'Female', bloodGroup: 'A-', address: '23 Salt Lake, Kolkata', medicalHistory: [] },
    { _id: 'p-14', user: 'u-pat-14', name: 'Karim Shaikh', age: 55, gender: 'Male', bloodGroup: 'B+', address: '78 Dharavi, Mumbai', medicalHistory: ['Liver Cirrhosis'] },
    { _id: 'p-15', user: 'u-pat-15', name: 'Deepika Singh', age: 39, gender: 'Female', bloodGroup: 'O+', address: '12 Chowk, Varanasi', medicalHistory: ['PCOD'] },
    { _id: 'p-16', user: 'u-pat-16', name: 'Rohit Malhotra', age: 33, gender: 'Male', bloodGroup: 'A+', address: '34 Punjabi Bagh, Delhi', medicalHistory: ['Anxiety Disorder'] },
    { _id: 'p-17', user: 'u-pat-17', name: 'Anita Joshi', age: 50, gender: 'Female', bloodGroup: 'AB+', address: '56 FC Road, Pune', medicalHistory: ['Osteoporosis', 'Thyroid'] },
    { _id: 'p-18', user: 'u-pat-18', name: 'Tejas Shah', age: 22, gender: 'Male', bloodGroup: 'O-', address: '89 Law Garden, Ahmedabad', medicalHistory: [] },
    { _id: 'p-19', user: 'u-pat-19', name: 'Pallavi Rao', age: 36, gender: 'Female', bloodGroup: 'B-', address: '23 Brigade Road, Bengaluru', medicalHistory: ['Psoriasis'] },
    { _id: 'p-20', user: 'u-pat-20', name: 'Suresh Menon', age: 62, gender: 'Male', bloodGroup: 'O+', address: '45 Marine Drive, Mumbai', medicalHistory: ['Prostate Enlargement', 'Diabetes'] },
    { _id: 'p-21', user: 'u-pat-21', name: 'Nisha Kapoor', age: 41, gender: 'Female', bloodGroup: 'A+', address: '67 Model Town, Chandigarh', medicalHistory: ['Depression'] },
    { _id: 'p-22', user: 'u-pat-22', name: 'Vikas Yadav', age: 44, gender: 'Male', bloodGroup: 'B+', address: '12 Civil Lines, Jaipur', medicalHistory: ['Gout'] },
    { _id: 'p-23', user: 'u-pat-23', name: 'Smita Bhatt', age: 30, gender: 'Female', bloodGroup: 'O+', address: '34 Navrangpura, Ahmedabad', medicalHistory: [] },
    { _id: 'p-24', user: 'u-pat-24', name: 'Arjun Reddy', age: 25, gender: 'Male', bloodGroup: 'AB-', address: '56 Jubilee Hills, Hyderabad', medicalHistory: ['Epilepsy'] },
    { _id: 'p-25', user: 'u-pat-25', name: 'Pooja Thakkar', age: 37, gender: 'Female', bloodGroup: 'A-', address: '78 Pali Hill, Mumbai', medicalHistory: ['Endometriosis'] },
    { _id: 'p-26', user: 'u-pat-26', name: 'Nilesh Patil', age: 46, gender: 'Male', bloodGroup: 'O+', address: '9 Shivajinagar, Pune', medicalHistory: ['Chronic Sinusitis'] },
    { _id: 'p-27', user: 'u-pat-27', name: 'Geeta Ghosh', age: 58, gender: 'Female', bloodGroup: 'B+', address: '23 Alipore, Kolkata', medicalHistory: ['Breast Cancer (Remission)', 'Hypertension'] },
    { _id: 'p-28', user: 'u-pat-28', name: 'Sanjay Raut', age: 43, gender: 'Male', bloodGroup: 'A+', address: '45 Andheri West, Mumbai', medicalHistory: ['Gallstones'] },
    { _id: 'p-29', user: 'u-pat-29', name: 'Alka Dixit', age: 32, gender: 'Female', bloodGroup: 'O-', address: '67 Hazratganj, Lucknow', medicalHistory: ['Iron Deficiency Anemia'] },
    { _id: 'p-30', user: 'u-pat-30', name: 'Harsh Trivedi', age: 19, gender: 'Male', bloodGroup: 'B-', address: '89 Ellisbridge, Ahmedabad', medicalHistory: [] },
  ];

  // ─────────────────────────────────────────
  //  DEPARTMENTS (16)
  // ─────────────────────────────────────────
  const departments = [
    { name: 'Cardiology', description: 'Heart disease, coronary artery interventions, vascular surgery, ECG, echocardiography, and advanced cardiac care.', status: 'Active' },
    { name: 'Neurology', description: 'Brain, spinal cord, nerve disorders — stroke, epilepsy, Parkinson\'s, dementia, and headache management.', status: 'Active' },
    { name: 'Orthopedics', description: 'Bone, joint, and musculoskeletal care including joint replacement, sports injuries, and spine surgeries.', status: 'Active' },
    { name: 'ENT', description: 'Ear, Nose & Throat conditions — sinusitis, hearing loss, cochlear implants, voice disorders, tonsillectomy.', status: 'Active' },
    { name: 'Ophthalmology', description: 'Eye care including cataract surgery, LASIK, retina surgery, glaucoma management, and corneal transplants.', status: 'Active' },
    { name: 'Dermatology', description: 'Skin, hair, and nail disorders — acne, psoriasis, eczema, skin cancer screening, and cosmetic dermatology.', status: 'Active' },
    { name: 'General Medicine', description: 'Comprehensive adult healthcare, chronic disease management, preventive care, and internal medicine.', status: 'Active' },
    { name: 'Pediatrics', description: 'Child and newborn care, vaccinations, growth monitoring, neonatology, and pediatric emergency services.', status: 'Active' },
    { name: 'Gynecology', description: 'Women\'s reproductive health — pregnancy care, fertility treatments, PCOS, menopause, and gynecologic oncology.', status: 'Active' },
    { name: 'Gastroenterology', description: 'Digestive tract disorders — IBS, Crohn\'s, liver disease, endoscopy, colonoscopy, and hepatology.', status: 'Active' },
    { name: 'Pulmonology', description: 'Lung and respiratory disorders — asthma, COPD, sleep apnea, bronchoscopy, and critical respiratory care.', status: 'Active' },
    { name: 'Endocrinology', description: 'Hormonal and metabolic conditions — diabetes, thyroid disorders, obesity, adrenal and pituitary diseases.', status: 'Active' },
    { name: 'Urology', description: 'Urinary tract and male reproductive system — kidney stones, prostate, bladder cancer, and robotic surgery.', status: 'Active' },
    { name: 'Oncology', description: 'Cancer diagnosis and treatment — chemotherapy, immunotherapy, radiation, surgical oncology, and palliative care.', status: 'Active' },
    { name: 'Psychiatry', description: 'Mental health care — depression, anxiety, schizophrenia, addiction, CBT, and geriatric psychiatry.', status: 'Active' },
    { name: 'Nephrology', description: 'Kidney disease management — CKD, dialysis, renal transplant, hypertension nephrology, and glomerulonephritis.', status: 'Active' },
    { name: 'Rheumatology', description: 'Autoimmune and musculoskeletal diseases — rheumatoid arthritis, lupus, gout, ankylosing spondylitis, vasculitis.', status: 'Active' },
  ];

  // ─────────────────────────────────────────
  //  ROOMS (20)
  // ─────────────────────────────────────────
  const rooms = [
    { roomNumber: '101', roomType: 'General', status: 'Available', patient: null },
    { roomNumber: '102', roomType: 'General', status: 'Occupied', patient: 'p-4' },
    { roomNumber: '103', roomType: 'General', status: 'Available', patient: null },
    { roomNumber: '104', roomType: 'General', status: 'Available', patient: null },
    { roomNumber: '105', roomType: 'General', status: 'Occupied', patient: 'p-8' },
    { roomNumber: '201', roomType: 'Semi-Private', status: 'Available', patient: null },
    { roomNumber: '202', roomType: 'Semi-Private', status: 'Occupied', patient: 'p-12' },
    { roomNumber: '203', roomType: 'Semi-Private', status: 'Available', patient: null },
    { roomNumber: '204', roomType: 'Semi-Private', status: 'Occupied', patient: 'p-20' },
    { roomNumber: '205', roomType: 'Semi-Private', status: 'Maintenance', patient: null },
    { roomNumber: '301', roomType: 'Private', status: 'Occupied', patient: 'p-2' },
    { roomNumber: '302', roomType: 'Private', status: 'Available', patient: null },
    { roomNumber: '303', roomType: 'Private', status: 'Occupied', patient: 'p-27' },
    { roomNumber: '304', roomType: 'Private', status: 'Available', patient: null },
    { roomNumber: '305', roomType: 'Private', status: 'Occupied', patient: 'p-9' },
    { roomNumber: '401', roomType: 'ICU', status: 'Occupied', patient: 'p-8' },
    { roomNumber: '402', roomType: 'ICU', status: 'Available', patient: null },
    { roomNumber: '403', roomType: 'ICU', status: 'Available', patient: null },
    { roomNumber: '501', roomType: 'ICU', status: 'Available', patient: null },
    { roomNumber: '502', roomType: 'ICU', status: 'Maintenance', patient: null },
  ];

  // ─────────────────────────────────────────
  //  MEDICINES (25)
  // ─────────────────────────────────────────
  const medicines = [
    { name: 'Paracetamol 650mg', price: 15, stock: 2400, expiryDate: '2027-08-31', supplier: 'Apex Pharma' },
    { name: 'Amoxicillin 500mg', price: 65, stock: 890, expiryDate: '2027-02-28', supplier: 'Glaxo Health' },
    { name: 'Atorvastatin 10mg', price: 120, stock: 540, expiryDate: '2028-05-15', supplier: 'Pfizer Labs' },
    { name: 'Ibuprofen 400mg', price: 25, stock: 1800, expiryDate: '2027-11-30', supplier: 'Biocon' },
    { name: 'Pantoprazole 40mg', price: 45, stock: 1200, expiryDate: '2028-01-20', supplier: 'Sun Pharma' },
    { name: 'Metformin 500mg', price: 30, stock: 1650, expiryDate: '2027-09-15', supplier: 'Cipla' },
    { name: 'Amlodipine 5mg', price: 55, stock: 780, expiryDate: '2028-03-10', supplier: 'Dr. Reddy\'s' },
    { name: 'Losartan 50mg', price: 80, stock: 620, expiryDate: '2028-07-22', supplier: 'Torrent Pharma' },
    { name: 'Clopidogrel 75mg', price: 95, stock: 430, expiryDate: '2027-12-01', supplier: 'Sanofi' },
    { name: 'Omeprazole 20mg', price: 35, stock: 990, expiryDate: '2027-06-30', supplier: 'Ranbaxy' },
    { name: 'Azithromycin 500mg', price: 110, stock: 360, expiryDate: '2027-04-15', supplier: 'Abbott' },
    { name: 'Cetirizine 10mg', price: 20, stock: 2100, expiryDate: '2028-09-30', supplier: 'Mankind Pharma' },
    { name: 'Prednisolone 5mg', price: 40, stock: 560, expiryDate: '2027-10-20', supplier: 'Alkem Labs' },
    { name: 'Gabapentin 300mg', price: 90, stock: 320, expiryDate: '2028-02-14', supplier: 'Pfizer Labs' },
    { name: 'Levothyroxine 50mcg', price: 75, stock: 870, expiryDate: '2027-08-01', supplier: 'Abbott' },
    { name: 'Rosuvastatin 10mg', price: 130, stock: 480, expiryDate: '2028-06-15', supplier: 'AstraZeneca' },
    { name: 'Lisinopril 10mg', price: 60, stock: 590, expiryDate: '2027-11-01', supplier: 'Lupin' },
    { name: 'Doxycycline 100mg', price: 85, stock: 240, expiryDate: '2027-03-28', supplier: 'Zydus Cadila' },
    { name: 'Ondansetron 4mg', price: 50, stock: 760, expiryDate: '2028-04-10', supplier: 'Cipla' },
    { name: 'Tramadol 50mg', price: 70, stock: 190, expiryDate: '2027-07-15', supplier: 'Grindeks' },
    { name: 'Montelukast 10mg', price: 95, stock: 410, expiryDate: '2028-08-20', supplier: 'Sun Pharma' },
    { name: 'Insulin Glargine 100U/mL', price: 780, stock: 120, expiryDate: '2027-01-30', supplier: 'Sanofi' },
    { name: 'Furosemide 40mg', price: 25, stock: 650, expiryDate: '2027-05-12', supplier: 'Biocon' },
    { name: 'Warfarin 5mg', price: 45, stock: 280, expiryDate: '2028-10-05', supplier: 'Dr. Reddy\'s' },
    { name: 'Hydroxychloroquine 200mg', price: 120, stock: 340, expiryDate: '2027-09-22', supplier: 'Ipca Labs' },
  ];

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  const twoDaysAgo = new Date(Date.now() - 2*86400000).toISOString().split('T')[0];

  // ─────────────────────────────────────────
  //  APPOINTMENTS (25)
  // ─────────────────────────────────────────
  const appointments = [
    { _id: 'app-1', patient: 'p-1', doctor: 'd-c1', date: today, time: '10:00 AM', status: 'Confirmed', reason: 'Routine cardiac checkup, chest tightness' },
    { _id: 'app-2', patient: 'p-2', doctor: 'd-n2', date: today, time: '11:00 AM', status: 'Completed', reason: 'Severe headache and dizziness follow-up' },
    { _id: 'app-3', patient: 'p-3', doctor: 'd-g4', date: today, time: '02:00 PM', status: 'Pending', reason: 'Blood sugar spike and fatigue' },
    { _id: 'app-4', patient: 'p-4', doctor: 'd-c3', date: today, time: '09:00 AM', status: 'Confirmed', reason: 'Post-angioplasty follow-up' },
    { _id: 'app-5', patient: 'p-5', doctor: 'd-en1', date: today, time: '03:00 PM', status: 'Pending', reason: 'Thyroid levels check and weight loss' },
    { _id: 'app-6', patient: 'p-7', doctor: 'd-pu3', date: today, time: '04:00 PM', status: 'Confirmed', reason: 'Asthma follow-up, night coughing' },
    { _id: 'app-7', patient: 'p-9', doctor: 'd-r3', date: today, time: '11:30 AM', status: 'Completed', reason: 'Joint swelling and morning stiffness review' },
    { _id: 'app-8', patient: 'p-11', doctor: 'd-g2', date: today, time: '10:30 AM', status: 'Confirmed', reason: 'Weakness, breathlessness on exertion' },
    { _id: 'app-9', patient: 'p-13', doctor: 'd-gy1', date: today, time: '01:00 PM', status: 'Pending', reason: 'Irregular periods and PCOS check' },
    { _id: 'app-10', patient: 'p-16', doctor: 'd-ps3', date: today, time: '05:00 PM', status: 'Confirmed', reason: 'Anxiety disorder review and medication adjustment' },

    { _id: 'app-11', patient: 'p-1', doctor: 'd-g1', date: tomorrow, time: '11:30 AM', status: 'Pending', reason: 'General health checkup and blood work' },
    { _id: 'app-12', patient: 'p-6', doctor: 'd-o2', date: tomorrow, time: '09:30 AM', status: 'Confirmed', reason: 'Knee pain post sports injury' },
    { _id: 'app-13', patient: 'p-8', doctor: 'd-pu4', date: tomorrow, time: '10:00 AM', status: 'Confirmed', reason: 'COPD exacerbation and oxygen levels' },
    { _id: 'app-14', patient: 'p-15', doctor: 'd-gy3', date: tomorrow, time: '02:30 PM', status: 'Pending', reason: 'Endometriosis pelvic pain consult' },
    { _id: 'app-15', patient: 'p-20', doctor: 'd-u3', date: tomorrow, time: '11:00 AM', status: 'Pending', reason: 'Prostate check and urinary difficulty' },

    { _id: 'app-16', patient: 'p-12', doctor: 'd-ne3', date: yesterday, time: '10:00 AM', status: 'Completed', reason: 'Kidney function test follow-up, CKD management' },
    { _id: 'app-17', patient: 'p-14', doctor: 'd-ga4', date: yesterday, time: '11:30 AM', status: 'Completed', reason: 'Liver function and cirrhosis monitoring' },
    { _id: 'app-18', patient: 'p-17', doctor: 'd-o4', date: yesterday, time: '03:00 PM', status: 'Completed', reason: 'Hip replacement follow-up, physiotherapy plan' },
    { _id: 'app-19', patient: 'p-22', doctor: 'd-r5', date: yesterday, time: '09:00 AM', status: 'Completed', reason: 'Gout flare-up and uric acid levels' },
    { _id: 'app-20', patient: 'p-24', doctor: 'd-n5', date: yesterday, time: '04:00 PM', status: 'Completed', reason: 'Epilepsy medication review and EEG results' },

    { _id: 'app-21', patient: 'p-25', doctor: 'd-gy4', date: twoDaysAgo, time: '10:00 AM', status: 'Completed', reason: 'Endometriosis surgery post-op evaluation' },
    { _id: 'app-22', patient: 'p-27', doctor: 'd-on1', date: twoDaysAgo, time: '11:00 AM', status: 'Completed', reason: 'Post-chemotherapy CBC and organ function tests' },
    { _id: 'app-23', patient: 'p-19', doctor: 'd-d3', date: twoDaysAgo, time: '02:00 PM', status: 'Completed', reason: 'Psoriasis plaque progression, biologics discussion' },
    { _id: 'app-24', patient: 'p-21', doctor: 'd-ps1', date: twoDaysAgo, time: '03:30 PM', status: 'Completed', reason: 'Depression and sleep disorder, medication review' },
    { _id: 'app-25', patient: 'p-26', doctor: 'd-e4', date: twoDaysAgo, time: '09:30 AM', status: 'Cancelled', reason: 'Chronic sinusitis polyp removal pre-evaluation' },
  ];

  // ─────────────────────────────────────────
  //  PRESCRIPTIONS (12)
  // ─────────────────────────────────────────
  const prescriptions = [
    {
      _id: 'pr-1', patient: 'p-2', doctor: 'd-n2', appointment: 'app-2',
      medicines: [
        { name: 'Ibuprofen 400mg', dosage: '1 tablet', duration: '5 days', frequency: 'As needed for pain' },
        { name: 'Pantoprazole 40mg', dosage: '1 tablet', duration: '10 days', frequency: 'Morning (Before food)' },
      ],
      notes: 'Avoid bright lights and loud noises. Rest in a quiet dark room. Follow up in 2 weeks if symptoms persist.',
      date: yesterday
    },
    {
      _id: 'pr-2', patient: 'p-9', doctor: 'd-r3', appointment: 'app-7',
      medicines: [
        { name: 'Hydroxychloroquine 200mg', dosage: '1 tablet', duration: '90 days', frequency: 'Morning (With food)' },
        { name: 'Prednisolone 5mg', dosage: '2 tablets', duration: '14 days', frequency: '1-0-1 (Morning & Night)' },
        { name: 'Pantoprazole 40mg', dosage: '1 tablet', duration: '14 days', frequency: 'Morning (Before food)' },
      ],
      notes: 'Avoid high-impact exercise. Apply warm compress to stiff joints. ESR and CRP labs in 6 weeks.',
      date: yesterday
    },
    {
      _id: 'pr-3', patient: 'p-12', doctor: 'd-ne3', appointment: 'app-16',
      medicines: [
        { name: 'Amlodipine 5mg', dosage: '1 tablet', duration: '30 days', frequency: 'Night (With food)' },
        { name: 'Furosemide 40mg', dosage: '1 tablet', duration: '30 days', frequency: 'Morning (Before food)' },
      ],
      notes: 'Low-sodium, low-protein diet. Fluid restriction to 1.5 litres/day. Monthly kidney function tests required.',
      date: yesterday
    },
    {
      _id: 'pr-4', patient: 'p-14', doctor: 'd-ga4', appointment: 'app-17',
      medicines: [
        { name: 'Furosemide 40mg', dosage: '1 tablet', duration: '30 days', frequency: 'Morning (Before food)' },
        { name: 'Omeprazole 20mg', dosage: '1 tablet', duration: '30 days', frequency: 'Morning (Before food)' },
      ],
      notes: 'Strict alcohol abstinence mandatory. Low-sodium diet. No NSAIDs. Ultrasound liver every 3 months.',
      date: yesterday
    },
    {
      _id: 'pr-5', patient: 'p-17', doctor: 'd-o4', appointment: 'app-18',
      medicines: [
        { name: 'Ibuprofen 400mg', dosage: '1 tablet', duration: '7 days', frequency: '1-0-1 (As needed)' },
        { name: 'Pantoprazole 40mg', dosage: '1 tablet', duration: '7 days', frequency: 'Morning (Before food)' },
      ],
      notes: 'Physiotherapy 3x/week. No weight-bearing activities beyond prescribed limits. X-ray in 6 weeks.',
      date: yesterday
    },
    {
      _id: 'pr-6', patient: 'p-22', doctor: 'd-r5', appointment: 'app-19',
      medicines: [
        { name: 'Ibuprofen 400mg', dosage: '2 tablets', duration: '7 days', frequency: 'With meals 3 times/day' },
        { name: 'Pantoprazole 40mg', dosage: '1 tablet', duration: '10 days', frequency: 'Morning (Before food)' },
      ],
      notes: 'Avoid purine-rich foods (red meat, shellfish, alcohol). Increase water intake. Serum uric acid in 4 weeks.',
      date: yesterday
    },
    {
      _id: 'pr-7', patient: 'p-24', doctor: 'd-n5', appointment: 'app-20',
      medicines: [
        { name: 'Gabapentin 300mg', dosage: '1 tablet', duration: '90 days', frequency: '1-1-1 (Morning, Afternoon, Night)' },
      ],
      notes: 'Do not miss doses. Avoid driving if dizzy. Immediate ER visit if seizure duration exceeds 5 minutes.',
      date: yesterday
    },
    {
      _id: 'pr-8', patient: 'p-25', doctor: 'd-gy4', appointment: 'app-21',
      medicines: [
        { name: 'Ibuprofen 400mg', dosage: '1 tablet', duration: '10 days', frequency: 'As needed for pain' },
        { name: 'Amoxicillin 500mg', dosage: '1 capsule', duration: '7 days', frequency: '1-0-1 (Morning & Night)' },
      ],
      notes: 'Post-operative care. No strenuous activity for 4 weeks. Report any bleeding or fever immediately.',
      date: twoDaysAgo
    },
    {
      _id: 'pr-9', patient: 'p-27', doctor: 'd-on1', appointment: 'app-22',
      medicines: [
        { name: 'Ondansetron 4mg', dosage: '1 tablet', duration: '14 days', frequency: 'Before meals 3 times/day' },
        { name: 'Omeprazole 20mg', dosage: '1 tablet', duration: '30 days', frequency: 'Morning (Before food)' },
      ],
      notes: 'Maintain high-calorie diet. Hydration critical. CBC and liver function monthly. Next chemo in 3 weeks.',
      date: twoDaysAgo
    },
    {
      _id: 'pr-10', patient: 'p-19', doctor: 'd-d3', appointment: 'app-23',
      medicines: [
        { name: 'Prednisolone 5mg', dosage: '1 tablet', duration: '14 days', frequency: 'Morning (With food)' },
        { name: 'Cetirizine 10mg', dosage: '1 tablet', duration: '30 days', frequency: 'Night (Before bed)' },
      ],
      notes: 'Avoid triggers: stress, cold weather, harsh soaps. Apply prescribed moisturizer 2x/day. DLQI assessment in 6 weeks.',
      date: twoDaysAgo
    },
    {
      _id: 'pr-11', patient: 'p-21', doctor: 'd-ps1', appointment: 'app-24',
      medicines: [
        { name: 'Gabapentin 300mg', dosage: '1 capsule', duration: '60 days', frequency: 'Night (Before bed)' },
      ],
      notes: 'Weekly CBT sessions recommended. Avoid caffeine post 4 PM. Sleep hygiene protocol provided. Follow up in 4 weeks.',
      date: twoDaysAgo
    },
    {
      _id: 'pr-12', patient: 'p-7', doctor: 'd-pu3', appointment: 'app-6',
      medicines: [
        { name: 'Montelukast 10mg', dosage: '1 tablet', duration: '30 days', frequency: 'Night (Before bed)' },
        { name: 'Cetirizine 10mg', dosage: '1 tablet', duration: '14 days', frequency: 'Night (Before bed)' },
      ],
      notes: 'Use salbutamol inhaler as rescue dose. Avoid dust, smoke, and cold air. Peak flow monitoring daily.',
      date: today
    },
  ];

  // ─────────────────────────────────────────
  //  BILLS (18)
  // ─────────────────────────────────────────
  const bills = [
    { _id: 'b-1', patient: 'p-2', appointment: 'app-2', consultationFee: 1300, medicineFee: 95, labFee: 1200, roomCharges: 2500, tax: 764.25, total: 5859.25, status: 'Paid', date: yesterday },
    { _id: 'b-2', patient: 'p-9', appointment: 'app-7', consultationFee: 1200, medicineFee: 280, labFee: 800, roomCharges: 1800, tax: 612, total: 4692, status: 'Paid', date: yesterday },
    { _id: 'b-3', patient: 'p-12', appointment: 'app-16', consultationFee: 1300, medicineFee: 85, labFee: 1500, roomCharges: 1800, tax: 702.75, total: 5387.75, status: 'Pending', date: yesterday },
    { _id: 'b-4', patient: 'p-14', appointment: 'app-17', consultationFee: 1500, medicineFee: 70, labFee: 2000, roomCharges: 2500, tax: 910.5, total: 6980.5, status: 'Pending', date: yesterday },
    { _id: 'b-5', patient: 'p-17', appointment: 'app-18', consultationFee: 1500, medicineFee: 65, labFee: 500, roomCharges: 1800, tax: 579.75, total: 4444.75, status: 'Paid', date: yesterday },
    { _id: 'b-6', patient: 'p-22', appointment: 'app-19', consultationFee: 1000, medicineFee: 65, labFee: 600, roomCharges: 0, tax: 249.75, total: 1914.75, status: 'Paid', date: yesterday },
    { _id: 'b-7', patient: 'p-24', appointment: 'app-20', consultationFee: 750, medicineFee: 90, labFee: 1200, roomCharges: 0, tax: 306, total: 2346, status: 'Paid', date: yesterday },
    { _id: 'b-8', patient: 'p-25', appointment: 'app-21', consultationFee: 1300, medicineFee: 150, labFee: 0, roomCharges: 2500, tax: 592.5, total: 4542.5, status: 'Paid', date: twoDaysAgo },
    { _id: 'b-9', patient: 'p-27', appointment: 'app-22', consultationFee: 1500, medicineFee: 120, labFee: 3000, roomCharges: 2500, tax: 1083, total: 8303, status: 'Pending', date: twoDaysAgo },
    { _id: 'b-10', patient: 'p-19', appointment: 'app-23', consultationFee: 1200, medicineFee: 140, labFee: 500, roomCharges: 0, tax: 276, total: 2116, status: 'Paid', date: twoDaysAgo },
    { _id: 'b-11', patient: 'p-21', appointment: 'app-24', consultationFee: 1000, medicineFee: 90, labFee: 0, roomCharges: 0, tax: 163.5, total: 1253.5, status: 'Paid', date: twoDaysAgo },
    { _id: 'b-12', patient: 'p-1', appointment: 'app-1', consultationFee: 1200, medicineFee: 0, labFee: 0, roomCharges: 0, tax: 180, total: 1380, status: 'Pending', date: today },
    { _id: 'b-13', patient: 'p-4', appointment: 'app-4', consultationFee: 1500, medicineFee: 215, labFee: 1000, roomCharges: 2500, tax: 783.75, total: 5998.75, status: 'Pending', date: today },
    { _id: 'b-14', patient: 'p-6', appointment: 'app-12', consultationFee: 1200, medicineFee: 90, labFee: 500, roomCharges: 0, tax: 268.5, total: 2058.5, status: 'Pending', date: tomorrow },
    { _id: 'b-15', patient: 'p-8', appointment: 'app-13', consultationFee: 1200, medicineFee: 165, labFee: 1000, roomCharges: 5000, tax: 1104.75, total: 8469.75, status: 'Pending', date: today },
    { _id: 'b-16', patient: 'p-7', appointment: 'app-6', consultationFee: 950, medicineFee: 185, labFee: 500, roomCharges: 0, tax: 245.25, total: 1880.25, status: 'Pending', date: today },
    { _id: 'b-17', patient: 'p-11', appointment: 'app-8', consultationFee: 700, medicineFee: 0, labFee: 800, roomCharges: 0, tax: 225, total: 1725, status: 'Pending', date: today },
    { _id: 'b-18', patient: 'p-16', appointment: 'app-10', consultationFee: 1000, medicineFee: 90, labFee: 0, roomCharges: 0, tax: 163.5, total: 1253.5, status: 'Paid', date: today },
  ];

  // ─────────────────────────────────────────
  //  REPORTS (15)
  // ─────────────────────────────────────────
  const reports = [
    { _id: 'rep-1', patient: 'p-1', testName: 'Blood Test', date: yesterday, status: 'Completed', result: 'Haemoglobin: 14.8 g/dL (Normal). Cholesterol: 196 mg/dL (Normal). Blood Sugar Fasting: 88 mg/dL (Normal). Triglycerides: 142 mg/dL (Borderline).', fileUrl: '/uploads/blood_test_p1.pdf' },
    { _id: 'rep-2', patient: 'p-2', testName: 'MRI', date: yesterday, status: 'Completed', result: 'Brain MRI: No structural abnormalities. No space-occupying lesions. No vascular malformations. Clear CSF flow. White matter intact.', fileUrl: '/uploads/mri_brain_p2.pdf' },
    { _id: 'rep-3', patient: 'p-4', testName: 'ECG', date: today, status: 'Completed', result: 'ECG: Normal sinus rhythm at 72 bpm. No ST-segment changes. QT interval 420ms (normal). Mild left ventricular hypertrophy pattern noted. Clinical correlation advised.', fileUrl: '/uploads/ecg_p4.pdf' },
    { _id: 'rep-4', patient: 'p-7', testName: 'Blood Test', date: today, status: 'Completed', result: 'IgE Total: 420 IU/mL (Elevated). Eosinophil count: 550 (Borderline). Spirometry FEV1/FVC ratio: 0.72. Consistent with mild obstructive pattern.', fileUrl: '/uploads/blood_test_p7.pdf' },
    { _id: 'rep-5', patient: 'p-8', testName: 'CT Scan', date: today, status: 'Completed', result: 'CT Thorax: Bilateral hyperinflation consistent with severe COPD. Emphysematous changes in upper lobes. No pulmonary embolism. No pleural effusion.', fileUrl: '/uploads/ct_scan_p8.pdf' },
    { _id: 'rep-6', patient: 'p-9', testName: 'Blood Test', date: yesterday, status: 'Completed', result: 'ESR: 68 mm/hr (Elevated). CRP: 24 mg/L (High). RF: 120 IU/mL (Positive). Anti-CCP: Positive. ANA: Negative. Consistent with active Rheumatoid Arthritis.', fileUrl: '/uploads/blood_test_p9.pdf' },
    { _id: 'rep-7', patient: 'p-12', testName: 'Blood Test', date: yesterday, status: 'Completed', result: 'Serum Creatinine: 2.8 mg/dL (Elevated). eGFR: 28 mL/min (CKD Stage 3b). Urea: 68 mg/dL. Potassium: 5.4 mEq/L (Borderline). Phosphorus: Elevated.', fileUrl: '/uploads/blood_test_p12.pdf' },
    { _id: 'rep-8', patient: 'p-14', testName: 'Blood Test', date: yesterday, status: 'Completed', result: 'Bilirubin Total: 3.8 mg/dL (Elevated). AST: 86 U/L. ALT: 72 U/L. ALP: 210 U/L (Elevated). Albumin: 2.9 g/dL (Low). INR: 1.7. Child-Pugh Score Class B.', fileUrl: '/uploads/blood_test_p14.pdf' },
    { _id: 'rep-9', patient: 'p-17', testName: 'X-Ray', date: yesterday, status: 'Completed', result: 'X-Ray Left Hip: Total hip prosthesis in satisfactory position. No periprosthetic fracture. No dislocation. Excellent component alignment. No hardware loosening.', fileUrl: '/uploads/xray_hip_p17.pdf' },
    { _id: 'rep-10', patient: 'p-22', testName: 'Blood Test', date: yesterday, status: 'Completed', result: 'Serum Uric Acid: 9.2 mg/dL (Elevated, normal <6.0). WBC: 11,200/µL (Mild Leukocytosis). CRP: 18 mg/L. Joint aspiration: Monosodium urate crystals confirmed.', fileUrl: '/uploads/blood_test_p22.pdf' },
    { _id: 'rep-11', patient: 'p-24', testName: 'ECG', date: yesterday, status: 'Completed', result: 'EEG: Occasional spike-wave discharges in temporal lobe bilaterally consistent with complex partial epilepsy. No generalized seizure activity during recording.', fileUrl: '/uploads/eeg_p24.pdf' },
    { _id: 'rep-12', patient: 'p-27', testName: 'Blood Test', date: twoDaysAgo, status: 'Completed', result: 'CBC: WBC 3200/µL (Neutropenia post-chemo). Haemoglobin: 9.8 g/dL (Mild Anemia). Platelets: 112K/µL (Thrombocytopenia). G-CSF support recommended.', fileUrl: '/uploads/blood_test_p27.pdf' },
    { _id: 'rep-13', patient: 'p-3', testName: 'Blood Test', date: today, status: 'Pending', result: 'Awaiting lab analysis', fileUrl: '' },
    { _id: 'rep-14', patient: 'p-5', testName: 'Blood Test', date: today, status: 'Pending', result: 'Awaiting lab analysis', fileUrl: '' },
    { _id: 'rep-15', patient: 'p-4', testName: 'CT Scan', date: today, status: 'Pending', result: 'Awaiting CT imaging and radiologist report', fileUrl: '' },
  ];

  return {
    users,
    doctors,
    patients,
    departments,
    rooms,
    medicines,
    appointments,
    prescriptions,
    bills,
    reports
  };
};

module.exports = { getSeedData };
