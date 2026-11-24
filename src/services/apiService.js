import {
  INITIAL_STUDENTS,
  INITIAL_DISTRICTS,
  INITIAL_STAFF,
  INITIAL_CHANGE_ALERTS,
  INITIAL_KITCHEN_TOTALS,
  INITIAL_TELEMETRY,
  BENEFIT_FORMS
} from '../data/mockData';

const STORAGE_KEYS = {
  STUDENTS: 'mealtrack_students_v1',
  DISTRICTS: 'mealtrack_districts_v1',
  STAFF: 'mealtrack_staff_v1',
  ALERTS: 'mealtrack_alerts_v1',
  KITCHEN: 'mealtrack_kitchen_v1',
  TELEMETRY: 'mealtrack_telemetry_v1',
  BENEFIT_FORMS: 'mealtrack_benefit_forms_v1',
  SUBMISSIONS: 'mealtrack_submissions_v1',
  PARENT_SELECTIONS: 'mealtrack_parent_selections_v1',
  CURRENT_USER: 'mealtrack_current_user_v1',
  LOCKOUT_OVERRIDE: 'mealtrack_lockout_override_v1',
};

// Seed storage if empty
export function initLocalStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.STUDENTS)) {
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(INITIAL_STUDENTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.DISTRICTS)) {
    localStorage.setItem(STORAGE_KEYS.DISTRICTS, JSON.stringify(INITIAL_DISTRICTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.STAFF)) {
    localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(INITIAL_STAFF));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ALERTS)) {
    localStorage.setItem(STORAGE_KEYS.ALERTS, JSON.stringify(INITIAL_CHANGE_ALERTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.KITCHEN)) {
    localStorage.setItem(STORAGE_KEYS.KITCHEN, JSON.stringify(INITIAL_KITCHEN_TOTALS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.TELEMETRY)) {
    localStorage.setItem(STORAGE_KEYS.TELEMETRY, JSON.stringify(INITIAL_TELEMETRY));
  }
  if (!localStorage.getItem(STORAGE_KEYS.BENEFIT_FORMS)) {
    localStorage.setItem(STORAGE_KEYS.BENEFIT_FORMS, JSON.stringify(BENEFIT_FORMS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SUBMISSIONS)) {
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.PARENT_SELECTIONS)) {
    localStorage.setItem(STORAGE_KEYS.PARENT_SELECTIONS, JSON.stringify({
      jordan: { mon: 'hotA', tue: 'hotA', wed: 'coldB', thu: 'salad', fri: 'own' },
      maya: { mon: 'salad', tue: 'coldB', wed: 'hotA', thu: 'own', fri: 'notake' }
    }));
  }
}

// Reset all storage to pristine demo state
export function resetDemoData() {
  localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(INITIAL_STUDENTS));
  localStorage.setItem(STORAGE_KEYS.DISTRICTS, JSON.stringify(INITIAL_DISTRICTS));
  localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(INITIAL_STAFF));
  localStorage.setItem(STORAGE_KEYS.ALERTS, JSON.stringify(INITIAL_CHANGE_ALERTS));
  localStorage.setItem(STORAGE_KEYS.KITCHEN, JSON.stringify(INITIAL_KITCHEN_TOTALS));
  localStorage.setItem(STORAGE_KEYS.TELEMETRY, JSON.stringify(INITIAL_TELEMETRY));
  localStorage.setItem(STORAGE_KEYS.BENEFIT_FORMS, JSON.stringify(BENEFIT_FORMS));
  localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify([]));
  localStorage.setItem(STORAGE_KEYS.PARENT_SELECTIONS, JSON.stringify({
    jordan: { mon: 'hotA', tue: 'hotA', wed: 'coldB', thu: 'salad', fri: 'own' },
    maya: { mon: 'salad', tue: 'coldB', wed: 'hotA', thu: 'own', fri: 'notake' }
  }));
  localStorage.removeItem(STORAGE_KEYS.LOCKOUT_OVERRIDE);
}

// Helper to safely fetch from localStorage
function getStore(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

// Helper to set into localStorage
function setStore(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('Storage write error', err);
  }
}

