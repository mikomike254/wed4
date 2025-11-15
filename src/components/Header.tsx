import { Search, Heart, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onCategoryChange: (category: string) => void;
  currentCategory: string;
  onSearch: (query: string) => void;
}

export default function Header({ onCategoryChange, currentCategory, onSearch }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'Home', value: 'all' },
    { name: 'Shop', value: 'all' },
    { name: 'Men', value: 'men' },
    { name: 'Women', value: 'women' },
    { name: 'Unisex', value: 'unisex' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    setIsSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex-1 flex justify-center md:justify-start">
            <h1
              onClick={() => onCategoryChange('all')}
              className="text-xl md:text-2xl font-bold tracking-tight cursor-pointer hover:opacity-70 transition-opacity"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              Eddjos Collections .ke
            </h1>
          </div>

          <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-8">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => onCategoryChange(cat.value)}
                className={`text-sm font-medium transition-colors ${
                  currentCategory === cat.value
                    ? 'text-black border-b-2 border-black'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-gray-50 rounded-full transition-colors"
            >
              <Search className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-2 hover:bg-gray-50 rounded-full transition-colors">
              <Heart className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                  onCategoryChange(cat.value);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  currentCategory === cat.value
                    ? 'bg-gray-50 font-medium'
                    : 'text-gray-600'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg z-50">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  autoFocus
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
