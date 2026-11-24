import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import Header from './components/common/Header';
import NotificationToast from './components/common/NotificationToast';
import GsrpModal from './components/common/GsrpModal';
import PdfManualModal from './components/common/PdfManualModal';

// Group A: Teacher Morning Workflow
import Page1TeacherHub from './components/pages/GroupA/Page1TeacherHub';
import Page2QuickAttendance from './components/pages/GroupA/Page2QuickAttendance';
import Page3MealChoices from './components/pages/GroupA/Page3MealChoices';
import Page4ExtendedDay from './components/pages/GroupA/Page4ExtendedDay';
import Page5DigitalSignature from './components/pages/GroupA/Page5DigitalSignature';

// Group B: Parent Mobile Magic Link
import ParentMobileContainer from './components/pages/GroupB/ParentMobileContainer';

// Group C: Master Super-Portal
import Page10MasterDirectory from './components/pages/GroupC/Page10MasterDirectory';
import Page11OnboardProfile from './components/pages/GroupC/Page11OnboardProfile';
import Page12LicenseDuration from './components/pages/GroupC/Page12LicenseDuration';
import Page13FeatureModules from './components/pages/GroupC/Page13FeatureModules';
import Page14SystemTelemetry from './components/pages/GroupC/Page14SystemTelemetry';

// Group D: Client District Admin
import Page15DistrictAdminHome from './components/pages/GroupD/Page15DistrictAdminHome';
import Page16StaffDirectory from './components/pages/GroupD/Page16StaffDirectory';
import Page17InviteStaffForm from './components/pages/GroupD/Page17InviteStaffForm';

// Group E: Food Service & Kitchen Line
import Page18KitchenPrepBoard from './components/pages/GroupE/Page18KitchenPrepBoard';
import Page19ChangeAlertsStream from './components/pages/GroupE/Page19ChangeAlertsStream';
import Page20PdfApprovalDesk from './components/pages/GroupE/Page20PdfApprovalDesk';

// Group F: Special States, Emails & Lockout
import Page21HardLockout from './components/pages/GroupF/Page21HardLockout';
import Page22MasterReportEmail from './components/pages/GroupF/Page22MasterReportEmail';
import Page23ChangeAlertEmailSms from './components/pages/GroupF/Page23ChangeAlertEmailSms';

export default function App() {
  const { currentPage, isLockedOut } = useApp();
  const [showManualModal, setShowManualModal] = useState(false);
  const [showGsrpModal, setShowGsrpModal] = useState(false);

  // Router for 23 dedicated screens
  const renderCurrentScreen = () => {
    // If locked out, enforce Page 21 lockout
    if (isLockedOut && currentPage !== 21 && currentPage < 10) {
      return <Page21HardLockout />;
    }

    switch (currentPage) {
      // Group A: Teacher Morning Workflow
      case 1:
        return <Page1TeacherHub />;
      case 2:
        return <Page2QuickAttendance />;
      case 3:
        return <Page3MealChoices />;
      case 4:
        return <Page4ExtendedDay />;
      case 5:
        return <Page5DigitalSignature />;

      // Group B: Parent Mobile Magic Link
      case 6:
      case 7:
      case 8:
      case 9:
        return <ParentMobileContainer />;

      // Group C: Master Super-Portal
      case 10:
        return <Page10MasterDirectory />;
      case 11:
        return <Page11OnboardProfile />;
      case 12:
        return <Page12LicenseDuration />;
      case 13:
        return <Page13FeatureModules />;
      case 14:
        return <Page14SystemTelemetry />;

      // Group D: Client District Admin
      case 15:
        return <Page15DistrictAdminHome />;
      case 16:
        return <Page16StaffDirectory />;
      case 17:
        return <Page17InviteStaffForm />;

      // Group E: Food Service & Kitchen Line
      case 18:
        return <Page18KitchenPrepBoard />;
      case 19:
        return <Page19ChangeAlertsStream />;
      case 20:
        return <Page20PdfApprovalDesk />;

      // Group F: Special States, Emails & Lockout
      case 21:
        return <Page21HardLockout />;
      case 22:
        return <Page22MasterReportEmail />;
      case 23:
        return <Page23ChangeAlertEmailSms />;

      default:
        return <Page1TeacherHub />;
    }
  };

  return (
    <div className="min-h-screen bg-canvas flex flex-col font-sans text-textDark selection:bg-teal-100 selection:text-brandTeal">
      {/* Top Navigation & Control Header */}
      <Header
        onOpenManual={() => setShowManualModal(true)}
        onOpenGsrp={() => setShowGsrpModal(true)}
      />

      {/* Main Screen Content View */}
      <main className="flex-1 w-full">
        {renderCurrentScreen()}
      </main>

      {/* Real-time SignalR Notification Toast */}
      <NotificationToast />

      {/* GSRP Pre-K Workflow Modal */}
      <GsrpModal
        isOpen={showGsrpModal}
        onClose={() => setShowGsrpModal(false)}
      />

      {/* Interactive In-App PDF User Manual Modal */}
      <PdfManualModal
        isOpen={showManualModal}
        onClose={() => setShowManualModal(false)}
      />
    </div>
  );
}
