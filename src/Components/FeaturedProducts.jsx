import { useEffect, useState } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import UseProductStore from "../Store/UseProductStore.js";
import useCartStore from "../Store/UseCartStore.js";
import { useShallow } from "zustand/react/shallow";

const FeaturedProducts = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(4);

	const { addToCart } = useCartStore();

	const {
		products: featuredProducts,
		fetchFeatutedProducts,
		loading,
	} = UseProductStore(
		useShallow((state) => ({
			products: state.products,
			fetchFeatutedProducts: state.fetchFeatutedProducts,
			loading: state.loading,
		}))
	);

	useEffect(() => {
		fetchFeatutedProducts();
	}, [fetchFeatutedProducts]);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 640) setItemsPerPage(1);
			else if (window.innerWidth < 1024) setItemsPerPage(2);
			else if (window.innerWidth < 1280) setItemsPerPage(3);
			else setItemsPerPage(4);
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
	};

	const prevSlide = () => {
		setCurrentIndex((prevIndex) => prevIndex - itemsPerPage);
	};

	const isStartDisabled = currentIndex === 0;
	const isEndDisabled = currentIndex >= featuredProducts.length - itemsPerPage;

	return (
		<div className='py-12 bg-white text-black'>
			<div className='container mx-auto px-4'>
				<h2 className='text-center text-3xl sm:text-4xl font-semibold text-black mb-6'>
					Featured Products
				</h2>

				{loading ? (
					<p className='text-center text-gray-400'>Loading...</p>
				) : (
					<div className='relative'>
						<div className='overflow-hidden'>
							<div
								className='flex transition-transform duration-500 ease-in-out'
								style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
							>
								{featuredProducts.map((product) => (
									<div
										key={product._id}
										className='w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-2'
									>
										<div className='bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300'>
											<div className='overflow-hidden'>
												<img
													src={product.image}
													alt={product.name}
													className='w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-105'
												/>
											</div>
											<div className='p-4'>
												<h3 className='text-base font-medium mb-2 text-gray-900'>
													{product.name}
												</h3>
												<p className='text-gray-700 font-semibold mb-4'>
													${parseFloat(product.price).toFixed(2)}
												</p>
												<button
													onClick={() => addToCart(product)}
													className='w-full bg-black text-white hover:bg-gray-900 font-medium py-2 px-4 rounded transition-colors duration-300 flex items-center justify-center'
												>
													<ShoppingCart className='w-5 h-5 mr-2' />
													Add to Cart
												</button>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Navigation Buttons */}
						<button
							onClick={prevSlide}
							disabled={isStartDisabled}
							className={`absolute top-1/2 -left-4 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-300 z-10 ${
								isStartDisabled
									? "bg-gray-300 cursor-not-allowed"
									: "bg-black hover:bg-gray-800"
							}`}
						>
							<ChevronLeft className='w-6 h-6 text-white' />
						</button>

						<button
							onClick={nextSlide}
							disabled={isEndDisabled}
							className={`absolute top-1/2 -right-4 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-300 z-10 ${
								isEndDisabled
									? "bg-gray-300 cursor-not-allowed"
									: "bg-black hover:bg-gray-800"
							}`}
						>
							<ChevronRight className='w-6 h-6 text-white' />
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default FeaturedProducts;
