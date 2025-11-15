import { MessageCircle } from 'lucide-react';
import { getWhatsAppFloatingLink } from '../lib/whatsapp';

export default function WhatsAppCTA() {
  return (
    <section className="bg-black text-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <MessageCircle className="w-16 h-16 mx-auto" />
        <h2 className="text-4xl md:text-5xl font-bold">Order Instantly on WhatsApp.</h2>
        <p className="text-xl text-gray-300">
          Chat with us directly for personalized service, instant order updates, and quick delivery.
        </p>
        <a
          href={getWhatsAppFloatingLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-4 bg-green-500 text-white font-medium hover:bg-green-600 transition-colors rounded-lg text-lg"
        >
          Message Us Now
        </a>
      </div>
    </section>
  );
}
