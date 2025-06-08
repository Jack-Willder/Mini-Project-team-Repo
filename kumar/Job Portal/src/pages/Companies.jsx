import React, { useState } from 'react';

function Companies() {
  const [selectedCompany, setSelectedCompany] = useState(null);

  const companies = [
    { name: 'Microsoft', description: 'Microsoft is a technology company known for Windows, Office, and Azure.' },
    { name: 'Apple', description: 'Apple designs consumer electronics like the iPhone, Mac, and services like iCloud.' },
    { name: 'Infosys', description: 'Infosys is a global IT consulting and services company based in India.' },
    { name: 'TCS', description: 'Tata Consultancy Services (TCS) provides IT services, consulting, and business solutions.' },
    { name: 'Zoho', description: 'Zoho provides a suite of online productivity tools and SaaS applications.' }
  ];

  return (
    <section className="p-10">
      <h3 className="text-2xl font-semibold mb-6 text-center">Explore Companies</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {companies.map((company, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <img src={`/img/company/${company.name.toLowerCase()}.jpg`} alt={company.name} className="border-2 mx-auto"/>
            <h4 className="text-sm text-blue-600 font-bold mt-2 mb-2 text-center">{company.name}</h4>
            <button className="bg-blue-600 px-4 py-2 text-white rounded mt-5" onClick={() => setSelectedCompany(company)}>About</button>
          </div>
        ))}
      </div>

      {/* Modal Page */}
      {selectedCompany && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <h3 className="text-xl font-bold mb-2">{selectedCompany.name}</h3>
            <p className="text-gray-700 mb-4">{selectedCompany.description}</p>
            <button className="absolute top-2 right-3 text-red-500 text-xl" onClick={() => setSelectedCompany(null)}>×</button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Companies;
