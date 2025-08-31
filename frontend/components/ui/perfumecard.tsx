interface PerfumeCardProps {
  id: number;
  name: string;
  brand: string;
  price: number;
  size: string;
  description: string;
  image: string;
  category: string;
  rating: number;
  inStock: boolean;
}

export default function Perfumecard({
  id,
  name,
  brand,
  price,
  size,
  description,
  image,
  category,
  rating,
  inStock
}: PerfumeCardProps) {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md p-4 w-72 hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover rounded-md"
        />
        <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-semibold text-gray-700">
          {category}
        </div>
      </div>
      
      <div className="flex flex-col gap-2 mt-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600">{brand}</p>
        <p className="text-sm text-gray-500">{size}</p>
        <p className="text-xs text-gray-400 line-clamp-2">{description}</p>
        
        <div className="flex items-center gap-1 mt-1">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}>
                ★
              </span>
            ))}
          </div>
          <span className="text-xs text-gray-500">({rating})</span>
        </div>
        
        <div className="flex justify-between items-center mt-2">
          <p className="text-lg font-bold text-indigo-600">${price.toFixed(2)}</p>
          <button 
            className={`px-4 py-2 rounded-md text-sm transition-colors ${
              inStock 
                ? "bg-indigo-500 text-white hover:bg-indigo-600" 
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!inStock}
          >
            {inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
}