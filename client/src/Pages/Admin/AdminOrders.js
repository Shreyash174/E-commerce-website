import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminMenu from '../../Components/Layout/AdminMenu';
import Layout from "../../Components/Layout/Layout";
import moment from "moment";
import { useAuth } from '../../context/auth';
import { Select } from "antd";

const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const token = auth?.token;
      console.log("JWT Token:", token);

      const response = await axios.get("/api/v1/auth/all-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("API Response:", response);
      console.log("Orders data:", response.data); 

      setOrders(response.data);  
    } catch (error) {
      console.error("Error fetching orders:", error);
      console.error("Error response:", error.response);
      setOrders([]);  
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

  const handleChange = async (orderId, value) => {
    try {
      await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <Layout title={"All Orders Data"}>
      <div className='row'>
        <div className='col-md-3'>
          <AdminMenu />
        </div>
        <div className='col-md-9'>
          <h1 className='text-center'>All Orders</h1>
          {orders && orders.length > 0 ? (
            orders.map((o, i) => (
              <div key={o._id} className='border shadow mb-3'>
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
                      <td>
                        <Select
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o.status}
                        >
                          {status.map((s, index) => (
                            <Option key={index} value={s}>{s}</Option>
                          ))}
                        </Select>
                      </td>
                      <td>{o.buyer?.name || 'Unknown'}</td>
                      <td>{moment(o.createdAt).fromNow()}</td>
                      <td>{o.payment?.success ? "Success" : "Failed"}</td>
                      <td>{o.products?.length || 0}</td>
                    </tr>
                  </tbody>
                </table>
                <div className='container'>
                  {o.products?.map((p) => (
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
                                Price: {p.price}
                              </small>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>No orders found.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default AdminOrders;
