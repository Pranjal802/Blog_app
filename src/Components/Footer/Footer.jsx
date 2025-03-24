import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import Logo from "../Container/Logo";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 text-center">
      <div className="container mx-auto flex flex-col items-center">
        <img src="/logo.png" alt="Logo" className="w-16 h-16 mb-2" />
        <nav className="flex space-x-6">
          <Link to="/about" className="hover:text-gray-400">About</Link>
          <Link to="/services" className="hover:text-gray-400">Services</Link>
          <Link to="/contact" className="hover:text-gray-400">Contact</Link>
          <Link to="/blog" className="hover:text-gray-400">Blog</Link>
          <Link to="/careers" className="hover:text-gray-400">Careers</Link>
          <Link to="/faq" className="hover:text-gray-400">FAQ</Link>
        </nav>
        <div className="flex space-x-4 mt-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FaInstagram size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FaLinkedin size={24} />
          </a>
        </div>
        <p className="text-gray-500 mt-4">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        <p className="text-gray-500">Designed by PJ Solutions | Privacy Policy | Terms of Service</p>
      </div>
    </footer>
  );
};

export default Footer;
