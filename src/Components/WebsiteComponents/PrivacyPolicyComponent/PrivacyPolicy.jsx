import React from "react";
import { Link } from "react-router-dom";


function PrivacyPolicy() {
  const privacyPolicy = [
    {
      title: "AR Code Magic Privacy Policy",
      content: [
        "At AR Code Magic, privacy and security are paramount. Here we provide a complete detail regarding our privacy policy and how we collect, use, share, and secure your information during your visit and while utilizing our AR technology services. By accessing the AR Code Magic Services, you accept the practices outlined below:"
      ],
    },
    {
      title: "1. Collection of Information",
      content: [
        "We collect various types of information from our users. Below are the details:",
        <br key="br-1" />,
        <br key="br-2" />,
        <strong key="personal-info-heading">a. Personal Information</strong>,
        <ul key="personal-info-list" className="ms-4">
          <li>
            When a user signs up or tries to contact us we collect their name, email address, and contact info for further queries.
          </li>
          <li>
            Payment information for ordering services is made through third-party payment processors over a secure server.
          </li>
        </ul>,
        <strong key="non-personal-heading">b. Non-Personal Information</strong>,
        <ul key="non-personal-list" className="ms-4">
          <li>Device type and browser type/operating system.</li>
          <li>Pages you visit, the amount of time you spend on our site, and features you utilize.</li>
        </ul>,
        <strong key="uploaded-content-heading">c. Uploaded Content</strong>,
        <ul key="uploaded-content-list" className="ms-4">
          <li>3D models, AR experiences, or any other multimedia files you upload on our platform.</li>
        </ul>
      ],
    },
    {
      title: "2. What We Do with Your Information?",
      content: [
        "We use collected information to provide and improve our services, personalize users' experience, process transactions, and manage accounts. We also utilize users' information for sharing future updates, promotions, or changes in services regarding our customers. We protect you from unauthorized fraud and provide security by collecting your basic information."
      ],
    },
    {
      title: "3. Sharing Your Information",
      content: [
        "We at AR Code Magic don't sell or leak your personal information to third parties. However, we might share your information with service providers and trusted third-party vendors for payment processing, analytics, and technical support. Additionally, we may share your information for legal obligations to protect the rights and safety of AR Code Magic and its users."
      ],
    },
    {
      title: "4. Cookies and Tracking Technologies",
      content: [
        "AR Code Magic uses cookies to improve the user experience and collect usage data. Users are free to control or disable cookies in their browser settings. If you do, you'll limit some of what the platform can offer."
      ],
    },
    {
      title: "5. Data Retention",
      content: [
        "We will hold and protect your personal information for as long as it is necessary to provide our services. Uploaded content will be stored until it is deleted or the account is terminated."
      ],
    },
    {
      title: "6. Security Measures",
      content: [
        "We have implemented measures that are commensurate with industry standards to protect your information from unauthorized access, modification, or loss. However, no method of transmission over the Internet is completely secure."
      ],
    },
    {
      title: "7. Your Rights",
      content: [
        "Users have the following rights based on their country area:",
        <ul key="rights-list" className="ms-4">
          <li>Access to your data</li>
          <li>Correction of inaccuracies</li>
          <li>Deletion of your data</li>
          <li>Opting out of marketing communications</li>
          <li>Withdrawing consent to process your data</li>
        </ul>
      ],
    },
    {
      title: "8. Children's Privacy",
      content: [
        "AR Code Magic does not knowingly collect information from children under 13 years of age. If we later obtain knowledge that such information has been collected about a child under 13, we will delete that information right away."
      ],
    },
    {
      title: "9. International Data Transfers",
      content: [
        "If you access AR Code Magic from outside, your data might be transferred to and processed in countries with different privacy laws. You agree to our privacy policy by using our services at AR Code Magic."
      ],
    },
    {
      title: "10. Modifications to This Privacy Policy",
      content: [
        "AR Code Magic has the right to update this privacy policy at any time without informing its users. Material changes will be posted on this Website and notified to users. As we change the privacy policy, it will become effective immediately and will be available on our website."
      ],
    }
  ];

  return (
    <div className="container my-5">
      <div className="panel panel-body panel-default bg-white rounded p-4 shadow-sm">
        <h2 className="mb-4 text-center fw-bold">Privacy Policy for AR Code</h2>
        <div className="row">
          <div className="col-12">
            {privacyPolicy.map((policy, index) => (
              <section key={index} className="mb-4 terms-section">
                <h4 className="fw-bold text-primary-color terms-heading">{policy.title}</h4>
                <div className="terms-content web-font-size">
                  {Array.isArray(policy.content)
                    ? policy.content.map((item, idx) => (
                        <React.Fragment key={idx}>{item}</React.Fragment>
                      ))
                    : policy.content}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
