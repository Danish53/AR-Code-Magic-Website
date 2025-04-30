import React from 'react'
import DT_TrackingTab from '../../../Components/DashboardComponents/DashboardTracking/DT_TrackingTab'
import DT_TrackingInfo from '../../../Components/DashboardComponents/DashboardTracking/DT_TrackingInfo'
function DashboardTrackingTabPage() {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Main Section */}
        <div className="col-lg-8">
        <DT_TrackingTab />
        </div>

        {/* Sidebar Section */}
        <div className="col-lg-4  mt-4 mt-lg-0">
          {/* Components for Information and Recent AR Code Magics */}
        <DT_TrackingInfo />
        </div>
      </div>
    </div>
  )
}

export default DashboardTrackingTabPage