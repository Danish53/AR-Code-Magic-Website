import React from 'react'
import DashboardTeamWorkTab from '../../../Components/DashboardComponents/DashboardTeamWork/DashboardTeamWorkTab'
function DashboardTeamWorkTabPage() {
  return (
    <div className="container-fluid">
    <div className="row">
      {/* Main Section */}
      <div className="col-lg-8">
      <DashboardTeamWorkTab />
      </div>

      {/* Sidebar Section */}
      <div className="col-lg-4  mt-4 mt-lg-0">
        {/* Components for Information and Recent AR Code Magics */}

      </div>
    </div>
  </div>
  )
}

export default DashboardTeamWorkTabPage