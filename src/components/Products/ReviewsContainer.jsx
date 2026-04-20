import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Star } from "lucide-react";


const ReviewsContainer = ({ product, productReviews }) => {
  const { authUser } = useSelector((state) => state.auth);
  const { isReviewDeleting, isPostingReview } = useSelector((state) => state.review);
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
                    className={`w-10 h-10 text-2xl rounded-full flex items-center justify-center transition-colors ${i < rating ? "bg-yellow-500" : "bg-gray-300"}`}
                  >
                    <Star className={`w-5 h-5 ${i < rating ? "fill-current text-white" : "text-gray-500"}`} />
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
          <button type="submit" disabled={isPostingReview} className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50">
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