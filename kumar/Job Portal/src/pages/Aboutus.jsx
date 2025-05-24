import React from 'react';

const About = () => {
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow-md font-sans text-gray-800">
      <h1 className="text-4xl font-bold mb-6">About Our Job Portal</h1>
      <p className="mb-4">
        Welcome to <span className="font-semibold">Jobzy</span>, your trusted platform for finding the perfect job and recruiting top talent.
      </p>
      <p className="mb-6">
        Our mission is to bridge the gap between job seekers and employers by providing an easy-to-use, reliable, and fast online job portal.
      </p>

      <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
      <ul className="list-disc list-inside mb-6 space-y-2">
        <li>Thousands of job listings across various industries.</li>
        <li>User-friendly job search with advanced filters.</li>
        <li>Easy application process with resume upload and tracking.</li>
        <li>Employer dashboard for posting jobs and managing applications.</li>
        <li>Career advice and resources to help you grow professionally.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
      <p>
        Have questions? Reach out at <span className="text-blue-500 cursor-pointer">support@jobzy.com</span>
      </p>
    </div>
  );
};

export default About;
