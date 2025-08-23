import React from 'react';
import { ShoppingCartIcon, PlusIcon, MinusIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import UseUserStore from '../Store/UseUserStore.js';
import UseCartStore from '../Store/UseCartStore.js';

const ProductCard = ({ product }) => {
  const { user } = UseUserStore();
  const { cart, addToCart, removeFromCart, updateQuantity } = UseCartStore();

  const cartItem = cart.find(item => item._id === product._id);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please Login To Add To Cart", { id: "login" });
    } else {
      addToCart(product);
    }
  };

  const handleIncrement = () => {
    updateQuantity(product._id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity === 1) {
      removeFromCart(product._id);
    } else {
      updateQuantity(product._id, quantity - 1);
    }
  };

  return (
    <div className="group flex flex-col w-full bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <div className="relative w-full h-72 bg-gray-100 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="object-contain h-full w-full transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col justify-between px-6 py-5 gap-2">
        <h3 className="text-xl font-semibold text-gray-900 tracking-tight leading-tight">
          {product.name}
        </h3>

        <div className="text-gray-600 text-sm">{product.description?.slice(0, 50)}...</div>

        <div className="flex items-center justify-between mt-2">
          <span className="text-2xl font-semibold text-black">₹{product.price}</span>
        </div>

        {quantity === 0 ? (
          <button
            className="mt-4 flex items-center justify-center gap-2 w-full py-3 text-sm font-medium text-white bg-black rounded-xl hover:bg-gray-900 transition-all duration-300"
            onClick={handleAddToCart}
          >
            <ShoppingCartIcon size={18} />
            Add to Bag
          </button>
        ) : (
          <div className="mt-4 flex items-center justify-between w-full bg-gray-200 rounded-xl px-4 py-2">
            <button
              onClick={handleDecrement}
              className="p-1.5 bg-white rounded-full hover:bg-gray-100 transition"
            >
              <MinusIcon size={16} />
            </button>
            <span className="text-lg font-medium text-gray-900">{quantity}</span>
            <button
              onClick={handleIncrement}
              className="p-1.5 bg-white rounded-full hover:bg-gray-100 transition"
            >
              <PlusIcon size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
