import React from 'react'
import HeroServices from '../../Components/WebsiteComponents/ObjectCaptureServicesComponent/HeroServices'
import Anchor3DModelSection from '../../Components/WebsiteComponents/ObjectCaptureServicesComponent/Anchor3DModelSection'
import Simplified3DModelUploading from '../../Components/WebsiteComponents/ObjectCaptureServicesComponent/Simplified3DModelUploading'
import Optimized3DModels from '../../Components/WebsiteComponents/ObjectCaptureServicesComponent/Optimized3DModels'
import SuccessStories from '../../Components/WebsiteComponents/ObjectCaptureServicesComponent/SuccessStories'
import ServicesFAQ from '../../Components/WebsiteComponents/ObjectCaptureServicesComponent/ServicesFAQ'
import LogoComponent from '../../Components/WebsiteComponents/ObjectCaptureServicesComponent/LogoComponent'
import StatisticsComponent from '../../Components/WebsiteComponents/ObjectCaptureServicesComponent/StatisticsComponent'
function ObjectCaptureServicesPage() {
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

export default ObjectCaptureServicesPage