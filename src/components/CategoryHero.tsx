interface CategoryHeroProps {
  category: 'men' | 'women' | 'unisex';
}

const categoryConfig = {
  men: {
    title: "Men's Clothing",
    image: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  women: {
    title: "Women's Clothing",
    image: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  unisex: {
    title: "Unisex Clothing",
    image: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=1920'
  }
};

export default function CategoryHero({ category }: CategoryHeroProps) {
  const config = categoryConfig[category];

  return (
    <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${config.image})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/50"></div>

      <div className="relative z-10 text-center">
        <h1 className="text-6xl md:text-7xl font-bold text-white drop-shadow-2xl tracking-tight">
          {config.title}
        </h1>
      </div>
    </section>
  );
}
