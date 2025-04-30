import React from 'react'
import DC_CustomCreate from '../../Components/DashboardComponents/DashboardCustom/DC_CustomCreate'
import DC_CustomCreateInfo from '../../Components/DashboardComponents/DashboardCustom/DC_CustomCreateInfo'
function DC_CustomCreatePage() {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Main Section */}
        <div className="col-lg-8">
        <DC_CustomCreate />
        </div>

        {/* Sidebar Section */}
        <div className="col-lg-4  mt-4 mt-lg-0">
          {/* Components for Information and Recent AR Code Magics */}
        <DC_CustomCreateInfo />
        </div>
      </div>
    </div>
  )
}

export default DC_CustomCreatePage