import React from 'react'
import DashboardARCodeStdTab from '../../../Components/DashboardComponents/DashboardARCodeStd/DashboardARCodeStdTab'
function DashboardARCodeStdTabPage() {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Main Section */}
        <div className="col-lg-8">
          <DashboardARCodeStdTab />
        </div>

        {/* Sidebar Section */}
        <div className="col-lg-4 mt-4 mt-lg-0">
          {/* Components for Information and Recent AR Code Magics */}
        </div>
      </div>
    </div>
  )
}

export default DashboardARCodeStdTabPage