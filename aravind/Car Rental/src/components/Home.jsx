function Home(){
    return(
        <section className="home text-center mt-5">
            <h1 className="text-center text-6xl font-bold text-green-800 mb-5">Famous Models</h1>
            <section className="p-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {['Audi', 'BMW', 'Maruthi', 'Tata','Mahindra','Defender','Hyundai'].map((category, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                        <img src="/pages/vite.svg" alt="" />
                    <img className="mb-2 h-50 w-200" src="/public/images/models/spider.jpg"/>
                    <p className="text-sm text-black-600">{category}</p>
                    </div>
                ))}
                </div>
            </section>
            <button className="text-white bg-blue-500 p-3 rounded">Explore Cars</button>
            <h1 className="text-red-500 mt-5">No Cars Available</h1>
        </section>
    )
}

export default Home