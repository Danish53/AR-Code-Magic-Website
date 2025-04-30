import React from 'react'
import DM_Membership from '../../Components/DashboardComponents/DashboardMemberShip/DM_Membership'
import DM_ExpiryInfo from '../../Components/DashboardComponents/DashboardMemberShip/DM_ExpiryInfo'
function DashboardMemberShipPage() {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Main Section */}
        <div className="col-lg-8">
        <DM_Membership />
        </div>

        {/* Sidebar Section */}
        <div className="col-lg-4  mt-4 mt-lg-0">
          {/* Components for Information and Recent AR Code Magics */}
        <DM_ExpiryInfo />
        </div>
      </div>
    </div>
  )
}

export default DashboardMemberShipPage  