import React from "react";
import { SlSocialInstagram } from "react-icons/sl";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { IoLogoLinkedin } from "react-icons/io5";
import { TiSocialTwitter } from "react-icons/ti";
function Footer() {
  return (
    <>
      <footer className="px-6 py-12 bg-gradient-to-r from-cyan-900 to-blue-900">
        <div className="flex flex-col gap-12 mx-auto max-w-7xl md:flex-row md:justify-between">
          {/* Newsletter Section */}
          <div className="flex-1">
            <h1 className="mb-6 font-serif text-2xl font-bold text-white">
              LuxeRentals
            </h1>
            <h2 className="mb-4 text-xl font-bold">
              Subscribe to our Newsletter
            </h2>
            <p className="mb-6 text-white">
              Get the latest updates, offers, and resources straight to your
              inbox.
            </p>
            <form className="flex items-center space-x-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 text-white rounded-md"
              />
              <button
                type="submit"
                className="px-6 py-2 text-gray-900 transition bg-yellow-500 rounded-md hover:bg-yellow-600"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Links Section */}
          <div className="grid flex-1 grid-cols-2 gap-6 md:gap-12">
            <div>
              <h3 className="mb-4 text-lg font-bold">Company</h3>
              <ul className="space-y-2 text-white">
                <li className="transition hover:text-white">About</li>
                <li className="transition hover:text-white">Explore</li>
                <li className="transition hover:text-white">Services</li>
                <li className="transition hover:text-white">Blog</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">Support</h3>
              <ul className="space-y-2 text-white">
                <li className="transition hover:text-white">FAQs</li>
                <li className="transition hover:text-white">Contact</li>
                <li className="transition hover:text-white">Live Chat</li>
                <li className="transition hover:text-white">Reviews</li>
              </ul>
            </div>
          </div>

          {/* Social Links Section */}
          <div className="flex-1">
            <h3 className="mb-4 text-lg font-bold">Follow Us</h3>
            <p className="mb-6 text-white">Stay connected on social media:</p>
            <div className="flex items-center space-x-6">
              <a
                href="#"
                className="flex items-center justify-center w-8 h-8 transition bg-white rounded-full "
              >
                <BiLogoFacebookCircle className="text-blue-800" />
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-8 h-8 transition bg-white rounded-full "
              >
                <TiSocialTwitter className="text-blue-800" />
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-8 h-8 transition bg-white rounded-full "
              >
                <IoLogoLinkedin className="text-blue-800" />
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-8 h-8 transition bg-white rounded-full "
              >
                <SlSocialInstagram className="text-red-800" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="pt-6 mt-12 text-center border-t border-gray-800">
          <p className="text-white">
            &copy; LuxeRental 2024 . All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
