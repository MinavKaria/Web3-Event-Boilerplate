import React from 'react';

function Footer() {
  return (
    <footer className="bg-[#003366] text-white py-8 ">
      <div className="max-w-screen-lg mx-auto px-4 text-center">
        <div className="flex justify-center mb-4">
          <img 
            src="https://kjsce.acm.org/logo_withoutbg.png" // Replace with the actual KJSCE ACM logo URL
            alt="KJSCE ACM Logo"
            className="h-12 w-auto"
          />
        </div>
        <p className="text-lg font-semibold mb-4">KJSCE ACM</p>
        <p className="text-sm mb-4">© 2025 KJSCE ACM. All rights reserved.</p>
        <div className="flex justify-center gap-6 mb-4">
          <a href="https://twitter.com/KJSCEACM" className="text-blue-300 hover:text-blue-200 transition duration-300">Twitter</a>
          <a href="https://github.com/KJSCEACM" className="text-blue-300 hover:text-blue-200 transition duration-300">GitHub</a>
          <a href="https://linkedin.com/company/KJSCEACM" className="text-blue-300 hover:text-blue-200 transition duration-300">LinkedIn</a>
        </div>
        <p className="text-xs text-blue-200">Built with ❤️ by KJSCE ACM</p>
      </div>
    </footer>
  );
}

export default Footer;
