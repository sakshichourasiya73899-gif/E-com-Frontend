import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostReview, deleteReview } from "../../store/slices/productSlice";
import { Star } from "lucide-react";


const ReviewsContainer = ({ product, productReviews }) => {
  const { authUser } = useSelector((state) => state.auth);
  const { isReviewDeleting, isPostingReview } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("rating", rating);
    data.append("comment", comment);
    dispatch(postReview({ productId: product.id, review: data }));
  }
  return <>
    {
      authUser && (
        <form onSubmit={handleReviewSubmit} className="mb-8 space-y-4">
          <h4 className="text-lg font-semibold">Leave a Review</h4>
          <div className="flex items-center space-x-2">
            {
              [...Array(5)].map((_, i) => {
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setRating(i + 1)}
                    className="transition-all duration-150 hover:scale-110"
                  >
                    <Star className={`w-6 h-6 transition-colors duration-150 ${i < rating ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.8)]" : "fill-transparent text-gray-600 hover:text-yellow-400/40"}`} />
                  </button>
                )
              })
            }
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            placeholder="Write your review..."
            className="w-full p-3 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button type="submit" disabled={isPostingReview} className="px-8 py-2.5 rounded-lg font-semibold text-sm tracking-wider transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-to-r from-[#c9a96e] to-[#e8c98a] text-gray-900 hover:shadow-[0_0_20px_rgba(201,169,110,0.35)] hover:-translate-y-0.5 active:translate-y-0">
            {isPostingReview ? "Posting..." : "Post Review"}
          </button>
        </form>
      )
    }
    <h3 className="text-xl font-semibold text-foreground mb-6">Customer Reviews</h3>
    {
      productReviews && productReviews.length > 0 ? (
        <div className="space-y-6">
          {
            productReviews.map(review => {
              return (
                <div key={review.review_id} className="glass-card p-6">
                  <div className="flex items-center space-x-4">
                    <img src={review.reviewer?.avatar ? review.reviewer.avatar?.url : "/avatar-holder.avif"} alt={review.reviewer?.name} className="w-12 h-12 rounded-full object-cover" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-foreground">{review.reviewer?.name}</h4>
                        <div className="flex items-center space-x-2">
                          {
                            [...Array(5)].map((_, i) => {
                              return (
                                <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-current text-yellow-400" : "text-gray-300"}`} />
                              )
                            })
                          }
                        </div>
                      </div>
                      <p className="text-muted-foreground mt-2">{review.comment}</p>
                      {authUser?.id === review.reviewer?.id && (
                        <button onClick={() => dispatch(deleteReview(product.id, review.review_id))} disabled={isReviewDeleting} className=" m-6 w-fit flext items-center space-x-3 p-3 rounded-lg glass-card hover:glow-on-hover animate-smooth text-destructive hover:text-destructive-foreground group">
                          {isReviewDeleting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />{" "}
                              <span>Deleting...</span>


                            </>
                          ) : (<span>Delete Review</span>)

                          }
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      ) : (<p className="text-muted-foreground">No reviews yet.Be the first one to review this product.</p>)
    }
  </>;
};

export default ReviewsContainer;