import React from 'react'
import HeroServices from '../../Components/WebsiteComponents/ARPortalServicesComponent/HeroServices'
import Anchor3DModelSection from '../../Components/WebsiteComponents/ARPortalServicesComponent/Anchor3DModelSection'
import Simplified3DModelUploading from '../../Components/WebsiteComponents/ARPortalServicesComponent/Simplified3DModelUploading'
import Optimized3DModels from '../../Components/WebsiteComponents/ARPortalServicesComponent/Optimized3DModels'
import SuccessStories from '../../Components/WebsiteComponents/ARPortalServicesComponent/SuccessStories'
import ServicesFAQ from '../../Components/WebsiteComponents/ARPortalServicesComponent/ServicesFAQ'
import LogoComponent from '../../Components/WebsiteComponents/ARPortalServicesComponent/LogoComponent'
import StatisticsComponent from '../../Components/WebsiteComponents/ARPortalServicesComponent/StatisticsComponent'
function ARPortalServicesPage() {
  return (
    <>
    <HeroServices />
    <Anchor3DModelSection />
    <Simplified3DModelUploading />
    <Optimized3DModels />
    <SuccessStories />
    <ServicesFAQ />
    <LogoComponent />
    <StatisticsComponent />
    </>
  )
}

export default ARPortalServicesPage