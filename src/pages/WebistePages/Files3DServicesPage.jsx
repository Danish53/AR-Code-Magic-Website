import React from 'react'
import HeroServices from '../../Components/WebsiteComponents/Files3DServicesComponent/HeroServices'
import Anchor3DModelSection from '../../Components/WebsiteComponents/Files3DServicesComponent/Anchor3DModelSection'
import Simplified3DModelUploading from '../../Components/WebsiteComponents/Files3DServicesComponent/Simplified3DModelUploading'
import Optimized3DModels from '../../Components/WebsiteComponents/Files3DServicesComponent/Optimized3DModels'
import SuccessStories from '../../Components/WebsiteComponents/Files3DServicesComponent/SuccessStories'
import ServicesFAQ from '../../Components/WebsiteComponents/Files3DServicesComponent/ServicesFAQ'
import LogoComponent from '../../Components/WebsiteComponents/Files3DServicesComponent/LogoComponent'
import StatisticsComponent from '../../Components/WebsiteComponents/Files3DServicesComponent/StatisticsComponent'
function Files3DServicesPage() {
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

export default Files3DServicesPage