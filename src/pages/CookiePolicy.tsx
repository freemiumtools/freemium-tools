import React from 'react';
import Layout from '../components/Layout';
import { Category } from '../types';

interface CookiePolicyProps {
  categories: Category[];
}

const CookiePolicy: React.FC<CookiePolicyProps> = ({ categories }) => {
  return (
    <Layout categories={categories}>
      <div className="max-w-full mx-auto py-8 px-6 sm:px-8 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Cookie Policy</h1>
          
          <div className="prose max-w-none text-gray-600">
            <p className="mb-4">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Introduction</h2>
            <p>
              FreemiumTools.com ("we," "our," or "us") uses cookies and similar technologies on our website. 
              This Cookie Policy explains what cookies are, how we use them, your choices regarding cookies, and further information about cookies.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">What Are Cookies?</h2>
            <p>
              Cookies are small text files that are stored on your computer or mobile device when you visit a website. 
              They are widely used to make websites work more efficiently and provide information to the website owners.
            </p>
            <p>
              Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device when you go offline, while session cookies are deleted as soon as you close your web browser.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">How We Use Cookies</h2>
            <p>We use different types of cookies for various reasons:</p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Essential cookies:</strong> These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.</li>
              <li><strong>Preference cookies:</strong> These cookies allow the website to remember choices you have made in the past, such as your preferred language or region.</li>
              <li><strong>Analytics cookies:</strong> These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.</li>
              <li><strong>Marketing cookies:</strong> These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user.</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Google AdSense and Cookies</h2>
            <p>
              We use Google AdSense to show advertisements on our website. Google AdSense may use cookies to personalize the advertisements and to show you relevant ads based on your visit to our website and other sites on the internet.
            </p>
            <p>
              Google AdSense uses the following cookies:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>_ga, _gid:</strong> Used by Google Analytics to distinguish users and track page views.</li>
              <li><strong>NID, CONSENT:</strong> Used by Google to remember your preferences and other information, such as your preferred language.</li>
              <li><strong>IDE, DSID:</strong> Used by Google DoubleClick for targeting and advertising.</li>
            </ul>
            <p>
              For more information about Google AdSense cookies, please visit <a href="https://policies.google.com/technologies/ads" className="text-blue-600 hover:underline">Google's Ads & Privacy policy</a>.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Your Choices Regarding Cookies</h2>
            <p>
              You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies. You do this through your browser settings. 
              Each browser is a little different, so look at your browser's Help menu to learn the correct way to modify your cookies.
            </p>
            <p>
              If you turn cookies off, some features that make your site experience more efficient may not function properly.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Browser Cookie Settings</h2>
            <p>Here's how you can manage cookies in the major web browsers:</p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
              <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
              <li><strong>Edge:</strong> Settings → Site permissions → Cookies and site data</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Third-Party Cookies</h2>
            <p>
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the website, deliver advertisements on and through the website, and so on.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">More Information About Cookies</h2>
            <p>
              If you'd like more information about cookies, including how to see what cookies have been set and how to manage and delete them, visit <a href="https://www.allaboutcookies.org" className="text-blue-600 hover:underline">allaboutcookies.org</a>.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Changes to Our Cookie Policy</h2>
            <p>
              We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last updated" date at the top of this page.
            </p>
            <p>
              You are advised to review this Cookie Policy periodically for any changes. Changes to this Cookie Policy are effective when they are posted on this page.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Contact Us</h2>
            <p>
              If you have any questions about our Cookie Policy, please contact us at:
              <br />
              <a href="mailto:privacy@freemiumtools.com" className="text-blue-600 hover:underline">privacy@freemiumtools.com</a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CookiePolicy; 