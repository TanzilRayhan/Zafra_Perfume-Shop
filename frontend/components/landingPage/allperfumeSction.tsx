import Perfumecard from "../ui/perfumecard";

const perfumes = [
  {
    id: 1,
    name: "Midnight Rose",
    brand: "Zafra Luxury",
    price: 129.99,
    size: "100ml",
    description: "A seductive blend of Bulgarian roses and dark vanilla",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=200&fit=crop",
    category: "Floral",
    rating: 4.8,
    inStock: true
  },
  {
    id: 2,
    name: "Ocean Breeze",
    brand: "Zafra Luxury",
    price: 89.99,
    size: "75ml",
    description: "Fresh aquatic notes with citrus and marine accords",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=200&fit=crop",
    category: "Fresh",
    rating: 4.6,
    inStock: true
  },
  {
    id: 3,
    name: "Velvet Amber",
    brand: "Zafra Luxury",
    price: 149.99,
    size: "100ml",
    description: "Warm amber with sandalwood and oriental spices",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=200&fit=crop",
    category: "Oriental",
    rating: 4.9,
    inStock: true
  },
  {
    id: 4,
    name: "Citrus Sunrise",
    brand: "Zafra Luxury",
    price: 79.99,
    size: "50ml",
    description: "Bright citrus notes with bergamot and lemon",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=200&fit=crop",
    category: "Citrus",
    rating: 4.5,
    inStock: true
  },
  {
    id: 5,
    name: "Mystic Lavender",
    brand: "Zafra Luxury",
    price: 109.99,
    size: "100ml",
    description: "Calming lavender with herbal and woody undertones",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=200&fit=crop",
    category: "Herbal",
    rating: 4.7,
    inStock: true
  },
  {
    id: 6,
    name: "Golden Musk",
    brand: "Zafra Luxury",
    price: 169.99,
    size: "100ml",
    description: "Luxurious musk with golden amber and vanilla",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=200&fit=crop",
    category: "Musk",
    rating: 4.8,
    inStock: true
  },
  {
    id: 7,
    name: "Forest Mist",
    brand: "Zafra Luxury",
    price: 119.99,
    size: "75ml",
    description: "Earthy forest notes with pine and moss",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=200&fit=crop",
    category: "Woody",
    rating: 4.4,
    inStock: true
  },
  {
    id: 8,
    name: "Silk Jasmine",
    brand: "Zafra Luxury",
    price: 139.99,
    size: "100ml",
    description: "Delicate jasmine with white flowers and silk",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=200&fit=crop",
    category: "Floral",
    rating: 4.6,
    inStock: true
  },
  {
    id: 9,
    name: "Spice Route",
    brand: "Zafra Luxury",
    price: 159.99,
    size: "100ml",
    description: "Exotic spices with cinnamon and cardamom",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=200&fit=crop",
    category: "Spicy",
    rating: 4.7,
    inStock: true
  },
  {
    id: 10,
    name: "Crystal Waters",
    brand: "Zafra Luxury",
    price: 99.99,
    size: "75ml",
    description: "Pure aquatic notes with mineral freshness",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=200&fit=crop",
    category: "Fresh",
    rating: 4.5,
    inStock: true
  }
];

export default function AllPerfumeSection() {
  return (
    <div className="flex flex-col items-center justify-center w-full py-16 px-32">
      <div className="w-full flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-4xl font-bold text-gray-800">Our Collection</h2>
          <p className="text-gray-600">Explore our wide range of luxury perfumes</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {perfumes.map((perfume) => (
            <Perfumecard 
              key={perfume.id}
              id={perfume.id}
              name={perfume.name}
              brand={perfume.brand}
              price={perfume.price}
              size={perfume.size}
              description={perfume.description}
              image={perfume.image}
              category={perfume.category}
              rating={perfume.rating}
              inStock={perfume.inStock}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
