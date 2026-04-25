import { useState, useEffect } from "react";
import { ArrowLeft, CreditCard, Shield, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Payment = () => {
  const { authUser } = useSelector((state) => state.auth)
  const { finalPrice } = useSelector((state) => state.order)
  const { cart } = useSelector((state) => state.cart)
  const navigateTo = useNavigate()

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!authUser) navigateTo("/products")
  }, [authUser])

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handlePayment = async () => {
    setLoading(true)

    const scriptLoaded = await loadRazorpayScript()
    if (!scriptLoaded) {
      alert("Failed to load Razorpay. Check your internet connection.")
      setLoading(false)
      return
    }

    try {
      // Step 1: Create Razorpay order from backend
      const { data } = await axios.post("/api/order/payment/create-order", {
        amount: finalPrice
      })

      // Step 2: Open Razorpay checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: "INR",
        name: "Flowmerce",
        description: "Order Payment",
        order_id: data.order.id,
        handler: async (response) => {
          try {
            // Step 3: Verify payment on backend
            const res = await axios.post("/api/order/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            })
            if (res.data.success) {
              setSuccess(true)
            }
          } catch (err) {
            alert("Payment verification failed. Contact support.")
          } finally {
            setLoading(false)
          }
        },
        prefill: {
          name: authUser.name,
          email: authUser.email,
        },
        theme: {
          color: "#6366f1",
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()

    } catch (err) {
      alert("Failed to initiate payment. Please try again.")
      setLoading(false)
    }
  }

  // ── Success Screen ─────────────────────────────
  if (success) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="glass-card p-10 text-center max-w-md w-full">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Payment Successful!</h2>
          <p className="text-muted-foreground mb-8">Your order has been placed and is being processed.</p>
          <Link
            to="/orders"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg gradient-primary text-primary-foreground font-semibold hover:glow-on-hover animate-smooth"
          >
            <span>View My Orders</span>
          </Link>
        </div>
      </div>
    )
  }

  // ── Payment Screen ─────────────────────────────
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8 max-w-2xl">

        <div className="mb-8 flex items-center space-x-4">
          <Link to="/checkout" className="p-2 glass-card hover:glow-on-hover animate-smooth">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Payment</h1>
            <p className="text-muted-foreground">Complete your purchase securely</p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="glass-card p-6 mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Order Summary</h3>
          <div className="space-y-3">
            {cart?.map((item) => (
              <div key={item.product.id} className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <img
                    src={item.product.images?.[0]?.url}
                    alt={item.product.name}
                    className="w-10 h-10 object-contain rounded-lg"
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground truncate max-w-[200px]">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-foreground">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="border-t border-border mt-4 pt-4 flex justify-between">
            <span className="font-semibold text-foreground">Total</span>
            <span className="text-xl font-bold text-primary">
              ${finalPrice ? finalPrice.toFixed(2) : "0.00"}
            </span>
          </div>
        </div>

        {/* Pay Button */}
        <div className="glass-card p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Shield className="w-5 h-5 text-green-400" />
            <p className="text-sm text-muted-foreground">Secured by Razorpay — 256-bit SSL encryption</p>
          </div>
          <button
            onClick={handlePayment}
            disabled={loading || !finalPrice}
            className="w-full flex items-center justify-center space-x-2 px-6 py-4 rounded-lg gradient-primary text-primary-foreground font-semibold hover:glow-on-hover animate-smooth disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CreditCard className="w-5 h-5" />
            <span>{loading ? "Opening Razorpay..." : `Pay $${finalPrice ? finalPrice.toFixed(2) : "0.00"}`}</span>
          </button>
          {!finalPrice && (
            <p className="text-center text-sm text-destructive mt-3">
              No order found. Please go back and place your order first.
            </p>
          )}
        </div>

      </div>
    </div>
  )
}

export default Payment;