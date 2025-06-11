import React from 'react';
import { Mail, Phone, MapPin, Heart, Github, Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'Tentang Kami', href: '/about' },
      { name: 'Kontak', href: '/contact' },
      { name: 'Karir', href: '/careers' },
      { name: 'Kebijakan Privasi', href: '/privacy' },
    ],
    categories: [
      { name: 'Teknologi', href: '/?category=teknologi' },
      { name: 'Bisnis', href: '/?category=bisnis' },
      { name: 'Pendidikan', href: '/?category=pendidikan' },
      { name: 'Lifestyle', href: '/?category=lifestyle' },
    ],
    support: [
      { name: 'FAQ', href: '/faq' },
      { name: 'Bantuan', href: '/help' },
      { name: 'Hubungi Kami', href: '/contact' },
      { name: 'Sitemap', href: '/sitemap' },
    ],
  };

  const socialLinks = [
    // { name: 'Facebook', icon: facebook, href: 'https://facebook.com', color: 'hover:text-blue-600' },
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/latiffhalik_22/', color: 'hover:text-sky-500' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/latiffalikal/', color: 'hover:text-blue-700' },
    { name: 'GitHub', icon: Github, href: 'https://github.com/Latiffhl', color: 'hover:text-gray-800' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Publartz</h3>
              <p className="text-gray-300 mt-3 leading-relaxed">Platform blog terdepan yang menyajikan konten berkualitas tentang teknologi, bisnis, dan inovasi terkini.</p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-3 text-blue-400" />
                <span>latiffalikal@gmail.com</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="w-4 h-4 mr-3 text-blue-400" />
                <span>+62 851-8077-2795</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="w-4 h-4 mr-3 text-blue-400" />
                <span>Parung Panjang, Bogor, Indonesia</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Perusahaan</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Category Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Kategori</h4>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Dukungan</h4>
            <ul className="space-y-3 mb-6">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter Signup */}
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h5 className="font-semibold mb-2 text-white">Newsletter</h5>
              <p className="text-gray-300 text-sm mb-3">Dapatkan artikel terbaru langsung di email Anda</p>
              <div className="flex">
                <input type="email" placeholder="Email Anda" className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-l-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-400" />
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-colors rounded-r-md">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center text-gray-400">
              <span>&copy; {currentYear} Lartz</span>
              <Heart className="w-4 h-4 mx-1 text-red-500 animate-pulse" />
              <span>di Bogor</span>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 bg-gray-800 rounded-full text-gray-400 ${social.color} transition-all duration-200 hover:scale-110 hover:bg-gray-700`}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
