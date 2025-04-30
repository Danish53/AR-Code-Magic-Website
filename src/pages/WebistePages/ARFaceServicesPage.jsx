import React from 'react'
import HeroServices from '../../Components/WebsiteComponents/ARFaceServicesComponent/HeroServices'
import Anchor3DModelSection from '../../Components/WebsiteComponents/ARFaceServicesComponent/Anchor3DModelSection'
import Simplified3DModelUploading from '../../Components/WebsiteComponents/ARFaceServicesComponent/Simplified3DModelUploading'
import Optimized3DModels from '../../Components/WebsiteComponents/ARFaceServicesComponent/Optimized3DModels'
import SuccessStories from '../../Components/WebsiteComponents/ARFaceServicesComponent/SuccessStories'
import ServicesFAQ from '../../Components/WebsiteComponents/ARFaceServicesComponent/ServicesFAQ'
import LogoComponent from '../../Components/WebsiteComponents/ARFaceServicesComponent/LogoComponent'
import StatisticsComponent from '../../Components/WebsiteComponents/ARFaceServicesComponent/StatisticsComponent'
function ARFaceServicesPage() {
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

export default ARFaceServicesPage