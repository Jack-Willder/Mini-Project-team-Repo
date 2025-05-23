function About() {
  return (
    <section className="bg-white text-gray-800 py-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center"> About <span className="text-green-600">Furniture One</span></h1>

        <p className="text-lg mb-6 text-center">
          Welcome to <strong>Furniture One</strong> – your one-stop destination for premium-quality, stylish, and affordable furniture.
        </p>

        <p className="text-lg mb-10 text-center">
          Founded with a vision to bring comfort and elegance into every home, Furniture One is an online furniture store that blends craftsmanship with convenience. Our curated collection features everything from modern sofas and classic dining sets to smart storage solutions and bedroom essentials.
        </p>

        <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4"> What We Offer</h2>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li><strong>Wide Range of Products:</strong> Furniture for living rooms, bedrooms, offices, and more.</li>
            <li><strong>Quality & Durability:</strong> Handpicked materials and skilled craftsmanship.</li>
            <li><strong>Easy Online Shopping:</strong> Browse, choose, and buy with ease from any device.</li>
            <li><strong>Customer Satisfaction:</strong> Fast delivery, transparent support, and friendly service.</li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-green-100 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2"> Our Mission</h3>
            <p>
              To redefine how people shop for furniture by offering quality, style, and value — all from the comfort of home.
            </p>
          </div>

          <div className="bg-green-100 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2"> Our Vision</h3>
            <p>
              To become a trusted name in online furniture retail by continuously innovating and listening to our customers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
