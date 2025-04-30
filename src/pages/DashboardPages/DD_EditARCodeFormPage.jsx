import React from 'react'
import DD_EditARCodeForm from '../../Components/DashboardComponents/DashboardDashboard/DD_EditARCodeForm'
import DD_QRCodeWithLogo from '../../Components/DashboardComponents/DashboardDashboard/DD_QRCodeWithLogo'
function DD_EditARCodeFormPage() {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Main Section */}
        <div className="col-lg-8">
        <DD_EditARCodeForm />
        </div>

        {/* Sidebar Section */}
        <div className="col-lg-4  mt-4 mt-lg-0">
          {/* Components for Information and Recent AR Code Magics */}
          <DD_QRCodeWithLogo />
        </div>
      </div>
    </div>
  )
}

export default DD_EditARCodeFormPage