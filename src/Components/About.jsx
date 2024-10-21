import React from 'react';

const AboutUs = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <header className="bg-blue-600 text-white p-6">
                <h1 className="text-3xl font-bold text-center">BidBazar</h1>
            </header>

            <main className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">About Us</h2>
                <p className="mb-4">
                    Welcome to BidBazar, your one-stop platform for online bidding and auctions. Our mission is to provide a seamless and engaging bidding experience for everyone.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-2">Our Vision</h3>
                <p className="mb-4">
                    We aim to create a community where buyers and sellers can interact safely and confidently, ensuring that every auction is a fair and enjoyable experience.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-2">Our Values</h3>
                <ul className="list-disc list-inside mb-4">
                    <li>Integrity</li>
                    <li>Transparency</li>
                    <li>Customer Satisfaction</li>
                    <li>Innovation</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-2">Join Us</h3>
                <p>
                    Whether you're a seasoned bidder or a first-time seller, BidBazar welcomes you to explore our platform and participate in our exciting auctions.
                </p>

                <div className="mt-8 text-center">
                    <a
                        href="/contact"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Contact Us
                    </a>
                </div>
            </main>

            <footer className="bg-blue-600 text-white p-4 text-center">
                <p>&copy; 2024 BidBazar. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default AboutUs;
