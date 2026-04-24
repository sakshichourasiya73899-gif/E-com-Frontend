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
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;