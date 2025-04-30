import React from 'react';
// Import the related components (to be created later)
// import DashboardDashboardtab from '../../Components/DashboardComponents/DashboardDashboard/DashboardDashbordtab';
import DD_ARExperienceSelector from '../../../Components/DashboardComponents/DashboardDashboard/DD_ARExperienceSelector';
// import ReferenceNameInput from '../../../Components/DashboardComponents/DashboardDashboard/DD_ReferenceNameInput';
// import DD_OptionsForm from '../../../Components/DashboardComponents/DashboardDashboard/DD_OptionsForm';
import DD_InfoPanel from '../../../Components/DashboardComponents/DashboardDashboard/DD_InfoPanel';
import DD_RecentARCodes from '../../../Components/DashboardComponents/DashboardDashboard/DD_RecentARCodes';
import DD_QRCodeCard from '../../../Components/DashboardComponents/DashboardDashboard/DD_QRCodeCard';

function DashboardDashbordtabPage() {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Main Section */}
        <div className="col-lg-8">
        {/* <DashboardDashboardtab /> */}
          {/* Components for AR Experience */}
          <DD_ARExperienceSelector />
          {/* <ReferenceNameInput /> */}
          {/* <DD_OptionsForm /> */}
          <DD_QRCodeCard />
        </div>

        {/* Sidebar Section */}
        <div className="col-lg-4 mt-4 mt-lg-0">
          {/* Components for Information and Recent AR Code Magics */}
          <DD_InfoPanel />
          <DD_RecentARCodes />
        </div>
      </div>
    </div>
  );
}

export default DashboardDashbordtabPage;
