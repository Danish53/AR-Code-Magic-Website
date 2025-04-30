import React from 'react'
import HeroSection from '../../Components/WebsiteComponents/WebHome/HeroSection';
import ARSection from '../../Components/WebsiteComponents/WebHome/ARSection';
import HowToScanARCode from '../../Components/WebsiteComponents/WebHome/HowToScanARCode';
import AddARExperiences from '../../Components/WebsiteComponents/WebHome/AddARExperiences';
import ARHomeCards from '../../Components/WebsiteComponents/WebHome/ARHomeCards';
import ARRenderingTypes from '../../Components/WebsiteComponents/WebHome/ARRenderingTypes';
import ARDescription from '../../Components/WebsiteComponents/WebHome/ARDescription';
import ARWebInterface from '../../Components/WebsiteComponents/WebHome/ARWebInterface';
import ARLogoFeature from '../../Components/WebsiteComponents/WebHome/ARLogoFeature';
import ARDataAPI from '../../Components/WebsiteComponents/WebHome/ARDataAPI';
import FeatureSection from '../../Components/WebsiteComponents/WebHome/FeatureSection ';
import RevolutionizeSection from '../../Components/WebsiteComponents/WebHome/RevolutionizeSection';
function WebHomePage() {
  return (
    <>
    <HeroSection />
    <ARSection />
    <HowToScanARCode />
    <AddARExperiences />
    <ARHomeCards />
    <ARRenderingTypes />
    <ARDescription/>
    <ARWebInterface />
    <ARLogoFeature />
    <ARDataAPI />
    <FeatureSection />
    <RevolutionizeSection />
    </>
  )
}

export default WebHomePage