import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CartItem from '../Components/CartItem.jsx';
import PeopleAlsoBougth from '../Components/PeopleAlsoBougth.jsx';
import UseCartStore from '../Store/UseCartStore.js'
import { ShoppingCartIcon } from 'lucide-react';
import OrderSummary from '../Components/OrderSummary.jsx';
import GiftCoupon from '../Components/GiftCoupon.jsx';

const Cart = () => {
  const { cart } = UseCartStore();

  return (
    <div className="py-16 bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mt-6 sm:mt-10 md:gap-6 lg:flex lg:items-start xl:gap-10">
          <motion.div
            className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {cart.length === 0 ? (
              <EmptyCartUI />
            ) : (
              <div className="space-y-6">
                {cart.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
              </div>
            )}

            {cart.length > 0 && <PeopleAlsoBougth />}
          </motion.div>
          {cart.length>0 && (
            <motion.div  className='mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full'
              initial={{opacity:0,x:20}}
              animate={{opacity:1,x:0}}
              transition={{duration:0.5,delay:0.4}}
            >
              <OrderSummary/>
              <GiftCoupon/>
            </motion.div>
          )} 
        </div>
      </div>
    </div>
  );
};

export default Cart;

const EmptyCartUI = () => (
  <motion.div
    className='flex flex-col items-center justify-center px-4 py-20 text-center'
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
  >
    <ShoppingCartIcon className='h-20 w-20 text-gray-300 mb-6' />
    
    <h3 className='text-3xl font-semibold tracking-tight text-gray-900'>
      Your cart is empty
    </h3>
    
    <p className='mt-3 max-w-md text-base text-gray-500'>
      Looks like you haven’t added anything yet. Let’s get you started.
    </p>
    
    <Link
      to='/'
      className='mt-6 inline-block rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white shadow-md transition-all duration-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2'
    >
      Start Shopping
    </Link>
  </motion.div>
);