import { useState, useEffect } from "react";
import { X, Mail, Lock, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { resetPassword, register, login, forgotPassword } from "../../store/slices/authSlice";
import { toggleAuthPopup } from "../../store/slices/popupSlice";

const LoginModal = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    authUser,
    isSigningUp,
    isLoggingIn,
    isRequestingForToken,
  } = useSelector((state) => state.auth);
  const { isAuthPopupOpen } = useSelector((state) => state.popup);

  const [mode, setMode] = useState("signin");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (location.pathname.startsWith("/password/reset")) {
      setMode("reset");
      dispatch(toggleAuthPopup());
    }
  }, [location.pathname, dispatch]);

  useEffect(() => {
    if (authUser) {
      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [authUser]);

  if (!isAuthPopupOpen || authUser) {
    return null;
  }

  const isLoading = isSigningUp || isLoggingIn || isRequestingForToken;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === "forgot") {
      dispatch(forgotPassword({ email: form.email })).then(() => {
        dispatch(toggleAuthPopup());
        setMode("signin");
      });
      return;
    }

    if (mode === "reset") {
      const token = location.pathname.split("/").pop();
      dispatch(resetPassword({ token, password: form.password, confirmPassword: form.confirmPassword }))
        .unwrap()
        .then(() => {
          dispatch(toggleAuthPopup()); // opens ProfilePanel after user is set
        })
        .catch(() => { });
      return;
    }

    const data = new FormData();
    data.append("email", form.email);
    data.append("password", form.password);

    if (mode === "signup") {
      data.append("name", form.name);
      dispatch(register(data));
      return;
    }

    // Default: signin
    dispatch(login(data));
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 backdrop-blur-md bg-[hsla(var(--glass-bg))]" />
        <div className="relative z-10 glass-panel w-full max-w-md mx-4 animate-fade-in-up">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-primary">
              {mode === "reset"
                ? "Reset Password"
                : mode === "signup"
                  ? "Create Account"
                  : mode === "forgot"
                    ? "Forgot Password"
                    : "Welcome Back"}
            </h2>
            <button
              onClick={() => dispatch(toggleAuthPopup())}
              className="p-2 rounded-lg glass-card hover:glow-on-hover animate-smooth"
            >
              <X className="w-5 h-5 text-primary" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name - signup only */}
            {mode === "signup" && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 bg-secondary border border-border rounded-lg focus:outline-none text-foreground placeholder:text-muted-foreground"
                />
              </div>
            )}

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full pl-12 pr-4 py-4 bg-secondary border border-border rounded-lg focus:outline-none text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Password - not on forgot */}
            {mode !== "forgot" && (
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                <input
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 bg-secondary border border-border rounded-lg focus:outline-none text-foreground placeholder:text-muted-foreground"
                />
              </div>
            )}

            {/* Confirm Password - signup and reset only */}
            {(mode === "signup" || mode === "reset") && (
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 bg-secondary border border-border rounded-lg focus:outline-none text-foreground placeholder:text-muted-foreground"
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 animate-smooth disabled:opacity-50"
            >
              {isLoading
                ? "Loading..."
                : mode === "reset"
                  ? "Reset Password"
                  : mode === "signup"
                    ? "Create Account"
                    : mode === "forgot"
                      ? "Send Reset Link"
                      : "Sign In"}
            </button>
          </form>

          {/* Footer Links */}
          {mode === "signin" && (
            <div className="mt-4 text-center space-y-2">
              <button
                onClick={() => setMode("forgot")}
                className="text-sm text-muted-foreground hover:text-primary animate-smooth block w-full"
              >
                Forgot password?
              </button>
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="text-primary hover:underline"
                >
                  Sign up
                </button>
              </p>
            </div>
          )}

          {(mode === "signup" || mode === "forgot") && (
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <button
                onClick={() => setMode("signin")}
                className="text-primary hover:underline"
              >
                Sign in
              </button>
            </p>
          )}

        </div>
      </div>
    </>
  );
};

export default LoginModal;