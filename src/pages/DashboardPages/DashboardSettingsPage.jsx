import React from 'react'
import DS_AccountSettingsForm from '../../Components/DashboardComponents/DashboardSettings/DS_AccountSettingsForm'
import DS_AccountActions from '../../Components/DashboardComponents/DashboardSettings/DS_AccountActions'
function DashboardSettingsPage() {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Main Section */}
        <div className="col-lg-8">
        <DS_AccountSettingsForm />
        </div>

        {/* Sidebar Section */}
        <div className="col-lg-4  mt-4 mt-lg-0">
          {/* Components for Information and Recent AR Code Magics */}
          <DS_AccountActions />
        </div>
      </div>
    </div>
  )
}

export default DashboardSettingsPage