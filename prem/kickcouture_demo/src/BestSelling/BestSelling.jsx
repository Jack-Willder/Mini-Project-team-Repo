import React from 'react';
import h from '../assets/img2.jpeg'; // Example image


export const BestSelling = () => {
  return (
    <section id="Bestselling" className="py-16 md:py-24">
      <div className="shoe-container" >
        
        <div className=" mb-18 text-2xl">
          <h2 className="font-bold ">Best Selling</h2>
        </div>

       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-18" >
              <div className="bg-amber-300 rounded-xl  mb-10 px-4 pt-9 pb-6 mx-3 hover:shadow-xl transition">
                <img src={h} alt="product_img" 
                      className="w-full object-cover rounded-1g mb-4"              
                />
                <h3 className="font-semibold text-1g text-center">
                  Shoe 1
                </h3>           

                <div>
                    <span className="text-xl font-bold text-green-600 ">₹1600</span>
                    <span className="text-xl font-bold text-green-600">₹700</span>
                    <span className="text-sm text-green-500 font-semibold">60%</span>
                </div>
                <p className="text-sm mt-2 text-gray-700 text-center">Free Delivery</p>
                <button>Buy Now</button>
                <button>Add to Card</button>
              </div>
       </div>
      </div>
    </section>
  );
};
