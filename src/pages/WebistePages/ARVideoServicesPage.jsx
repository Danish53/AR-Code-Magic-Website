import React from 'react'
import HeroServices from '../../Components/WebsiteComponents/ARVideoServicesComponent/HeroServices'
import Anchor3DModelSection from '../../Components/WebsiteComponents/ARVideoServicesComponent/Anchor3DModelSection'
import Simplified3DModelUploading from '../../Components/WebsiteComponents/ARVideoServicesComponent/Simplified3DModelUploading'
import Optimized3DModels from '../../Components/WebsiteComponents/ARVideoServicesComponent/Optimized3DModels'
import SuccessStories from '../../Components/WebsiteComponents/ARVideoServicesComponent/SuccessStories'
import ServicesFAQ from '../../Components/WebsiteComponents/ARVideoServicesComponent/ServicesFAQ'
import LogoComponent from '../../Components/WebsiteComponents/ARVideoServicesComponent/LogoComponent'
import StatisticsComponent from '../../Components/WebsiteComponents/ARVideoServicesComponent/StatisticsComponent'
function ARVideoServicesPage() {
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

export default ARVideoServicesPage