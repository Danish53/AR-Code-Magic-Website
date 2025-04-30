import { createBrowserRouter } from "react-router-dom";
import App from "./../App";
// website components
import WebsiteLayout from "../Components/WebsiteLayoutMain/WebsiteLayout ";
import WebHomePage from "../pages/WebistePages/WebHomePage";
import ServicesPage from "../pages/WebistePages/ServicesPage";
import PricingPage from "../pages/WebistePages/PricingPage";
import BlogPage from "../pages/WebistePages/BlogPage";
import ContactusPage from "../pages/WebistePages/ContactusPage";
import TermsAndConditionsPage from "../pages/WebistePages/TermsAndConditionsPage";
import FAQPage from "../pages/WebistePages/FAQPage";
import PrivacyPolicyPage from "../pages/WebistePages/PrivacyPolicyPage";
// import HomeTest from "../Components/WebsiteComponents/WebHome/HomeTest";
// dashboard components
import DashboardLayout from "../Components/DashboardGlobleNav/DashboardLayout";
import DashboardHomePage from "../pages/DashboardPages/DashboardHomePage";
import DD_EditARCodeFormPage from "../pages/DashboardPages/DD_EditARCodeFormPage";
import DashboardDashbordtabPage from "../pages/DashboardPages/Sidebar_links/DashboardDashbordtabPage";
import DashboardCustomTabPage from "../pages/DashboardPages/Sidebar_links/DashboardCustomTabPage";
import DC_CustomCreatePage from "../pages/DashboardPages/DC_CustomCreatePage";
import DashboardTrackingTabPage from "../pages/DashboardPages/Sidebar_links/DashboardTrackingTabPage";
import DashboardARCodeStdTabPage from "../pages/DashboardPages/Sidebar_links/DashboardARCodeStdTabPage";
import DashboardApiKeyPage from "../pages/DashboardPages/Sidebar_links/DashboardApiKeyTabPage";
import DashboardTeamWorkTabPage from "../pages/DashboardPages/Sidebar_links/DashboardTeamWorkTabPage";
// import BlogPage from "../Components/DashboardComponents/otherPage/BlogPage";
import DashboardMemberShipPage from "../pages/DashboardPages/DashboardMemberShipPage";
import DashboardSettingsPage from "../pages/DashboardPages/DashboardSettingsPage";
// import DashboardContactUsPage from "../pages/DashboardPages/DashboardContactUsPage";
import DashboardUserLoginPage from "../pages/DashboardPages/DashboardUserLoginPage";
import DashboardRegistrationPage from "../pages/DashboardPages/DashboardRegistrationPage";
// import { Component } from "react";
import ARTextDisplay from "../pages/ARTextDisplay";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />, // Grandparent route
    children: [ 
      // Website Routes using WebsiteLayout
      {
        path: "",
        element: <WebsiteLayout />, // Use Website Layout for the website routes
        children: [
          { path: "/", element: <WebHomePage /> },
          { path: "/services/:slug", element: <ServicesPage /> },
          { path: "/pricing", element: <PricingPage /> },
          { path: "/blog", element: <BlogPage /> },
          { path: "/terms-conditions", element: <TermsAndConditionsPage /> },
          { path: "/privacy-policy", element: <PrivacyPolicyPage /> },
          { path: "/faq", element: <FAQPage /> },
          { path: "contact-us", element: <ContactusPage /> },
          // { path: 'about-us', element: <AboutUsPage /> },
          // { path: 'contact-us', element: <ContactUsPage /> },
          // { path: 'blog', element: <BlogPage /> },
        ],
      },

      {
        path: "user", // Middle-level route
        element: <DashboardLayout />, // Parent route
        children: [
          {
            path: "",
            element: <DashboardHomePage />, // Child route
            children: [
              { path: "", element: <DashboardDashbordtabPage /> },
              { path: "edit", element: <DD_EditARCodeFormPage /> },
              { path: "custom-pages", element: <DashboardCustomTabPage /> },
              { path: "custom-create", element: <DC_CustomCreatePage /> },
              { path: "tracking", element: <DashboardTrackingTabPage /> },
              {
                path: "ar-code-studio",
                element: <DashboardARCodeStdTabPage />,
              },
              { path: "api-key", element: <DashboardApiKeyPage /> },
              { path: "team-work", element: <DashboardTeamWorkTabPage /> },
              { path: "membership", element: <DashboardMemberShipPage /> },
              { path: "settings", element: <DashboardSettingsPage /> },
              // { path: "contact-us", element: <DashboardContactUsPage /> },
              // { path: "login", element: <DashboardUserLoginPage /> },

            ],
          },
          // Second child route (Other pages like Blog, About Us)
          {
            path: "info",
            children: [
              { path: "blog", element: <BlogPage /> },
              // { path: "about-us", element: <AboutUsPage /> },
            ],
          },

          // third child route (Other pages like Blog, About Us)
          {
            path: "",
            children: [
              { path: "login", element: <DashboardUserLoginPage /> },
              { path: "register", element: <DashboardRegistrationPage /> },
              // { path: "about-us", element: <AboutUsPage /> },
            ],
          },

          // Fallback Route
          // {
          //   path: "*",
          //   element: <NotFoundPage />,
          // },
        ],
      },

    ],
    
  },
  
      
  { path: "/ar-text/:id", element: <ARTextDisplay /> },
]);

export default router;
