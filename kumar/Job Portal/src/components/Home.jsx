function Home() {
  return (
    <>
      <section className="bg-blue-50 p-10 text-center">
        <h2 className="text-4xl font-bold mb-4">Find Your Dream Job</h2>
        <p className="text-lg text-gray-600 mb-6">
          Explore thousands of job listings and connect with top companies.
        </p>
        <div className="flex justify-center mb-8">
          <input type="text" placeholder="Search for jobs..." className="p-2 w-1/2 rounded-l-md border border-gray-300"/>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700">Search</button>
        </div>
        <p className="text-red-500">No jobs found matching your search.</p>
      </section>
      <section className="p-10">
          <h3 className="text-2xl font-semibold mb-6 text-center">Explore Categories</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {['Engineering', 'Design', 'Marketing', 'Customer Support'].map((category, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                <h4 className="text-lg font-medium mb-2">{category}</h4>
                <p className="text-sm text-gray-600">Find jobs in {category.toLowerCase()} roles.</p>
              </div>
            ))}
          </div>
      </section>
      <section className="companies mb-5 p-5">
        <h2 className="text-2xl font-semibold mb-6 text-center">Top Companies</h2>
        <marquee behavior="scroll" direction="left" scrollamount="6" onmouseover="this.stop();" onmouseout="this.start();">
          <div class="company-logos">
            <img src="img/company/zoho.jpg" alt="Zoho" />
            <img src="img/company/apple.jpg" alt="Apple" />
            <img src="img/company/tcs.jpg" alt="TCS" />
            <img src="img/company/Microsoft-Logo-HD.jpg" alt="Microsoft" />
            <img src="img/company/infosys.jpg" alt="Infosys" />
          </div>
        </marquee>
      </section>
    </>
  );
}

export default Home;