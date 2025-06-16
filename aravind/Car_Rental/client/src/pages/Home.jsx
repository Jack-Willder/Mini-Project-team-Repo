import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';

function Home() {

    return (
        <>
        <PageHeader />
        <section className="home text-center mt-5">
            <section className="banner"></section>
            <h1 className="text-center text-6xl text-green-800 mt-10 mb-5"><b>Find The Best</b> Car For You</h1>
            <p className="text-cyan-700 font-bold mt-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium exercitationem sunt dolores quo repellendus accusamus neque adipisci commodi. Quia ad rem omnis vero porro doloremque, similique dolore eius? Numquam a et voluptatum nesciunt adipisci, tenetur ducimus placeat officiis quo at. Qui illo omnis soluta. Quis dolores ad quia laborum! Labore!</p>
            <section className="p-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {['BMW', 'Audi', 'Maruthi', 'Nissan'].map((category, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                            <img className="mb-2 h-48 w-full object-cover rounded" src="/images/trending-car-img-3.jpg" alt="cars" />
                            <h4 className="text-lg font-medium mb-2">{category}</h4>
                        </div>
                    ))}
                </div>
            </section>

            <Link to="/cars">
                <button className="text-white bg-blue-500 p-3 rounded hover:bg-blue-600 transition mt-4">
                    Explore More
                </button>
            </Link>

            <section className="stats flex font-bold">
                <div className="stats1">
                    <h1 className="text-center text-4xl">0+</h1>
                    <p className="text-white">Years In Business</p>
                </div>
                <div className="stats2">
                    <h1 className="text-center text-4xl">10+</h1>
                    <p className="text-white">New Cars For Sale</p>
                </div>
                <div className="stats3">
                    <h1 className="text-center text-4xl">5+</h1>
                    <p className="text-white">Used Cars For Sale</p>
                </div>
                <div className="stats4">
                    <h1 className="text-center text-4xl">5+</h1>
                    <p className="text-white">Satisfied Customers</p>
                </div>
            </section>

            <section className="cutomers">
                <h1 className="text-6xl text-green-800 font-bold m-10">Our Customers</h1>
                <section className="p-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {['Praveen', 'Suriya', 'Vicky', 'Ananthan', 'Arshath'].map((category, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                                <img className="mb-2 h-48 w-full object-cover rounded" src="/images/testimonial-img-1.jpg" alt="cars" />
                                <h4 className="text-lg font-medium mb-2">{category}</h4>
                            </div>
                        ))}
                    </div>
                </section>
            </section>
        </section>
        <Footer/>
        </>
    );
}

export default Home;
