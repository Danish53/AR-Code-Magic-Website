import React from 'react'
import HeroServices from '../../Components/WebsiteComponents/ARTextServicesComponent/HeroServices'
import Anchor3DModelSection from '../../Components/WebsiteComponents/ARTextServicesComponent/Anchor3DModelSection'
import Simplified3DModelUploading from '../../Components/WebsiteComponents/ARTextServicesComponent/Simplified3DModelUploading'
import Optimized3DModels from '../../Components/WebsiteComponents/ARTextServicesComponent/Optimized3DModels'
import SuccessStories from '../../Components/WebsiteComponents/ARTextServicesComponent/SuccessStories'
import ServicesFAQ from '../../Components/WebsiteComponents/ARTextServicesComponent/ServicesFAQ'
import LogoComponent from '../../Components/WebsiteComponents/ARTextServicesComponent/LogoComponent'
import StatisticsComponent from '../../Components/WebsiteComponents/ARTextServicesComponent/StatisticsComponent'
function ARTextServicesPage() {
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

export default ARTextServicesPage