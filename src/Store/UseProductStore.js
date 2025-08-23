import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../Library/Axios.js";


const UseProductStore = create((set)=>({
    products:[],
    loading:false,
    setProduct:(products)=>set({products}),
    
    createProduct: async(productData)=>{
        set({loading:true});
        try {
            const res = await axios.post("/products",productData);
            set((Prevstate)=>({
                products:[...Prevstate.products,res.data],
                loading:false,
            }));
        } catch (error) {
            toast.error(error.response.data.error);
			set({ loading: false });
        }
    },
    fetchProductByCategory: async(category)=>{
        set({loading:true});
        try {
            const res = await axios.get(`/products/category/${category}`);
            set({products: res.data.products,loading:false});
        } catch (error) {
            set({error:"Failed to Fetch",loading:false});
            toast.error(error.res.data.error|| "Failed To Fetch Product");
            
        }
    },
    fetchAllProducts: async()=>{
        set({loading:true});
        try {
            const res = await axios.get("/products");
            set({products: res.data.products,loading:false});
        } catch (error) {
            set({error:"Failed to Fetch",loading:false});
            toast.error(error.res.data.error|| "Failed To Fetch Product");
            
        }
    },
    deleteProduct: async(productId)=>{
        set({loading:true});
        try {
            const res = await axios.delete(`/products/${productId}`);
            set((PrevProducts)=>({
                products:PrevProducts.products.filter((product)=>
                    product._id !== productId),
                loading:false,
            }));
        } catch (error) {
            set({loading:false});
            toast.error(error.res.data.error|| "Failed to Delete Product");
        }
    },
    toggleFeaturedProduct: async(productId)=>{
        set({loading:true});
        try {
            const res = await axios.patch(`/products/${productId}`);
            set((PrevProducts)=>({
                products:PrevProducts.products.map((product)=>
                    product._id === productId?{...product , isFeatured: res.data.isFeatured}:product
                ),
                loading:false,
            }));
        } catch (error) {
            set({loading:false});
            toast.error(error.res.data.error|| "Failed to Featured Product");
        }
    },
    fetchFeatutedProducts: async()=>{
        set({loading:true});
        try {
            const res = await axios.get("/products/featured");
            set({products:res.data,loading:false});
        } catch (error) {
            set({error:"Failed To fetch Featured Products",loading:false});
            console.log("Error in Fetching Featured Products",error);
        }   
    }
}));

export default UseProductStore;