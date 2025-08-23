import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';
import useProductStore from '../Store/UseProductStore.js';
import toast from 'react-hot-toast';

const categories = ['jeans', 't-shirts', 'shoes', 'glasses', 'jackets', 'suits'];

const CreateProduct = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
  });

  const { createProduct, loading } = useProductStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(newProduct);
      toast.success('Product created successfully!');
      setNewProduct({ name: '', description: '', price: '', category: '', image: '' });
    } catch (error) {
      toast.error('Failed to create product. Please try again.');
      console.error('Error creating product:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      className="bg-white rounded-3xl p-10 mb-12 max-w-2xl mx-auto border border-neutral-200 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-4xl font-semibold mb-10 text-center text-neutral-900 tracking-tight">
        Add a New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Name */}
        <div>
          <label htmlFor="name" className="text-sm font-medium text-neutral-600 mb-1 block">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-neutral-300 bg-neutral-100 focus:outline-none focus:ring-[2px] focus:ring-neutral-800 transition-all"
            placeholder="e.g. Apple Vision Pro"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="text-sm font-medium text-neutral-600 mb-1 block">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-neutral-300 bg-neutral-100 focus:outline-none focus:ring-[2px] focus:ring-neutral-800 resize-none transition-all"
            placeholder="Short and impactful description..."
            required
          />
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="text-sm font-medium text-neutral-600 mb-1 block">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-neutral-300 bg-neutral-100 focus:outline-none focus:ring-[2px] focus:ring-neutral-800 transition-all"
            placeholder="e.g. 1499.99"
            step="0.01"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="text-sm font-medium text-neutral-600 mb-1 block">
            Category
          </label>
          <select
            id="category"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-neutral-300 bg-neutral-100 focus:outline-none focus:ring-[2px] focus:ring-neutral-800 transition-all"
            required
          >
            <option value="">Choose a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="text-sm font-medium text-neutral-600 mb-2 block">Product Image</label>
          <label className="flex items-center justify-center gap-2 px-4 py-4 border border-dashed border-neutral-300 rounded-xl cursor-pointer hover:bg-neutral-100 bg-neutral-50 text-neutral-600 text-sm transition-all duration-200">
            <Upload className="h-4 w-4" />
            <span>Click to upload image (JPG, PNG)</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </label>

          {newProduct.image && (
            <div className="mt-4">
              <img
                src={newProduct.image}
                alt="Preview"
                className="h-28 w-28 object-cover rounded-xl border border-neutral-200 shadow-md"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-full text-sm font-medium hover:bg-neutral-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Product'}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default CreateProduct;
