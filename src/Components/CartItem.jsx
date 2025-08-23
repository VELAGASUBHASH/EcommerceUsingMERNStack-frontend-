import React from 'react';
import { Minus, Plus, Trash } from 'lucide-react';
import UseCartStore from '../Store/UseCartStore.js';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = UseCartStore();

  const handleIncrement = () => {
    updateQuantity(item._id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity === 1) {
      removeFromCart(item._id);
    } else {
      updateQuantity(item._id, item.quantity - 1);
    }
  };

  const itemTotal = item.price * item.quantity;

  return (
    <div className="flex items-center justify-between p-4 border rounded-xl shadow-sm">
      <div className="flex items-center gap-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 object-contain rounded-lg border"
        />
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-gray-900">{item.name}</span>
          <span className="text-gray-500 text-sm">Price: ₹{item.price.toFixed(2)}</span>
          <span className="text-gray-700 text-sm font-medium">
            Total: ₹{itemTotal.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleDecrement}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
        >
          <Minus size={16} />
        </button>

        <span className="text-md font-medium">{item.quantity}</span>

        <button
          onClick={handleIncrement}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
        >
          <Plus size={16} />
        </button>

        <button
          onClick={() => removeFromCart(item._id)}
          className="ml-4 p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition"
        >
          <Trash size={16} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
