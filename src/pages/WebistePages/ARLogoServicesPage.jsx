import React from 'react'
import HeroServices from '../../Components/WebsiteComponents/ARLogoServicesComponent/HeroServices'
import Anchor3DModelSection from '../../Components/WebsiteComponents/ARLogoServicesComponent/Anchor3DModelSection'
import Simplified3DModelUploading from '../../Components/WebsiteComponents/ARLogoServicesComponent/Simplified3DModelUploading'
import Optimized3DModels from '../../Components/WebsiteComponents/ARLogoServicesComponent/Optimized3DModels'
import SuccessStories from '../../Components/WebsiteComponents/ARLogoServicesComponent/SuccessStories'
import ServicesFAQ from '../../Components/WebsiteComponents/ARLogoServicesComponent/ServicesFAQ'
import LogoComponent from '../../Components/WebsiteComponents/ARLogoServicesComponent/LogoComponent'
import StatisticsComponent from '../../Components/WebsiteComponents/ARLogoServicesComponent/StatisticsComponent'
function ARLogoServicesPage() {
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

export default ARLogoServicesPage