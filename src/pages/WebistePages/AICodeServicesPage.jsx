import React from 'react'
import HeroServices from '../../Components/WebsiteComponents/AICodeServicesComponent/HeroServices'
import Anchor3DModelSection from '../../Components/WebsiteComponents/AICodeServicesComponent/Anchor3DModelSection'
import Simplified3DModelUploading from '../../Components/WebsiteComponents/AICodeServicesComponent/Simplified3DModelUploading'
import Optimized3DModels from '../../Components/WebsiteComponents/AICodeServicesComponent/Optimized3DModels'
import SuccessStories from '../../Components/WebsiteComponents/AICodeServicesComponent/SuccessStories'
import ServicesFAQ from '../../Components/WebsiteComponents/AICodeServicesComponent/ServicesFAQ'
import LogoComponent from '../../Components/WebsiteComponents/AICodeServicesComponent/LogoComponent'
import StatisticsComponent from '../../Components/WebsiteComponents/AICodeServicesComponent/StatisticsComponent'
function AICodeServicesPage() {
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

export default AICodeServicesPage