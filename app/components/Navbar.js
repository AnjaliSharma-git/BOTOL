export default function Navbar() {
  return (
    <header className="bg-white text-black flex justify-between items-center p-4 mx-10">
        <div className="text-4xl font-bold">BOTOL</div>
        <div className="flex items-center space-x-8 text-md">
            <nav className="space-x-8">
                <a href="#" className="hover:text-gray-700">Shop</a>
                <a href="#" className="hover:text-gray-700">Contact us</a>
                <a href="#" className="hover:text-gray-700">About</a>
                <a href="#" className="hover:text-gray-700">Journal</a>
                <a href="#" className="hover:text-gray-700">Custom</a>
            </nav>
            <a href="#" className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2 px-4 rounded-full">Inquiry Now</a>
        </div>
    </header>
  );
}
