import React from 'react'
import DC_CustomCreate from '../../Components/DashboardComponents/DashboardCustom/DC_CustomCreate'
import DC_CustomCreateInfo from '../../Components/DashboardComponents/DashboardCustom/DC_CustomCreateInfo'
import DC_Customlogs from '../../Components/DashboardComponents/DashboardCustom/DC_Customlogs'
import { useParams } from 'react-router-dom'

function ScanLogPage() {
    const pageId = useParams().id;
    return (
        <div className="container-fluid">
            <div className="row">
                {/* Main Section */}
                <div className="col-lg-8">
                    <DC_Customlogs pageId={pageId} />
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

export default ScanLogPage