import React from 'react'
import HeroServices from '../../Components/WebsiteComponents/ARPhotoServicesComponent/HeroServices'
import Anchor3DModelSection from '../../Components/WebsiteComponents/ARPhotoServicesComponent/Anchor3DModelSection'
import Simplified3DModelUploading from '../../Components/WebsiteComponents/ARPhotoServicesComponent/Simplified3DModelUploading'
import Optimized3DModels from '../../Components/WebsiteComponents/ARPhotoServicesComponent/Optimized3DModels'
import SuccessStories from '../../Components/WebsiteComponents/ARPhotoServicesComponent/SuccessStories'
import ServicesFAQ from '../../Components/WebsiteComponents/ARPhotoServicesComponent/ServicesFAQ'
import LogoComponent from '../../Components/WebsiteComponents/ARPhotoServicesComponent/LogoComponent'
import StatisticsComponent from '../../Components/WebsiteComponents/ARPhotoServicesComponent/StatisticsComponent'
function ARPhotoServicesPage() {
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

export default ARPhotoServicesPage