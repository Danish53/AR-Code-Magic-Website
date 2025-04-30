import React from 'react'
import DC_Custom from '../../../Components/DashboardComponents/DashboardCustom/DC_Custom'
import DC_InfoCard from '../../../Components/DashboardComponents/DashboardCustom/DC_InfoCard'
function DashboardCustomTabPage() {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Main Section */}
        <div className="col-lg-8">
        <DC_Custom />
        </div>

        {/* Sidebar Section */}
        <div className="col-lg-4 mt-4 mt-lg-0">
          {/* Components for Information and Recent AR Code Magics */}
          <DC_InfoCard />
        </div>
      </div>
    </div>
  )
}

export default DashboardCustomTabPage