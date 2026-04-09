import { Menu, User, ShoppingCart, Sun, Moon, Search } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleAuthPopup,
  toggleCart,
  toggleSearchBar,
  toggleSidebar,
} from "../../store/slices/popupSlice";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme(); // ✅ FIXED
  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.cart);

  const cartItemsCount = cart
    ? cart.reduce((total, item) => total + item.quantity, 0)
    : 0;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 overflow-visible bg-background/80 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20 relative px-2 sm:px-0">

          {/* LEFT */}
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-2 rounded-lg hover:bg-secondary transition"
          >
            <Menu className="w-6 h-6 text-foreground" />
          </button>

          {/* CENTER LOGO */}
          {/* CENTER LOGO */}
         <div className="absolute left-1/2 transform -translate-x-1/2 pointer-events-none">
  <h1 className=" sm:text-xl text-3xl md:text-4xl font-display font-bold tracking-wide text-foreground relative group cursor-pointer">

    {/* subtle glow */}
    <span className="absolute inset-0 bg-foreground blur-md opacity-10 group-hover:opacity-25 transition duration-500"></span>

    {/* main text */}
    <span className="relative">
      Flowmerce
    </span>

    {/* underline */}
    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-foreground group-hover:w-full transition-all duration-500"></span>

  </h1>
</div>
          {/* RIGHT SIDE */}
          <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3">

            {/* Theme */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-secondary transition"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-foreground" />
              ) : (
                <Moon className="w-5 h-5 text-foreground" />
              )}
            </button>

            {/* Search */}
            <button
              onClick={() => dispatch(toggleSearchBar())}
              className="p-2 rounded-lg hover:bg-secondary transition"
            >
              <Search className="w-5 h-5 text-foreground" />
            </button>

            {/* User */}
            <button
              onClick={() => dispatch(toggleAuthPopup())}
              className="p-2 rounded-lg hover:bg-secondary transition"
            >
              <User className="w-5 h-5 text-foreground" />
            </button>

            {/* Cart */}
            <button
              onClick={() => dispatch(toggleCart())}
              className="relative p-2 rounded-lg hover:bg-secondary transition"
            >
              <ShoppingCart className="w-5 h-5 text-foreground" />

              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;