import React, { useEffect, useState }  from 'react';
import Layout from '../../Components/Layout/Layout';
import UserMenu from '../../Components/Layout/UserMenu';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import moment from "moment";
import { FaIndianRupeeSign } from 'react-icons/fa6';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const token = auth?.token;
      console.log("JWT Token:", token);
  
      const response = await axios.get("/api/v1/auth/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("API Response:", response);
      console.log("Orders data:", response.data);
  
      setOrders(response.data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      console.error("Error response:", error.response);
    }
  };
  useEffect(() => {
    if (auth?.token) {
      console.log("Auth token available, fetching orders");
      getOrders();
    } else {
      console.log("No auth token available");
    }
  }, [auth?.token]);
  return (
    <Layout title={'Your orders'}>
      <div className='container-fluid p-3 m-3'>
        <div className='row'>
          <div className='col-md-3'>
            <UserMenu/>
          </div>
          <div className='col-md-9'>
            <h1 className='text-center'>All orders</h1>
            {
              orders?.map((o, i) => {
                return(
                  <div key={i} className='border shadow'>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Status</th>
                          <th scope="col">Buyer</th>
                          <th scope="col">Date</th>
                          <th scope="col">Payment</th>
                          <th scope="col">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>
                          <td>{o?.status}</td>
                          <td>{o?.buyer?.name}</td>
                          <td>{moment(o?.createdAt).fromNow()}</td>
                          <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                          <td>{o?.products?.length}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className='container'>
                      {o?.products?.map((p, j) => (
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
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
