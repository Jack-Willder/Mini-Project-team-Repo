import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
                                                    {/* SEARCH BAR */}
      <section className=" p-10 text-center">
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

                                                    {/* CATEGORIES */}
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

                                                    {/* TOP COMPANIES */}
      <section className="companies mb-5 p-5">
        <h2 className="text-2xl font-semibold mb-6 text-center">Top Companies</h2>
        <marquee behavior="scroll" direction="left">
          <div class="company-logos">
            <img src="img/company/zoho.jpg" alt="Zoho" />
            <img src="img/company/apple.jpg" alt="Apple" />
            <img src="img/company/tcs.jpg" alt="TCS" />
            <img src="img/company/Microsoft.jpg" alt="Microsoft" />
            <img src="img/company/infosys.jpg" alt="Infosys" />
          </div>
        </marquee>
      </section>
                                                    {/* JOB POST */}
      <section className="bg-blue-600 text-white p-10 text-center">
      <h3 className="text-2xl font-semibold mb-2">Are you hiring?</h3>
      <p className="mb-4">Post a job and reach thousands of job seekers today.</p>
      <Link to="/PostingJobs">
        <button className="bg-white text-blue-600 font-semibold px-6 py-2 rounded hover:bg-gray-100">Post a Job</button>
      </Link>
    </section>
    </>
  );
}

export default Home;