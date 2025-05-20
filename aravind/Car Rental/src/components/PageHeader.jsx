
function PageHeader() {
  return (
    <nav className="bg-green-900 text-gray-100 shadow-lg p-4 flex justify-between items-center">
      <h1 className="text-white-400 text-4xl cursor-pointer hover:text-yellow-500">Car Rental</h1>
      <ul className="flex gap-6 text-sm font-medium">
        <li className="hover:text-yellow-500 transition-colors duration-200 cursor-pointer">Home</li>
        <li className="hover:text-yellow-500 transition-colors duration-200 cursor-pointer">Cars</li>
        <li className="hover:text-yellow-500 transition-colors duration-200 cursor-pointer">About</li>
        <li className="hover:text-yellow-500 transition-colors duration-200 cursor-pointer">Contact</li>
      </ul>
    </nav>
  );
}

export default PageHeader;
