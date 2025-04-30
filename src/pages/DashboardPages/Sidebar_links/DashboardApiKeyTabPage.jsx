import React from 'react'
import DA_APIKeySection from '../../../Components/DashboardComponents/DashboardApiKey/DA_APIKeySection'
import DA_ARDataAPIInfo from '../../../Components/DashboardComponents/DashboardApiKey/DA_ARDataAPIInfo'

function DashboardApiKeyTabPage() {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Main Section */}
        <div className="col-lg-8">
        <DA_APIKeySection />
        </div>

        {/* Sidebar Section */}
        <div className="col-lg-4 mt-4 mt-lg-0">
        <DA_ARDataAPIInfo />
 
        </div>
      </div>
    </div>
  )
}

export default DashboardApiKeyTabPage