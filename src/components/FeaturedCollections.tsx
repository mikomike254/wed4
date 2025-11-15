interface FeaturedCollectionsProps {
  onCollectionClick: (category: string) => void;
}

export default function FeaturedCollections({ onCollectionClick }: FeaturedCollectionsProps) {
  const collections = [
    {
      title: 'Men\'s Collection',
      subtitle: 'Polo, Blazers & Suits',
      category: 'men',
      image: 'https://images.pexels.com/photos/2897883/pexels-photo-2897883.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Women\'s Collection',
      subtitle: 'Dresses & Sweaters',
      category: 'women',
      image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Unisex Essentials',
      subtitle: 'For Everyone',
      category: 'unisex',
      image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-4xl font-bold text-center mb-12">Shop by Category</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {collections.map((collection, index) => (
          <div
            key={index}
            onClick={() => onCollectionClick(collection.category)}
            className="group relative h-[400px] overflow-hidden cursor-pointer rounded-2xl shadow-lg"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url(${collection.image})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-end text-white p-8">
              <h3 className="text-3xl font-bold mb-2 text-center">{collection.title}</h3>
              <p className="text-sm text-gray-200 mb-4">{collection.subtitle}</p>
              <button className="px-8 py-3 bg-white text-black font-medium hover:bg-gray-100 transition-colors rounded-lg">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
