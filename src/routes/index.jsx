// import { createBrowserRouter } from "react-router-dom";
// import App from "./../App";
// // website components
// import WebsiteLayout from "../Components/WebsiteLayoutMain/WebsiteLayout ";
// import WebHomePage from "../pages/WebistePages/WebHomePage";
// import ServicesPage from "../pages/WebistePages/ServicesPage";
// import PricingPage from "../pages/WebistePages/PricingPage";
// import BlogPage from "../pages/WebistePages/BlogPage";
// import ContactusPage from "../pages/WebistePages/ContactusPage";
// import TermsAndConditionsPage from "../pages/WebistePages/TermsAndConditionsPage";
// import FAQPage from "../pages/WebistePages/FAQPage";
// import PrivacyPolicyPage from "../pages/WebistePages/PrivacyPolicyPage";
// // import HomeTest from "../Components/WebsiteComponents/WebHome/HomeTest";
// // dashboard components
// import DashboardLayout from "../Components/DashboardGlobleNav/DashboardLayout";
// import DashboardHomePage from "../pages/DashboardPages/DashboardHomePage";
// import DD_EditARCodeFormPage from "../pages/DashboardPages/DD_EditARCodeFormPage";
// import DashboardDashbordtabPage from "../pages/DashboardPages/Sidebar_links/DashboardDashbordtabPage";
// import DashboardCustomTabPage from "../pages/DashboardPages/Sidebar_links/DashboardCustomTabPage";
// import DC_CustomCreatePage from "../pages/DashboardPages/DC_CustomCreatePage";
// import DashboardTrackingTabPage from "../pages/DashboardPages/Sidebar_links/DashboardTrackingTabPage";
// import DashboardARCodeStdTabPage from "../pages/DashboardPages/Sidebar_links/DashboardARCodeStdTabPage";
// import DashboardApiKeyPage from "../pages/DashboardPages/Sidebar_links/DashboardApiKeyTabPage";
// import DashboardTeamWorkTabPage from "../pages/DashboardPages/Sidebar_links/DashboardTeamWorkTabPage";
// // import BlogPage from "../Components/DashboardComponents/otherPage/BlogPage";
// import DashboardMemberShipPage from "../pages/DashboardPages/DashboardMemberShipPage";
// import DashboardSettingsPage from "../pages/DashboardPages/DashboardSettingsPage";
// // import DashboardContactUsPage from "../pages/DashboardPages/DashboardContactUsPage";
// import DashboardUserLoginPage from "../pages/DashboardPages/DashboardUserLoginPage";
// import DashboardRegistrationPage from "../pages/DashboardPages/DashboardRegistrationPage";
// // import { Component } from "react";
// import ARTextDisplay from "../pages/ARTextDisplay";
// import PublicRoute from "./PublicRoute";
// import PrivateRoute from "./PrivateRoute";

// const router = createBrowserRouter([
//   {
//     path: "",
//     element: <App />, // Grandparent route
//     children: [
//       {
//         element: <PublicRoute />, // ✅ Wrap all website pages
//         children: [
//           // Website Routes using WebsiteLayout
//           {
//             path: "",
//             element: <WebsiteLayout />, // Use Website Layout for the website routes
//             children: [
//               { path: "/", element: <WebHomePage /> },
//               { path: "/services/:slug", element: <ServicesPage /> },
//               { path: "/pricing", element: <PricingPage /> },
//               { path: "/blog", element: <BlogPage /> },
//               { path: "/terms-conditions", element: <TermsAndConditionsPage /> },
//               { path: "/privacy-policy", element: <PrivacyPolicyPage /> },
//               { path: "/faq", element: <FAQPage /> },
//               { path: "contact-us", element: <ContactusPage /> },
//               // { path: 'about-us', element: <AboutUsPage /> },
//               // { path: 'contact-us', element: <ContactUsPage /> },
//               // { path: 'blog', element: <BlogPage /> },
//             ],
//           },
//         ]
//       },

//       {
//         path: "user", // Middle-level route
//         element: <PrivateRoute />, // ✅ Protect dashboard
//         children: [
//           {
//             element: <DashboardLayout />, // Parent route
//             children: [
//               {
//                 path: "",
//                 element: <DashboardHomePage />, // Child route
//                 children: [
//                   { path: "", element: <DashboardDashbordtabPage /> },
//                   { path: "edit", element: <DD_EditARCodeFormPage /> },
//                   { path: "custom-pages", element: <DashboardCustomTabPage /> },
//                   { path: "custom-create", element: <DC_CustomCreatePage /> },
//                   { path: "tracking", element: <DashboardTrackingTabPage /> },
//                   {
//                     path: "ar-code-studio",
//                     element: <DashboardARCodeStdTabPage />,
//                   },
//                   { path: "api-key", element: <DashboardApiKeyPage /> },
//                   { path: "team-work", element: <DashboardTeamWorkTabPage /> },
//                   { path: "membership", element: <DashboardMemberShipPage /> },
//                   { path: "settings", element: <DashboardSettingsPage /> },
//                   // { path: "contact-us", element: <DashboardContactUsPage /> },
//                   // { path: "login", element: <DashboardUserLoginPage /> },

//                 ],
//               },
//               // Second child route (Other pages like Blog, About Us)
//               {
//                 path: "info",
//                 children: [
//                   { path: "blog", element: <BlogPage /> },
//                   // { path: "about-us", element: <AboutUsPage /> },
//                 ],
//               },

//               // third child route (Other pages like Blog, About Us)
//               {
//                 path: "",
//                 children: [
//                   { path: "login", element: <DashboardUserLoginPage /> },
//                   { path: "register", element: <DashboardRegistrationPage /> },
//                   // { path: "about-us", element: <AboutUsPage /> },
//                 ],
//               },

