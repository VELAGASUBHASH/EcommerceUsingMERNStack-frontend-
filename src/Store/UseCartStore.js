import { create } from "zustand";
import axios from "../Library/Axios";
import { toast } from "react-hot-toast";

const useCartStore = create((set, get) => ({
  cart: [],
  coupon: null,
  total: 0,
  subtotal: 0,
  isCouponApplied: false,

  getMyCoupon: async () => {
    try {
      const response = await axios.get("/coupons/");
      const coupon = response.data;

      if (coupon?.code && coupon?.discountPercentage) {
        set({ coupon });
      } else {
        set({ coupon: null });
      }
    } catch (error) {
      console.error("Error fetching coupon:", error);
    }
  },

  applyCoupon: async (code) => {
    try {
      const response = await axios.post("/coupons/Validate", { code });
      set({ coupon: response.data, isCouponApplied: true });
      get().calculateTotals();
      toast.success("Coupon applied successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to apply coupon");
    }
  },

  removeCoupon: () => {
    set({ coupon: null, isCouponApplied: false });
    get().calculateTotals();
    toast.success("Coupon removed");
  },

  getCartItems: async () => {
    try {
      const response = await axios.get("/cart");
      set({ cart: response.data });
      get().calculateTotals();
    } catch (error) {
      set({ cart: [] });
      toast.error(error.response?.data?.message || "An error occurred while fetching cart");
    }
  },

  clearCart: async () => {
    try {
      await axios.delete("/cart/clear"); // Optional: if your backend supports this
    } catch (error) {
      console.warn("Failed to clear backend cart:", error.response?.data?.message);
    }

    set({
      cart: [],
      coupon: null,
      total: 0,
      subtotal: 0,
      isCouponApplied: false,
    });
  },

  addToCart: async (product) => {
    try {
      await axios.post("/cart", { productId: product._id });

      set((state) => {
        const existing = state.cart.find((item) => item._id === product._id);
        let updatedCart;

        if (existing) {
          updatedCart = state.cart.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          updatedCart = [...state.cart, { ...product, quantity: 1 }];
        }

        return { cart: updatedCart };
      });

      get().calculateTotals();
      toast.success("Product added to cart");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to cart");
    }
  },

  removeFromCart: async (productId) => {
    try {
      await axios.delete("/cart", { data: { productId } });

      set((state) => ({
        cart: state.cart.filter((item) => item._id !== productId),
      }));

      get().calculateTotals();
    } catch (error) {
      toast.error("Error removing product from cart");
    }
  },

  updateQuantity: async (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }

    try {
      await axios.put(`/cart/${productId}`, { quantity });

      set((state) => ({
        cart: state.cart.map((item) =>
          item._id === productId ? { ...item, quantity } : item
        ),
      }));

      get().calculateTotals();
    } catch (error) {
      toast.error("Error updating quantity");
    }
  },

  calculateTotals: () => {
    const { cart, coupon } = get();

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let total = subtotal;

    if (coupon?.discountPercentage) {
      const discount = subtotal * (coupon.discountPercentage / 100);
      total -= discount;
    }

    set({
      subtotal: parseFloat(subtotal.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
    });
  },
}));

export default useCartStore;
