import React, { useEffect, useState } from 'react';
import Layout from '../Components/Layout/Layout';
import { useCart } from '../context/Cart';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import { FaIndianRupeeSign } from "react-icons/fa6";
import axios from 'axios';
import toast from 'react-hot-toast';


const BraintreeDropIn = React.forwardRef((props, ref) => {
  const DropIn = require('braintree-web-drop-in-react').default;
  return (
    <div ref={ref}>
      <DropIn {...props} />
    </div>
  );
});


const suppressFindDOMNodeWarning = () => {
  const originalError = console.error;
  console.error = (...args) => {
    if (/Warning.*findDOMNode/.test(args[0])) return;
    originalError.call(console, ...args);
  };
  return () => (console.error = originalError);
};

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(suppressFindDOMNodeWarning, []);

  useEffect(() => {
    if (auth?.token) getToken();
  }, [auth?.token]);

  // Delete item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex(item => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem('cart', JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log("Error fetching token:", error);
    }
  };

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      console.log("Payment nonce generated:", nonce);
  
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      }, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      console.log("Payment response:", data);
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.error("Payment error:", error.response?.data || error.message);
      setLoading(false);
      toast.error(error.response?.data?.error || error.response?.data?.details || "Payment failed. Please try again.");
    }
  };
  

  return (
    <Layout>
      <div className='container my-5'>
        <div className='row'>
          <div className='col-md-12'>
            <h2 className='text-center bg-light p-2 mb-4'>
              {auth?.token ? `Hello, ${auth.user?.name}!` : 'Welcome to Your Cart'}
            </h2>
            <h4 className='text-center mb-4'>
              {cart?.length > 0
                ? `You have ${cart.length} item${cart.length > 1 ? 's' : ''} in your cart${auth?.token ? '.' : '. Please login to checkout.'}`
                : "Your cart is empty."}
            </h4>
          </div>
        </div>
        {cart?.length > 0 && (
          <div className='row'>
            <div className='col-md-8'>
              {cart?.map((p) => (
                <div key={p._id} className='card mb-3'>
                  <div className='row g-0'>
                    <div className='col-md-4'>
                      <img
                        src={`/api/v1/product/product-image/${p._id}`}
                        className="img-fluid rounded-start"
                        alt={p.name}
                      />
                    </div>
                    <div className='col-md-8'>
                      <div className='card-body'>
                        <h5 className='card-title'>{p.name}</h5>
                        <p className='card-text'>{p.description.substring(0, 30)}</p>
                        <p className='card-text'>
                          <small className='text-muted'>
                            Price: <FaIndianRupeeSign />{p.price}
                          </small>
                        </p>
                        <button className='btn btn-danger btn-sm' onClick={() => removeCartItem(p._id)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='col-md-4'>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title'>Order Summary</h5>
                  <p className='card-text'>Total Items: {cart.length}</p>
                  <p className='card-text'>Total Price: <FaIndianRupeeSign />{cart.reduce((total, item) => total + item.price, 0).toFixed(2)}</p>
                </div>
                <div className='md-2'>
                  {!clientToken || !auth?.token || !cart?.length ? (
                    ""
                  ) : (
                    <>
                      <BraintreeDropIn
                        options={{
                          authorization: clientToken,
                        
                        }}
                        onInstance={(instance) => setInstance(instance)}
                      />
                      <button
                        className='btn btn-primary'
                        onClick={handlePayment}
                        disabled={loading || !instance || !auth?.user?.address}
                      >
                        {loading ? "Processing ...." : "Make Payment"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
