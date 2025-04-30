import React from 'react'
import HeroServices from '../../Components/WebsiteComponents/ServicesComponent/HeroServices'
import Anchor3DModelSection from '../../Components/WebsiteComponents/ServicesComponent/Anchor3DModelSection'
import Simplified3DModelUploading from '../../Components/WebsiteComponents/ServicesComponent/Simplified3DModelUploading'
import Optimized3DModels from '../../Components/WebsiteComponents/ServicesComponent/Optimized3DModels'
import SuccessStories from '../../Components/WebsiteComponents/ServicesComponent/SuccessStories'
import ServicesFAQ from '../../Components/WebsiteComponents/ServicesComponent/ServicesFAQ'
import LogoComponent from '../../Components/WebsiteComponents/ServicesComponent/LogoComponent'
import StatisticsComponent from '../../Components/WebsiteComponents/ServicesComponent/StatisticsComponent'
function ServicesPage() {
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

export default ServicesPage