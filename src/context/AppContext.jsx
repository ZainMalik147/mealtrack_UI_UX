import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, initLocalStorage, resetDemoData } from '../services/apiService';

const AppContext = createContext();

export const ROLES = {
  TEACHER: {
    id: 'teacher',
    name: 'Mrs. Jennifer Ellis',
    title: 'Grade 2 Teacher · Room 205',
    school: 'Beacon Elementary',
    email: 'jellis@hwschools.org',
    roleTag: 'Teacher (K-5)',
    avatar: '/images/students/jordan.png', // or teacher icon
    color: '#0A7E8C'
  },
  GSRP_TEACHER: {
    id: 'teacher_gsrp',
    name: 'Ms. Dana Owens',
    title: 'GSRP Pre-K Lead · Room 101',
    school: 'Beacon Elementary',
    email: 'dowens@hwschools.org',
    roleTag: 'Teacher (GSRP)',
    avatar: '/images/students/amari.png',
    color: '#4F46E5'
  },
  DISTRICT_ADMIN: {
    id: 'admin_district',
    name: 'Brian Corbett',
    title: 'Food Service Director',
    school: 'Harper Woods Schools',
    email: 'bcorbett@hwschools.org',
    roleTag: 'District Admin',
    avatar: null,
    color: '#6B1719'
  },
  KITCHEN_LEAD: {
    id: 'kitchen_lead',
    name: 'Christine Goodwin',
    title: 'Cafeteria Kitchen Lead',
    school: 'Beacon Elementary Central Kitchen',
    email: 'kitchen.beacon@hwschools.org',
    roleTag: 'Kitchen Lead',
    avatar: null,
    color: '#D97706'
  },
  PARENT: {
    id: 'parent',
    name: 'Rachel Carter',
    title: 'Parent of Jordan & Maya Carter',
    school: 'Beacon Elementary',
    email: 'rachel.carter@gmail.com',
    roleTag: 'Parent (Magic Link)',
    avatar: null,
    color: '#059669'
  },
  VENDOR_SUPER: {
    id: 'vendor_super',
    name: 'Michael Collins',
    title: 'Master Operations Lead',
    school: 'Ideal Technology Solutions',
    email: 'mcollins@idealtech.com',
    roleTag: 'Master SaaS Admin',
    avatar: null,
    color: '#0F1F38'
  }
};

