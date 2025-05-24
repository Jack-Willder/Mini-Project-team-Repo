function Products() {
    return (
        <section className="home text-center mt-5 bg-white">
            <h1 className="gallery"><span>OUR</span> GALLERY</h1>
            <section className="p-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {['Wooden Sofa Set', 'Queen Bed Frame', 'Dining Table 6-Seater', 'Coffee Table','Garden Chair Set'].map((category, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                        <img className="mb-2 h-48 w-full object-cover rounded" src="/productimages/p1.jpg" alt="icon" />
                        <h4 className="text-lg font-medium mb-2">{category}</h4>
                    </div>
                    ))}
                </div>            
            </section>
        </section>
    );
}

export default Products;
