import React from 'react';
import Layout from '../components/Layout';
import { Category } from '../types';

interface PrivacyPolicyProps {
  categories: Category[];
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ categories }) => {
  return (
    <Layout categories={categories}>
      <div className="max-w-full mx-auto py-8 px-6 sm:px-8 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          
          <div className="prose max-w-none text-gray-600">
            <p className="mb-4">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Introduction</h2>
            <p>
              FreemiumTools.com ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Information We Collect</h2>
            <p>We collect information in the following ways:</p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Information you provide:</strong> When you use our contact forms or suggestion forms, we collect the information you provide, such as your name and email address.</li>
              <li><strong>Automatically collected information:</strong> When you visit our website, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.</li>
              <li><strong>Usage data:</strong> We may collect information about how you interact with our website, such as the pages you visit, the tools you use, and the actions you take.</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Use of Cookies and Similar Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track the activity on our service and store certain information. 
              Cookies are files with a small amount of data that may include an anonymous unique identifier.
            </p>
            <p>We use the following types of cookies:</p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Essential cookies:</strong> Necessary for the website to function properly.</li>
              <li><strong>Preference cookies:</strong> Allow the website to remember choices you have made in the past.</li>
              <li><strong>Analytics cookies:</strong> Help us understand how visitors interact with our website.</li>
              <li><strong>Marketing cookies:</strong> Used to track visitors across websites to display relevant advertisements.</li>
              <li><strong>Advertising cookies:</strong> Used to make advertising messages more relevant to you.</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Google AdSense</h2>
            <p>
              We use Google AdSense, an advertising service provided by Google, Inc., to display advertisements on our website. 
              Google AdSense uses cookies to serve ads based on your prior visits to our website or other websites.
            </p>
            <p>
              Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site and/or other sites on the Internet. 
              You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-blue-600 hover:underline">Google Ads Settings</a>.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide, maintain, and improve our website and services</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Monitor and analyze trends, usage, and activities in connection with our website</li>
              <li>Detect, prevent, and address technical issues</li>
              <li>Display personalized advertisements</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Sharing Your Information</h2>
            <p>We may share your information with the following third parties:</p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Service providers:</strong> Companies that perform services on our behalf, such as analytics and advertising.</li>
              <li><strong>Advertising partners:</strong> Third-party advertising companies that collect information about your activity on our website and other websites to provide you with targeted advertising.</li>
              <li><strong>Legal requirements:</strong> When required by law or in response to legal process.</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Your Privacy Rights</h2>
            <p>Depending on your location, you may have the following rights regarding your personal data:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>The right to access your personal data</li>
              <li>The right to rectify or update your personal data</li>
              <li>The right to erase your personal data</li>
              <li>The right to restrict processing of your personal data</li>
              <li>The right to data portability</li>
              <li>The right to object to processing of your personal data</li>
              <li>The right to withdraw consent</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Children's Privacy</h2>
            <p>
              Our website is not intended for children under 16 years of age. We do not knowingly collect personal information from children under 16. 
              If you are a parent or guardian and you believe your child has provided us with personal information, please contact us.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Contact Us</h2>
            <p>
              If you have any questions or concerns about our Privacy Policy, please contact us at:
              <br />
              <a href="mailto:privacy@freemiumtools.com" className="text-blue-600 hover:underline">privacy@freemiumtools.com</a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy; 