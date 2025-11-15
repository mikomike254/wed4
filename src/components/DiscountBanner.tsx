import { Zap } from 'lucide-react';

export default function DiscountBanner() {
  return (
    <div className="bg-gradient-to-r from-red-600 to-red-500 text-white py-4 sticky top-16 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3 animate-pulse">
          <Zap className="w-6 h-6" />
          <h2 className="text-2xl font-bold" style={{ fontFamily: '"Glowen", sans-serif' }}>
            50% DISCOUNT ON ALL ITEMS
          </h2>
          <Zap className="w-6 h-6" />
        </div>
        <p className="text-center text-sm mt-2 opacity-90">
          Limited time offer - Shop now and save big!
        </p>
      </div>
    </div>
  );
}
