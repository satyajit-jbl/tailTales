import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactPage = () => {
    return (
        <div className="max-w-screen-xl mx-auto px-4 py-10">
            <h2 className="text-4xl font-bold text-center text-yellow-600 mb-6">Get in Touch</h2>
            <p className="text-center text-gray-600 mb-10">We'd love to hear from you! Reach out for any queries or assistance.</p>

            <div className="grid md:grid-cols-2 gap-10">
                {/* Contact Form */}
                <div className="bg-white shadow-md rounded-2xl p-6">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Send Us a Message</h3>
                    <form className="space-y-4">
                        <input type="text" placeholder="Your Name" className="w-full p-3 border rounded-lg" required />
                        <input type="email" placeholder="Your Email" className="w-full p-3 border rounded-lg" required />
                        <textarea placeholder="Your Message" rows="4" className="w-full p-3 border rounded-lg" required></textarea>
                        <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg w-full">Send Message</button>
                    </form>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col justify-center bg-yellow-50 p-6 rounded-2xl shadow-md">
                    <div className="flex items-center mb-4">
                        <FaMapMarkerAlt className="text-yellow-600 text-2xl mr-3" />
                        <p className="text-gray-700">123 TailTales St, Pet City, PC 12345</p>
                    </div>
                    <div className="flex items-center mb-4">
                        <FaPhoneAlt className="text-yellow-600 text-2xl mr-3" />
                        <p className="text-gray-700">+1 234 567 890</p>
                    </div>
                    <div className="flex items-center">
                        <FaEnvelope className="text-yellow-600 text-2xl mr-3" />
                        <p className="text-gray-700">contact@tailtales.com</p>
                    </div>
                </div>
            </div>

            {/* Google Map */}
            <div className="mt-10 rounded-lg overflow-hidden shadow-md">
                <iframe
                    title="Google Map"
                    className="w-full h-80"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509137!2d144.9537353153204!3d-37.81627997975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce6e0!2sMelbourne%2C%20Australia!5e0!3m2!1sen!2sus!4v1600732232321!5m2!1sen!2sus"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default ContactPage; 
