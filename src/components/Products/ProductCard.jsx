import React from "react";
import { Star, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ product, quantity: 1 }));
    toast.success("Item added to cart");
  }

  const images = Array.isArray(product.images)
    ? product.images
    : JSON.parse(product.images || "[]");

  return (
    <Link
      to={`/product/${product.id}`}
      className="glass-card hover:glow-on-hover animate-smooth group"
    >
      {/* Product Image */}
      <div className="relative overflow-hidden rounded-2xl mb-4">
        <img
          src={images.length > 0 ? images[0].url : "/placeholder.png"}
          alt={product.name}
          className="w-full h-72 rounded-2xl object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {new Date() - new Date(product.created_at) < 30 * 24 * 60 * 60 * 1000 && (
            <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-semibold">NEW</span>
          )}
          {product.ratings >= 4.5 && (
            <span className="bg-gradient-to-r from-yellow-400 to-rose-500 text-white px-2 py-1 rounded text-xs font-semibold">Top Rated</span>
          )}
        </div>
        {/* Quick Add to cart */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-3 right-3 glass-card hover:glow-on-hover animate-smooth opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 rounded-lg"
          disabled={product.stock === 0}
        >
          <ShoppingCart className="w-5 h-5 text-primary" />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-3">
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center space-x-2 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.ratings) ? "fill-current text-yellow-400" : "text-gray-300"}`} />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.review_count})</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">${product.price}</span>
        </div>
        <span className={`text-xs px-2 py-1 rounded ${product.stock > 5 ? "bg-green-500/20 text-green-400" : product.stock > 0 ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400"}`}>
          {product.stock > 5 ? "In Stock" : product.stock > 0 ? "Limited Stock" : "Out of Stock"}
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;