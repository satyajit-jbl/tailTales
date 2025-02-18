import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="max-w-screen-lg mx-auto px-4 py-10 text-gray-800">
            <h2 className="text-4xl font-bold text-center text-yellow-600 mb-6">Privacy Policy</h2>
            <p className="text-center text-gray-600 mb-10">Your privacy is important to us. Learn how we collect, use, and protect your data.</p>

            <div className="space-y-6 bg-white p-6 rounded-xl shadow-lg">
                <section>
                    <h3 className="text-2xl font-semibold text-gray-800">1. Information We Collect</h3>
                    <p className="text-gray-600 mt-2">We collect personal information such as name, email, and contact details when you use our services.</p>
                </section>

                <section>
                    <h3 className="text-2xl font-semibold text-gray-800">2. How We Use Your Information</h3>
                    <p className="text-gray-600 mt-2">Your data is used to provide and improve our services, process transactions, and communicate with you.</p>
                </section>

                <section>
                    <h3 className="text-2xl font-semibold text-gray-800">3. Data Security</h3>
                    <p className="text-gray-600 mt-2">We implement strict security measures to safeguard your data from unauthorized access and misuse.</p>
                </section>

                <section>
                    <h3 className="text-2xl font-semibold text-gray-800">4. Sharing Your Information</h3>
                    <p className="text-gray-600 mt-2">We do not sell or rent your personal information. Your data is shared only when necessary to provide our services.</p>
                </section>

                <section>
                    <h3 className="text-2xl font-semibold text-gray-800">5. Your Rights</h3>
                    <p className="text-gray-600 mt-2">You have the right to access, update, or delete your personal information at any time.</p>
                </section>

                <section>
                    <h3 className="text-2xl font-semibold text-gray-800">6. Changes to This Policy</h3>
                    <p className="text-gray-600 mt-2">We may update this Privacy Policy from time to time. Any changes will be posted on this page.</p>
                </section>
            </div>

            <p className="text-center text-gray-600 mt-10">If you have any questions, contact us at <span className="text-yellow-600 font-semibold">privacy@tailtales.com</span>.</p>
        </div>
    );
};

export default PrivacyPolicy; 
