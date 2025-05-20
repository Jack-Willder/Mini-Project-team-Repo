function Home(){
    return (
        <section className="bg-blue-50 p-10 text-center">
            <h2 className="text-4xl font-bold mb-4">Find Your Dream Job</h2>
            <p className="text-lg text-gray-600 mb-6">Explore thousands of job listings and connect with top companies.</p>
            <div className="flex justify-center mb-8">
                <input type="text" placeholder="Search for jobs..." className="p-2 w-1/2 rounded-l-md border border-gray-300"/>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700">Search</button>
            </div>
        </section>
    );
}
export default Home;