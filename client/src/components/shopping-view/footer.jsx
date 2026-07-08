import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

function ShoppingFooter() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & About Us Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="VastraKart Logo" className="h-9 w-9 object-contain bg-white rounded-lg p-1" />
              <span className="text-xl font-extrabold text-white tracking-wider">VastraKart</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Your ultimate fashion destination. Explore curated collections crafted with premium quality, designed to elevate your personal style.
            </p>
            {/* Social Media Links */}
            <div className="flex gap-4 pt-2">
              <a href="#" className="h-9 w-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors duration-300">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Shop Links */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop/listing?category=men" className="text-sm text-slate-400 hover:text-white transition-colors duration-200">
                  Men's Fashion
                </Link>
              </li>
              <li>
                <Link to="/shop/listing?category=women" className="text-sm text-slate-400 hover:text-white transition-colors duration-200">
                  Women's Fashion
                </Link>
              </li>
              <li>
                <Link to="/shop/listing?category=kids" className="text-sm text-slate-400 hover:text-white transition-colors duration-200">
                  Kids Wear
                </Link>
              </li>
              <li>
                <Link to="/shop/listing?category=accessories" className="text-sm text-slate-400 hover:text-white transition-colors duration-200">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/shop/listing?category=footwear" className="text-sm text-slate-400 hover:text-white transition-colors duration-200">
                  Footwear
                </Link>
              </li>
            </ul>
          </div>

          {/* Information Links */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop/home" className="text-sm text-slate-400 hover:text-white transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/shop/account" className="text-sm text-slate-400 hover:text-white transition-colors duration-200">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/shop/checkout" className="text-sm text-slate-400 hover:text-white transition-colors duration-200">
                  Checkout
                </Link>
              </li>
              <li>
                <Link to="/shop/listing" className="text-sm text-slate-400 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/shop/listing" className="text-sm text-slate-400 hover:text-white transition-colors duration-200">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-400 leading-relaxed">
                  123 Fashion Street, Suit 456, New Delhi, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-rose-500 shrink-0" />
                <span className="text-sm text-slate-400">+91 82341 20200</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-rose-500 shrink-0" />
                <span className="text-sm text-slate-400">vijaypr82701@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} VastraKart. All rights reserved.
          </p>
          <div className="flex gap-4">
            <span className="text-xs text-slate-600">Secure Payments via Razorpay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default ShoppingFooter;
