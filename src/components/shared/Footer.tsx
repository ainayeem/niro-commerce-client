import Logo from "@/assets/svgs/Logo";
import { Facebook, Instagram, Mail, MapPin, Phone, X } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About Us" },
    { href: "/testimonial", label: "Testimonials" },
    { href: "/blogs", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  const socialLinks = [
    { href: "#", icon: Facebook, name: "Facebook" },
    { href: "#", icon: Instagram, name: "Instagram" },
    { href: "#", icon: X, name: "Twitter" },
  ];

  const contactInfo = [
    { icon: Mail, text: "support@nirocom.com" },
    { icon: Phone, text: "+1 (555) 123-4567" },
    { icon: MapPin, text: "123 Commerce St, Tech City" },
  ];

  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-3 mb-6">
              <Logo />
              <h1 className="text-2xl font-bold text-gray-900">Niro Com</h1>
            </div>
            <p className="text-gray-600 text-center md:text-left mb-8 max-w-xs leading-relaxed">
              Shop the best deals on electronics, fashion, home essentials, and more. Fast shipping & secure payments.
            </p>
            <div className="flex space-x-5">
              {socialLinks.map(({ href, icon: Icon, name }) => (
                <Link 
                  href={href} 
                  key={name} 
                  className="text-gray-500 hover:text-emerald-600 transition-colors duration-300 p-2 rounded-full hover:bg-gray-100"
                  aria-label={name}
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {navLinks.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-gray-600 hover:text-emerald-600 transition-colors duration-300 text-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Company</h3>
            <ul className="space-y-4">
              {navLinks.slice(4).map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-gray-600 hover:text-emerald-600 transition-colors duration-300 text-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Contact Us</h3>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start space-x-4">
                  <item.icon className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 text-base">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-200 my-10" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Niro Com. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/privacy" className="text-gray-500 hover:text-gray-700 text-sm transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-gray-700 text-sm transition-colors duration-300">
              Terms of Service
            </Link>
            <Link href="/refunds" className="text-gray-500 hover:text-gray-700 text-sm transition-colors duration-300">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
