
function PageHeader() {
  return (
    <>
    <header className="bg-blue-600 text-white py-5">
        <h1 className="text-6xl cursor-pointer text-center font-bold">Jobzy</h1>
    </header>
    <nav className="text-blue-600 shadow-md p-4 flex justify-between items-center">
      <ul className="flex gap-6 text-sm font-medium">
        <li className="hover:text-green-500 transition-colors duration-200 cursor-pointer">Home</li>
        <li className="hover:text-green-500 transition-colors duration-200 cursor-pointer">Jobs</li>
        <li className="hover:text-green-500 transition-colors duration-200 cursor-pointer">Companies</li>
        <li className="hover:text-green-500 transition-colors duration-200 cursor-pointer">About</li>
        <li className="hover:text-green-500 transition-colors duration-200 cursor-pointer">Contact</li>
      </ul>
    </nav>
    </>
  );
}

export default PageHeader;
