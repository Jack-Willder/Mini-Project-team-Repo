
function Contact(){
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md font-sans text-gray-800">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="mb-2">
            <strong>Email:</strong>{' '}
            <a href="jobzy.com" className="text-blue-600 hover:underline">
              support@jobzy.com
            </a>
          </p>
          <p className="mb-2">
            <strong>Phone:</strong>{' '}
            <a href="1234567890" className="text-blue-600 hover:underline">
              +91 1234567890
            </a>
          </p>
          <p className="mb-2">
            <strong>Address:</strong> 123 xyz St, def City, India
          </p>
        </div>

        <div>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-1 font-semibold">Name</label>
              <input id="name" name="name" type="text" required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 font-semibold">Email</label>
              <input id="email" name="email" type="email" required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="you@example.com"/>
            </div>
            <div>
              <label htmlFor="message" className="block mb-1 font-semibold">Message</label>
              <textarea id="message" name="message" required rows={5} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Write your message here..."/>
            </div>
            <button type="submit" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
