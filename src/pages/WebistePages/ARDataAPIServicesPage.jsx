import React from 'react'
import HeroServices from '../../Components/WebsiteComponents/ARDataAPIServicesComponent/HeroServices'
import Anchor3DModelSection from '../../Components/WebsiteComponents/ARDataAPIServicesComponent/Anchor3DModelSection'
import Simplified3DModelUploading from '../../Components/WebsiteComponents/ARDataAPIServicesComponent/Simplified3DModelUploading'
import Optimized3DModels from '../../Components/WebsiteComponents/ARDataAPIServicesComponent/Optimized3DModels'
import SuccessStories from '../../Components/WebsiteComponents/ARDataAPIServicesComponent/SuccessStories'
import ServicesFAQ from '../../Components/WebsiteComponents/ARDataAPIServicesComponent/ServicesFAQ'
import LogoComponent from '../../Components/WebsiteComponents/ARDataAPIServicesComponent/LogoComponent'
import StatisticsComponent from '../../Components/WebsiteComponents/ARDataAPIServicesComponent/StatisticsComponent'
function ARDataAPIServicesPage() {
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

export default ARDataAPIServicesPage