import React from 'react';
import Layout from '../components/Layout';
import { Category } from '../types';

interface TermsOfServiceProps {
  categories: Category[];
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ categories }) => {
  return (
    <Layout categories={categories}>
      <div className="max-w-full mx-auto py-8 px-6 sm:px-8 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
          
          <div className="prose max-w-none text-gray-600">
            <p className="mb-4">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Introduction</h2>
            <p>
              Welcome to FreemiumTools.com. These Terms of Service ("Terms") govern your use of our website and services. 
              By accessing or using FreemiumTools.com, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our website.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Use of Services</h2>
            <p>
              FreemiumTools.com provides free and premium online tools for various purposes. You may use our services for personal or commercial use, subject to these Terms.
              We reserve the right to modify, suspend, or discontinue any part of our services without prior notice.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">User Accounts</h2>
            <p>
              Some features of our website may require you to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
              You agree to provide accurate and complete information when creating an account and to update your information to keep it accurate and current.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Content and Intellectual Property</h2>
            <p>
              All content on FreemiumTools.com, including text, graphics, logos, icons, images, audio, and software, is the property of FreemiumTools.com or its content suppliers and is protected by international copyright, trademark, and other intellectual property laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, display, perform, or use any of our content without our prior written permission, except as permitted by fair use or other copyright exceptions.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">User Conduct</h2>
            <p>When using our services, you agree not to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on the rights of others, including intellectual property rights</li>
              <li>Use our services for any illegal or unauthorized purpose</li>
              <li>Transmit any viruses, malware, or other harmful code</li>
              <li>Interfere with or disrupt our services or servers</li>
              <li>Attempt to gain unauthorized access to any part of our services</li>
              <li>Engage in automated use of our services that exceeds reasonable use by a human</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Third-Party Links and Services</h2>
            <p>
              Our website may contain links to third-party websites or services that are not owned or controlled by FreemiumTools.com. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Advertisements</h2>
            <p>
              FreemiumTools.com displays advertisements, including those served by Google AdSense and other advertising partners. By using our website, you agree to view these advertisements as part of the service we provide. 
              We strive to ensure that advertisements are relevant and non-intrusive, but we are not responsible for the content of these advertisements.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Disclaimer of Warranties</h2>
            <p>
              Our services are provided "as is" and "as available" without any warranties of any kind, either express or implied, including but not limited to, warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
            </p>
            <p>
              We do not warrant that our services will function uninterrupted, secure, or available at any particular time or location, or that any errors or defects will be corrected.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Limitation of Liability</h2>
            <p>
              In no event shall FreemiumTools.com, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Your access to or use of or inability to access or use our services</li>
              <li>Any conduct or content of any third party on our services</li>
              <li>Any content obtained from our services</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
            <p>
              By continuing to access or use our services after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use our services.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
              <br />
              <a href="mailto:terms@freemiumtools.com" className="text-blue-600 hover:underline">terms@freemiumtools.com</a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfService; 