// Simulated .NET Core Web API Client Layer
export const api = {
  students: {
    getAll: () => getStore(STORAGE_KEYS.STUDENTS, INITIAL_STUDENTS),
    getByRoom: (room) => {
      const all = getStore(STORAGE_KEYS.STUDENTS, INITIAL_STUDENTS);
      return all.filter(s => s.room === room);
    },
    update: (sid, updates) => {
      const all = getStore(STORAGE_KEYS.STUDENTS, INITIAL_STUDENTS);
      const idx = all.findIndex(s => s.sid === sid);
      if (idx !== -1) {
        all[idx] = { ...all[idx], ...updates };
        setStore(STORAGE_KEYS.STUDENTS, all);
      }
      return all;
    }
  },

  districts: {
    getAll: () => getStore(STORAGE_KEYS.DISTRICTS, INITIAL_DISTRICTS),
    getById: (id) => {
      const list = getStore(STORAGE_KEYS.DISTRICTS, INITIAL_DISTRICTS);
      return list.find(d => d.id === id);
    },
    create: (districtData) => {
      const list = getStore(STORAGE_KEYS.DISTRICTS, INITIAL_DISTRICTS);
      const newDistrict = {
        ...districtData,
        id: districtData.subdomain || `dist-${Date.now()}`,
        status: 'Active',
        daysRemaining: 365,
        enrolledStudents: districtData.seatCap ? Math.round(districtData.seatCap * 0.8) : 1200
      };
      const updated = [newDistrict, ...list];
      setStore(STORAGE_KEYS.DISTRICTS, updated);
      return newDistrict;
    },
    updateLockout: (id, isLocked) => {
      const list = getStore(STORAGE_KEYS.DISTRICTS, INITIAL_DISTRICTS);
      const updated = list.map(d => {
        if (d.id === id) {
          return {
            ...d,
            status: isLocked ? 'Expired' : 'Active',
            daysRemaining: isLocked ? 0 : 361
          };
        }
        return d;
      });
      setStore(STORAGE_KEYS.DISTRICTS, updated);
      return updated;
    }
  },

  staff: {
    getAll: () => getStore(STORAGE_KEYS.STAFF, INITIAL_STAFF),
    invite: (staffData) => {
      const list = getStore(STORAGE_KEYS.STAFF, INITIAL_STAFF);
      const newStaff = {
        id: `st-${Date.now()}`,
        name: staffData.name,
        role: staffData.role,
        school: staffData.school,
        room: staffData.room,
        email: staffData.email,
        countStatus: 'Pending (Invited)',
        statusColor: 'amber',
        canRemind: true
      };
      const updated = [...list, newStaff];
      setStore(STORAGE_KEYS.STAFF, updated);
      return newStaff;
    },
    sendReminder: (id) => {
      const list = getStore(STORAGE_KEYS.STAFF, INITIAL_STAFF);
      const updated = list.map(s => {
        if (s.id === id) {
          return { ...s, countStatus: 'Reminder Sent (9:02 AM)', canRemind: false };
        }
        return s;
      });
      setStore(STORAGE_KEYS.STAFF, updated);
      return updated;
    }
  },

  kitchen: {
    getTotals: () => getStore(STORAGE_KEYS.KITCHEN, INITIAL_KITCHEN_TOTALS),
    updateTotals: (delta) => {
      const current = getStore(STORAGE_KEYS.KITCHEN, INITIAL_KITCHEN_TOTALS);
      const updated = {
        ...current,
        hotEntreeA: current.hotEntreeA + (delta.hotEntreeA || 0),
        coldEntreeB: current.coldEntreeB + (delta.coldEntreeB || 0),
        saladBar: current.saladBar + (delta.saladBar || 0),
        ownLunch: current.ownLunch + (delta.ownLunch || 0),
        didNotTakeMeal: current.didNotTakeMeal + (delta.didNotTakeMeal || 0),
        lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setStore(STORAGE_KEYS.KITCHEN, updated);
      return updated;
    },
    getAlerts: () => getStore(STORAGE_KEYS.ALERTS, INITIAL_CHANGE_ALERTS),
    addAlert: (alertData) => {
      const current = getStore(STORAGE_KEYS.ALERTS, INITIAL_CHANGE_ALERTS);
      const newAlert = {
        id: `alt-${Date.now()}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        school: alertData.school || 'Beacon Elementary',
        room: alertData.room || 'Room 205',
        teacher: alertData.teacher || 'Mrs. Jennifer Ellis',
        message: alertData.message,
        detail: alertData.detail,
        status: 'pending',
        type: alertData.type || 'late_arrival',
        actionLabel: alertData.actionLabel || 'Mark Added to Cart'
      };
      const updated = [newAlert, ...current];
      setStore(STORAGE_KEYS.ALERTS, updated);
      return updated;
    },
    resolveAlert: (id) => {
      const current = getStore(STORAGE_KEYS.ALERTS, INITIAL_CHANGE_ALERTS);
      const updated = current.map(a => {
        if (a.id === id) {
          return { ...a, status: 'resolved' };
        }
        return a;
      });
      setStore(STORAGE_KEYS.ALERTS, updated);
      return updated;
    }
  },

  benefitForms: {
    getAll: () => getStore(STORAGE_KEYS.BENEFIT_FORMS, BENEFIT_FORMS),
    submitForm: (formData) => {
      const list = getStore(STORAGE_KEYS.BENEFIT_FORMS, BENEFIT_FORMS);
      const newForm = {
        id: `BF-2026-${Math.floor(10000 + Math.random() * 90000)}`,
        parentName: formData.parentName,
        guardianPhone: formData.guardianPhone || '(313) 555-0112',
        email: formData.email || 'rachel.carter@gmail.com',
        children: formData.children || [
          { name: 'Jordan Carter', school: 'Beacon Elementary', grade: 'Grade 2', id: '20025487' },
          { name: 'Maya Carter', school: 'Beacon Elementary', grade: 'Grade 4', id: '20019966' }
        ],
        hasAssistance: formData.hasAssistance,
        assistanceProgram: formData.hasAssistance ? 'SNAP / FIP' : 'Income Qualified',
        caseNumber: formData.caseNumber || 'N/A',
        householdSize: formData.householdSize || 4,
        annualIncomeBracket: formData.incomeBracket || '$34,000 – $42,000',
        signatureText: formData.signatureText,
        signedAt: new Date().toLocaleString(),
        ipAddress: '10.42.1.88',
        certVerified: true,
        auditVerification: {
          snapCaseVerified: !!formData.hasAssistance,
          householdMatched: true,
          duplicateFound: false
        },
        status: 'Approved',
        currentClassification: formData.hasAssistance ? 'Free Meals' : 'Reduced',
        syncedToMiStar: true
      };
      const updated = [newForm, ...list];
      setStore(STORAGE_KEYS.BENEFIT_FORMS, updated);
      return newForm;
    },
    updateStatus: (id, classification, syncMiStar = false) => {
      const list = getStore(STORAGE_KEYS.BENEFIT_FORMS, BENEFIT_FORMS);
      const updated = list.map(f => {
        if (f.id === id) {
          return {
            ...f,
            currentClassification: classification,
            status: 'Approved',
            syncedToMiStar: syncMiStar || f.syncedToMiStar
          };
        }
        return f;
      });
      setStore(STORAGE_KEYS.BENEFIT_FORMS, updated);
      return updated;
    },
    flagDuplicate: (id) => {
      const list = getStore(STORAGE_KEYS.BENEFIT_FORMS, BENEFIT_FORMS);
      const updated = list.map(f => {
        if (f.id === id) {
          return { ...f, status: 'Flagged Duplicate' };
        }
        return f;
      });
      setStore(STORAGE_KEYS.BENEFIT_FORMS, updated);
      return updated;
    }
  },

  submissions: {
    getAll: () => getStore(STORAGE_KEYS.SUBMISSIONS, []),
    recordAttestation: (attestation) => {
      const list = getStore(STORAGE_KEYS.SUBMISSIONS, []);
      const record = {
        id: `ATT-${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        ...attestation
      };
      const updated = [record, ...list];
      setStore(STORAGE_KEYS.SUBMISSIONS, updated);
      return record;
    }
  },

  parentSelections: {
    get: () => getStore(STORAGE_KEYS.PARENT_SELECTIONS, {}),
    save: (childKey, day, choiceKey) => {
      const current = getStore(STORAGE_KEYS.PARENT_SELECTIONS, {});
      const childData = current[childKey] || {};
      childData[day] = choiceKey;
      const updated = { ...current, [childKey]: childData };
      setStore(STORAGE_KEYS.PARENT_SELECTIONS, updated);
      return updated;
    }
  },

  telemetry: {
    get: () => getStore(STORAGE_KEYS.TELEMETRY, INITIAL_TELEMETRY),
  }
};
