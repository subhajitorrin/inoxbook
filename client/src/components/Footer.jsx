import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-[1rem] select-none mt-[5rem]">
      <div className="container mx-auto pt-[2rem]">
        <div className="flex justify-between w-full">
          {/* Contact Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p className="text-sm">456 Cinema Avenue, Movie City</p>
            <p className="text-sm">Phone: (987) 654-3210</p>
            <p className="text-sm">
              Email:{" "}
              <a href="mailto:support@movietickets.com" className="underline">
                support@movietickets.com
              </a>
            </p>
          </div>

          <div className="flex gap-[5rem]">
            {/* Links Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="hover:text-gray-400">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/movies" className="hover:text-gray-400">
                    Movies
                  </a>
                </li>
                <li>
                  <a href="/booking" className="hover:text-gray-400">
                    Book Tickets
                  </a>
                </li>
                <li>
                  <a href="/faq" className="hover:text-gray-400">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-gray-400">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Popular Movies Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Popular Movies</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/movies/popular/movie1"
                    className="hover:text-gray-400"
                  >
                    Movie 1
                  </a>
                </li>
                <li>
                  <a
                    href="/movies/popular/movie2"
                    className="hover:text-gray-400"
                  >
                    Movie 2
                  </a>
                </li>
                <li>
                  <a
                    href="/movies/popular/movie3"
                    className="hover:text-gray-400"
                  >
                    Movie 3
                  </a>
                </li>
              </ul>
            </div>

            {/* New Releases Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">New Releases</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/movies/new-release/movie1"
                    className="hover:text-gray-400"
                  >
                    New Movie 1
                  </a>
                </li>
                <li>
                  <a
                    href="/movies/new-release/movie2"
                    className="hover:text-gray-400"
                  >
                    New Movie 2
                  </a>
                </li>
                <li>
                  <a
                    href="/movies/new-release/movie3"
                    className="hover:text-gray-400"
                  >
                    New Movie 3
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <ul className="flex space-x-4">
            <li>
              <a
                href="https://facebook.com/yourpage"
                className="hover:text-gray-400"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/yourprofile"
                className="hover:text-gray-400"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/yourprofile"
                className="hover:text-gray-400"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
        <p>&copy; 2024 Your Movie Ticket Booking. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