export const AppProvider = ({ children }) => {
  // Initialize storage
  useEffect(() => {
    initLocalStorage();
  }, []);

  const [currentUser, setCurrentUser] = useState(ROLES.TEACHER);
  const [currentPage, setCurrentPage] = useState(1); // Page 1 to 23
  const [isLockedOut, setIsLockedOut] = useState(false);
  const [liveNotification, setLiveNotification] = useState(null);

  // Core Data
  const [students, setStudents] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [staff, setStaff] = useState([]);
  const [kitchenTotals, setKitchenTotals] = useState({});
  const [changeAlerts, setChangeAlerts] = useState([]);
  const [benefitForms, setBenefitForms] = useState([]);
  const [telemetry, setTelemetry] = useState({});
  const [parentSelections, setParentSelections] = useState({});

  // Classroom Morning Workflow State (Room 205)
  // Attendance: sid -> 'present' | 'late' | 'leave_late' | 'absent'
  const [attendance, setAttendance] = useState({});
  const [arrivalTimes, setArrivalTimes] = useState({});
  const [leaveLateReasons, setLeaveLateReasons] = useState({});
  // Meals: sid -> 'served' | 'not_taken'
  const [breakfastChoices, setBreakfastChoices] = useState({});
  // Lunch: sid -> 'hotA' | 'coldB' | 'salad' | 'own' | 'notake'
  const [lunchChoices, setLunchChoices] = useState({});
  // Extended care: sid -> { snack: boolean, supper: boolean }
  const [extendedChoices, setExtendedChoices] = useState({});
  // Attestation signature
  const [signatureName, setSignatureName] = useState('Jennifer M. Ellis');
  const [submissionHistory, setSubmissionHistory] = useState([]);

  // Load from API / Storage
  const loadData = () => {
    initLocalStorage();
    const loadedStudents = api.students.getAll();
    setStudents(loadedStudents);
    setDistricts(api.districts.getAll());
    setStaff(api.staff.getAll());
    setKitchenTotals(api.kitchen.getTotals());
    setChangeAlerts(api.kitchen.getAlerts());
    setBenefitForms(api.benefitForms.getAll());
    setTelemetry(api.telemetry.get());
    setParentSelections(api.parentSelections.get());
    setSubmissionHistory(api.submissions.getAll());

    // Initialize teacher room state if not already set
    const initAtt = {};
    const initArrTimes = {};
    const initLeaveLate = {};
    const initBk = {};
    const initLn = {};
    const initExt = {};

    loadedStudents.forEach((s, idx) => {
      // Default: Most present, 2 late, 4 leave late, 1 absent to match exact Stitch spec
      if (idx === 0) {
        initAtt[s.sid] = 'late';
        initArrTimes[s.sid] = '9:08 AM';
      } else if (idx === 1) {
        initAtt[s.sid] = 'late';
        initArrTimes[s.sid] = '9:12 AM';
      } else if (idx === 2) {
        initAtt[s.sid] = 'leave_late';
        initLeaveLate[s.sid] = 'Latchkey';
      } else if (idx === 3) {
        initAtt[s.sid] = 'leave_late';
        initLeaveLate[s.sid] = 'Tutoring';
      } else if (idx === 4) {
        initAtt[s.sid] = 'leave_late';
        initLeaveLate[s.sid] = 'Latchkey';
      } else if (idx === 5) {
        initAtt[s.sid] = 'leave_late';
        initLeaveLate[s.sid] = 'Art Studio';
      } else if (idx === loadedStudents.length - 1) {
        initAtt[s.sid] = 'absent';
      } else {
        initAtt[s.sid] = 'present';
      }

      // Default Breakfast
      initBk[s.sid] = (initAtt[s.sid] === 'late' || initAtt[s.sid] === 'absent') ? 'not_taken' : 'served';

      // Default Lunch: distribution matching Stitch Page 5 summary
      if (idx < 11) {
        initLn[s.sid] = 'hotA';
      } else if (idx < 17) {
        initLn[s.sid] = 'coldB';
      } else if (idx < 20) {
        initLn[s.sid] = 'salad';
      } else if (idx < 22) {
        initLn[s.sid] = 'own';
      } else {
        initLn[s.sid] = 'notake';
      }

      // Extended
      initExt[s.sid] = {
        snack: initAtt[s.sid] === 'leave_late' || s.latchkey,
        supper: initAtt[s.sid] === 'leave_late' || (s.programs && s.programs.length > 0)
      };
    });

    setAttendance(initAtt);
    setArrivalTimes(initArrTimes);
    setLeaveLateReasons(initLeaveLate);
    setBreakfastChoices(initBk);
    setLunchChoices(initLn);
    setExtendedChoices(initExt);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Set All Present
  const markAllPresent = () => {
    const updated = { ...attendance };
    students.forEach(s => {
      updated[s.sid] = 'present';
    });
    setAttendance(updated);
  };

  // Set single student attendance
  const setStudentAttendance = (sid, status, arrivalTime = '9:08 AM', leaveReason = 'Latchkey') => {
    setAttendance(prev => ({ ...prev, [sid]: status }));
    if (status === 'late') {
      setArrivalTimes(prev => ({ ...prev, [sid]: arrivalTime }));
      setBreakfastChoices(prev => ({ ...prev, [sid]: 'not_taken' })); // Missed breakfast
    }
    if (status === 'leave_late') {
      setLeaveLateReasons(prev => ({ ...prev, [sid]: leaveReason }));
      setExtendedChoices(prev => ({
        ...prev,
        [sid]: { snack: true, supper: true }
      }));
    }
  };

  // Set Breakfast choice
  const setStudentBreakfast = (sid, choice) => {
    setBreakfastChoices(prev => ({ ...prev, [sid]: choice }));
  };

  // Set Lunch choice
  const setStudentLunch = (sid, choice) => {
    setLunchChoices(prev => ({ ...prev, [sid]: choice }));
  };

  // Fill remaining with Hot Entree A
  const fillRemainingHotA = () => {
    const updated = { ...lunchChoices };
    students.forEach(s => {
      const att = attendance[s.sid];
      if (att === 'present' || att === 'late' || att === 'leave_late') {
        if (!updated[s.sid]) {
          updated[s.sid] = 'hotA';
        }
      }
    });
    setLunchChoices(updated);
  };

  // Toggle extended care options
  const toggleExtendedOption = (sid, field) => {
    setExtendedChoices(prev => {
      const cur = prev[sid] || { snack: false, supper: false };
      return {
        ...prev,
        [sid]: {
          ...cur,
          [field]: !cur[field]
        }
      };
    });
  };

  // Submit Certified Count to Kitchen (Page 5 Transmit)
  const submitCertifiedCount = () => {
    // Calculate live totals
    let presentCount = 0;
    let lateCount = 0;
    let leaveLateCount = 0;
    let absentCount = 0;

    let hotACount = 0;
    let coldBCount = 0;
    let saladCount = 0;
    let ownCount = 0;
    let noTakeCount = 0;

    students.forEach(s => {
      const att = attendance[s.sid] || 'present';
      if (att === 'present') presentCount++;
      else if (att === 'late') lateCount++;
      else if (att === 'leave_late') leaveLateCount++;
      else if (att === 'absent') absentCount++;

      const meal = lunchChoices[s.sid] || 'hotA';
      if (meal === 'hotA') hotACount++;
      else if (meal === 'coldB') coldBCount++;
      else if (meal === 'salad') saladCount++;
      else if (meal === 'own') ownCount++;
      else if (meal === 'notake') noTakeCount++;
    });

    const attestationRecord = {
      room: 'Room 205 (Grade 2)',
      school: 'Beacon Elementary',
      teacher: signatureName,
      presentCount,
      lateCount,
      leaveLateCount,
      absentCount,
      totalMeals: hotACount + coldBCount + saladCount,
      breakdown: {
        hotA: hotACount,
        coldB: coldBCount,
        salad: saladCount,
        own: ownCount,
        noTake: noTakeCount
      },
      ip: '10.42.1.88',
      signedAt: new Date().toLocaleString()
    };

    api.submissions.recordAttestation(attestationRecord);

    // Push live kitchen count delta
    const updatedKitchen = api.kitchen.updateTotals({
      hotEntreeA: hotACount,
      coldEntreeB: coldBCount,
      saladBar: saladCount,
      ownLunch: ownCount,
      didNotTakeMeal: noTakeCount
    });
    setKitchenTotals(updatedKitchen);

    // Push SignalR Change Alert
    const updatedAlerts = api.kitchen.addAlert({
      school: 'Beacon Elementary',
      room: 'Room 205',
      teacher: signatureName,
      message: `Room 205 Certified Count Transmitted (${hotACount + coldBCount + saladCount} Lunches)`,
      detail: `Hot Entrée A: ${hotACount}, Cold Entrée B: ${coldBCount}, Salad: ${saladCount}`,
      type: 'certified_count',
      actionLabel: 'Mark Added to Cart'
    });
    setChangeAlerts(updatedAlerts);

    // Broadcast toast / notification
    setLiveNotification({
      type: 'signalr',
      title: 'SignalR Push Live',
      message: 'Room 205 certified count pushed to Beacon Central Kitchen line!'
    });
    setTimeout(() => setLiveNotification(null), 5000);

    // Update staff row for Jennifer Ellis
    api.staff.getAll();
    setStaff(prev => prev.map(s => {
      if (s.name.includes('Ellis')) {
        return { ...s, countStatus: 'Submitted 8:48 AM', statusColor: 'emerald' };
      }
      return s;
    }));
  };

  // Add a Late Arrival after 9:00 AM (triggers Kitchen alert Page 19)
  const addLateArrivalAfterCutoff = (studentSid, studentName) => {
    const updatedAlerts = api.kitchen.addAlert({
      school: 'Beacon Elementary',
      room: 'Room 205',
      teacher: 'Mrs. Jennifer Ellis',
      message: `+1 Hot Entrée A (${studentName} · Arrived Late)`,
      detail: `Add +1 Hot Entrée A (Halal) to Room 205 warmer cart.`,
      type: 'late_arrival',
      actionLabel: 'Mark Added to Cart'
    });
    setChangeAlerts(updatedAlerts);

    api.kitchen.updateTotals({ hotEntreeA: 1 });
    setKitchenTotals(api.kitchen.getTotals());

    setLiveNotification({
      type: 'alert',
      title: '🚨 Kitchen Change Alert Dispatched',
      message: `Late arrival for ${studentName} (+1 Hot Entrée A) broadcast to kitchen!`
    });
    setTimeout(() => setLiveNotification(null), 5000);
  };

  // Handle Parent pre-selection
  const updateParentMealSelection = (childKey, day, choiceKey) => {
    const updated = api.parentSelections.save(childKey, day, choiceKey);
    setParentSelections(updated);
  };

  // Hard Reset
  const handleResetData = () => {
    resetDemoData();
    loadData();
    setIsLockedOut(false);
    setLiveNotification({
      type: 'info',
      title: 'Demo Data Restored',
      message: 'All sample data has been reset to pristine initial state.'
    });
    setTimeout(() => setLiveNotification(null), 3000);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        currentPage,
        setCurrentPage,
        isLockedOut,
        setIsLockedOut,
        liveNotification,
        setLiveNotification,
        // Data
        students,
        districts,
        setDistricts,
        staff,
        setStaff,
        kitchenTotals,
        changeAlerts,
        setChangeAlerts,
        benefitForms,
        setBenefitForms,
        telemetry,
        parentSelections,
        submissionHistory,
        // Morning workflow
        attendance,
        arrivalTimes,
        leaveLateReasons,
        breakfastChoices,
        lunchChoices,
        extendedChoices,
        signatureName,
        setSignatureName,
        markAllPresent,
        setStudentAttendance,
        setStudentBreakfast,
        setStudentLunch,
        fillRemainingHotA,
        toggleExtendedOption,
        submitCertifiedCount,
        addLateArrivalAfterCutoff,
        updateParentMealSelection,
        handleResetData,
        reloadFromStorage: loadData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
