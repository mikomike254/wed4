import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing! We will send you exclusive updates soon.');
    setEmail('');
  };

  return (
    <section className="bg-gray-900 text-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Join the Eddjos Circle.</h2>
          <p className="text-lg text-gray-300">
            Be the first to access new drops, exclusive discounts, and style inspiration.
          </p>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 bg-white text-black rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-black font-medium hover:bg-gray-100 transition-colors rounded"
            >
              Subscribe
            </button>
          </form>
          <p className="text-sm text-gray-400">Receive 15% off your first order.</p>
        </div>
      </div>
    </section>
  );
}
