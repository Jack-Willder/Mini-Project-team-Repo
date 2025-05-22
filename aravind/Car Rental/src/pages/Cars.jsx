function Cars() {

    return (
        <section className="home text-center mt-5">
            
            <h1 className="text-center text-6xl font-bold text-green-800 mb-5">Available Cars</h1>
            
            <section className="p-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {['BMW', 'Audi', 'Maruthi', 'Nissan','Tesla'].map((category, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                        <img className="mb-2 h-48 w-full object-cover rounded" src="/images/models/BMW 1.jpg" alt="icon" />
                        <h4 className="text-lg font-medium mb-2">{category}</h4>
                    </div>
                    ))}
                </div>            
            </section>
        </section>
    );
}

export default Cars;