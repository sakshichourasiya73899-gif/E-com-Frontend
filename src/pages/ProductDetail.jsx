import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addToCart } from "../store/slices/cartSlice";
import { fetchProductDetails } from "../store/slices/productSlice";

import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Plus,
  Minus,
  Loader,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import ReviewsContainer from "../components/Products/ReviewsContainer";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product?.productDetails);
  const { loading, productReviews } = useSelector((state) => state.cart);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
  };

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  if (!product)
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Product Not Found</h1>
          <p className="text-muted-foreground">The product you are looking for doesn't exist.</p>
        </div>
      </div>
    );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>

            {/* Main Image */}
            <div
              className="relative rounded-2xl overflow-hidden mb-4"
              style={{
                aspectRatio: '4/3',
                background: '#111827',
                border: '1px solid rgba(201,169,110,0.25)',
                boxShadow: '0 0 40px rgba(201,169,110,0.15), 0 0 80px rgba(201,169,110,0.08), 0 24px 48px rgba(0,0,0,0.5)',
              }}
            >
              {product.images ? (
                <img
                  src={product?.images?.[selectedImage]?.url}
                  alt={product.name}
                  style={{ transition: 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)' }}
                  className="w-full h-full object-contain hover:scale-105 p-2"
                />
              ) : (
                <div className="w-full h-full animate-pulse bg-gray-800" />
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {product.images?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className="relative overflow-hidden rounded-xl flex-shrink-0 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    width: '76px',
                    height: '68px',
                    border: `2px solid ${selectedImage === index ? '#c9a96e' : 'rgba(201,169,110,0.15)'}`,
                    boxShadow: selectedImage === index ? '0 0 14px rgba(201,169,110,0.35)' : 'none',
                    background: '#111827',
                  }}
                >
                  <img
                    src={image?.url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

          </div>
          <div>
            <div className="mb-4">
              <div className="flex space-x-2 mb-4">
                {new Date() - new Date(product.created_at) < 30 * 24 * 60 * 60 * 1000 && (
                  <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-semibold">NEW</span>
                )}
                {product.ratings >= 4.5 && (
                  <span className="bg-gradient-to-r from-yellow-400 to-rose-500 text-white px-2 py-1 rounded text-xs font-semibold">TOP RATED</span>
                )}
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.ratings) ? "fill-current text-yellow-400" : "text-gray-300"}`} />
                ))}
              </div>
              <span className="text-foreground font-medium">{product.ratings}</span>
              <span className="text-muted-foreground">({productReviews?.length}) reviews</span>
            </div>
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-2xl font-bold text-primary">${product.price}</span>
            </div>
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-muted-foreground">Category : {product.category}</span>
              <span className={`px-3 py-1 rounded text-sm ${product.stock > 5 ? "bg-green-500/20 text-green-400" : product.stock > 0 ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400"

                }`}>{
                  product.stock > 5 ? "In Stock" : product.stock > 0 ? "Limited Stock" : "Out of Stock"
                }
              </span>

            </div>
            <div className="glass-card p-6 mb-6">
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-lg font-medium">Quantity:</span>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 glass-card hover:glow-on-hover animate-smooth"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-semibold text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 glass-card hover:glow-on-hover animate-smooth"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex items-center justify-center space-x-2 py-3 gradient-primary text-primary-foreground rounded-lg hover:glow-on-hover animate-smooth font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
                <button
                  disabled={product.stock === 0}
                  className="py-3 bg-secondary text-foreground border border-border rounded-lg hover:bg-accent animate-smooth font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Buy Now
                </button>
              </div>
              <div className="flex items-center space-x-4 mt-4">
                <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary animate-smooth">
                  <Heart className="w-5 h-5" />
                  <span>Add to Wishlist</span>
                </button>
                <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary animate-smooth">
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>


          </div>


        </div>
        <div className="glass-panel">
          <div className="flex border-b border-[hsla(--glass-border)]">
            {["description", "reviews"].map((tab) => {
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-medium capitalize transition-all ${activeTab === tab
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
          <div className="p-6 ">{
            activeTab === "description" && (
              <div>
                <h3 className="text-xl font-semibold text-froreground mb-4">
                  Prodcuct Description
                </h3>
                <p className="text-muted-foreground loading-relaxed">{product.description}</p>
              </div>
            )}
            {
              activeTab === "reviews" && (
                <>
                  <ReviewsContainer product={product} productReviews={productReviews} />
                </>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;