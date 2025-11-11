import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Contact Us', href: '/contact' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' }
  ];

  const socialLinks = [
    { name: 'Twitter', href: '#', icon: '🐦' },
    { name: 'Facebook', href: '#', icon: '📘' },
    { name: 'Instagram', href: '#', icon: '📷' }
  ];

  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🍳</span>
              </div>
              <span className="text-xl font-bold text-gray-900">ChefConnect</span>
            </div>
            <p className="text-gray-600 text-sm max-w-md">
              Your daily dose of deliciousness. Connect with chefs worldwide and discover amazing recipes.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={social.name}
                >
                  <span className="text-2xl">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Quick Links
            </h3>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Newsletter
            </h3>
            <p className="text-sm text-gray-600">
              Subscribe to our newsletter for the latest recipes.
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <Button size="sm">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            © {currentYear} ChefConnect. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;