//               // Fallback Route
//               // {
//               //   path: "*",
//               //   element: <NotFoundPage />,
//               // },
//             ],
//           }
//         ]
//       },



//     ],

//   },


//   { path: "/ar-text/:id", element: <ARTextDisplay /> },
// ]);

// export default router;


// ✅ src/routes/index.js
import { createBrowserRouter } from "react-router-dom";
import App from "./../App";

// 🟩 Website components
import WebsiteLayout from "../Components/WebsiteLayoutMain/WebsiteLayout ";
import WebHomePage from "../pages/WebistePages/WebHomePage";
import ServicesPage from "../pages/WebistePages/ServicesPage";
import PricingPage from "../pages/WebistePages/PricingPage";
import BlogPage from "../pages/WebistePages/BlogPage";
import ContactusPage from "../pages/WebistePages/ContactusPage";
import TermsAndConditionsPage from "../pages/WebistePages/TermsAndConditionsPage";
import FAQPage from "../pages/WebistePages/FAQPage";
import PrivacyPolicyPage from "../pages/WebistePages/PrivacyPolicyPage";

// 🟦 Dashboard components
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
import DashboardMemberShipPage from "../pages/DashboardPages/DashboardMemberShipPage";
import DashboardSettingsPage from "../pages/DashboardPages/DashboardSettingsPage";
import DashboardUserLoginPage from "../pages/DashboardPages/DashboardUserLoginPage";
import DashboardRegistrationPage from "../pages/DashboardPages/DashboardRegistrationPage";

// 🟧 Other Pages
import ARTextDisplay from "../pages/ARTextDisplay";

// 🧱 Route Guards
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import SuccessPage from "../pages/WebistePages/SuccessPage";
import DC_CustomUpdatePage from "../pages/DashboardPages/DC_CustomUpdatePage";
import DC_CustomPageView from "../pages/DC_CustomPageView";
import ScanLogPage from "../pages/DashboardPages/DashboardScanLog";
import ARVideo from "../pages/ARVideo";
import ARFaceFilter from "../pages/ARFace";

// 🧭 Router Configuration
const router = createBrowserRouter([
  {
    path: "",
    element: <App />, // Grandparent route
    children: [
      // 🌍 Public Routes — only accessible when NOT logged in
      {
        element: <PublicRoute />, // ✅ Wrap all website pages
        children: [
          {
            path: "",
            element: <WebsiteLayout />, // Website layout for public pages
            children: [
              { path: "/", element: <WebHomePage /> },
              { path: "/services/:slug", element: <ServicesPage /> },
              { path: "/pricing", element: <PricingPage /> },
              { path: "/blog", element: <BlogPage /> },
              { path: "/terms-conditions", element: <TermsAndConditionsPage /> },
              { path: "/privacy-policy", element: <PrivacyPolicyPage /> },
              { path: "/faq", element: <FAQPage /> },
              { path: "contact-us", element: <ContactusPage /> },
            ],
          },
        ],
      },

      // 🔒 Private Routes — only accessible when user has token
      {
        path: "user",
        element: <PrivateRoute />, // Protect dashboard routes
        children: [
          {
            element: <DashboardLayout />,
            children: [
              {
                path: "",
                element: <DashboardHomePage />,
                children: [
                  { path: "", element: <DashboardDashbordtabPage /> },
                  { path: "edit", element: <DD_EditARCodeFormPage /> },
                  { path: "custom-pages", element: <DashboardCustomTabPage /> },
                  { path: "scan-logs/:id", element: <ScanLogPage /> },
                  { path: "custom-create", element: <DC_CustomCreatePage /> },
                  { path: "custom-edit/:id", element: <DC_CustomUpdatePage /> },
                  { path: "tracking", element: <DashboardTrackingTabPage /> },
                  { path: "ar-code-studio", element: <DashboardARCodeStdTabPage /> },
                  { path: "api-key", element: <DashboardApiKeyPage /> },
                  { path: "team-work", element: <DashboardTeamWorkTabPage /> },
                  { path: "membership", element: <DashboardMemberShipPage /> },
                  { path: "settings", element: <DashboardSettingsPage /> },
                ],
              },
              {
                path: "",
                children: [
                  { path: "pricing", element: <PricingPage /> },
                  { path: "blog", element: <BlogPage /> },
                  { path: "contact-us", element: <ContactusPage /> },
                  { path: "faq", element: <FAQPage /> },
                  { path: "terms-conditions", element: <TermsAndConditionsPage /> },
                  { path: "privacy-policy", element: <PrivacyPolicyPage /> },
                ],
              },
              // Optional extra nested routes
              {
                path: "info",
                children: [
                  { path: "blog", element: <BlogPage /> },
                ],
              },
            ],
          },
        ],
      },

      // 🧭 Auth pages (login/register) — outside PrivateRoute
      { path: "/user/login", element: <DashboardUserLoginPage /> },
      { path: "/user/register", element: <DashboardRegistrationPage /> },
    ],
  },
  // 🟣 Public standalone route
  { path: "/user/page/:id", element: <DC_CustomPageView /> },
  { path: "/ar-video/:id", element: <ARVideo /> },
  { path: "/ar-face/:id", element: <ARFaceFilter /> },
  { path: "/ar-text/:id", element: <ARTextDisplay /> },
  { path: "/payment-success", element: <SuccessPage /> },
  { path: "/payment-cancel", element: <h2>Payment Cancelled</h2> }
]);

export default router;

