import React from "react";

function ContactForm() {
  return (
    <>
      <div className="max-w-3xl p-8 mx-auto bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-blue-600">
          Send Us a Message
        </h2>
        <form className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <input
            type="text"
            placeholder="Subject"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <textarea
            placeholder="Your Message"
            rows="6"
            className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
          ></textarea>
          <button
            type="submit"
            className="w-full py-3 text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Send Message
          </button>
        </form>
      </div>
    </>
  );
}

export default ContactForm;
