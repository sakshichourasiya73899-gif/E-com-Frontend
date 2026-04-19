import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { addToCart } from "../../store/slices/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ProductSlider = ({ title, products }) => {
  const scrollRef = useRef(null);
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  }
  const dispatch = useDispatch();
  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
    toast.success("Item added to cart");
  }

  // ✅ Parse images if they come as a string from backend
  const getImages = (images) => {
    if (!images) return [];
    if (typeof images === "string") {
      try {
        return JSON.parse(images);
      } catch {
        return [];
      }
    }
    return images;
  }

  return <>
    <section className="py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-foreground">{title}</h2>
        <div className="flex space-x-2 ">
          <button onClick={() => scroll("left")} className="p-2 glass-card hover:glow-on-hover animate-smooth">
            <ChevronLeft className="w-5 h-5 text-primary" />
          </button>
          <button onClick={() => scroll("right")} className="p-2 glass-card hover:glow-on-hover animate-smooth">
            <ChevronRight className="w-5 h-5 text-primary" />
          </button>
        </div>
      </div>
      <div ref={scrollRef} className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4">
        {
          products.map((product) => {
            const images = getImages(product.images);
            return (
              <Link key={product.id} to={`/product/${product.id}`} className="flex-shrink-0 w-72 glass-card hover:glow-on-hover animate-smooth group">
                {/* Product Image */}
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={images.length > 0 ? images[0].url : "/placeholder.png"}
                    alt={product.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col space-y-2">
                    {
                      new Date() - new Date(product.created_at) < 30 * 24 * 60 * 60 * 1000 && (
                        <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-semibold">New</span>
                      )
                    }
                    {
                      product.ratings >= 4.5 && (
                        <span className="bg-gradient-to-r from-yellow-400 to-rose-500 text-primary-foreground px-2 py-1 rounded-full text-xs font-semibold">Top Rated</span>
                      )
                    }
                  </div>
                  {/* Quick Add to cart */}
                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    className="absolute bottom-3 right-3 glass-card hover:glow-on-hover animate-smooth opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="w-5 h-5 text-primary" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  {/* Product Title */}
                  <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">{product.name}</h3>

                  {/* Product Ratings */}
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center space-x-1">
                      {
                        [...Array(5)].map((_, i) => {
                          return <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.ratings) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                        })
                      }
                    </div>
                    <span className="text-sm text-muted-foreground">({product.review_count})</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-primary">
                      ${product.price}
                    </span>
                  </div>

                  {/* Product Availability */}
                  <div className="mt-2">
                    <span className={`text-xs px-2 py-1 rounded ${product.stock > 5 ? "bg-green-500/20 text-green-400" : product.stock > 0 ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400"}`}>
                      {
                        product.stock > 5 ? "In Stock" : product.stock > 0 ? "Limited Stock" : "Out of Stock"
                      }
                    </span>
                  </div>
                </div>
              </Link>
            )
          })
        }
      </div>
    </section>
  </>;
};

export default ProductSlider;