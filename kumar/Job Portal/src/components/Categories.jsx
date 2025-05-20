function Categories() {
  return (
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
  );
}

export default Categories;
