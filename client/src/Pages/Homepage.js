import React, { useState, useEffect } from 'react';
import Layout from '../Components/Layout/Layout';
import axios from 'axios';
import { FaShoppingCart } from 'react-icons/fa';
import { Checkbox } from 'antd';
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useCart } from '../context/Cart';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate ()
const [cart,setCart] = useCart()
  const [products, setProducts] = useState([]);
const [categories, setCategories] = useState([]);
 const [checked, setChecked] = useState([]);
const [total,setTotal] = useState(0)
const [page,setPage] = useState(1)
const [loading,setLoading] = useState(false)

  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/get-category');
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
   
  }, []);

  // Get all products
  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false)
      setProducts(data.products);
    } catch (error) {
      setLoading(false)
      console.error('Error fetching products:', error);
    }
  };

  //get total count 
const getTotal = async() =>{
  try {
    const { data } = await axios.get("/api/v1/product/product-count");
    setTotal(data?.category)
  } catch (error) {
    console.log(error);
  }
}
useEffect(() => {
  if (page === 1)return
  loadMore()
},[page])
//load more
const loadMore = async () => {
  try {
    setLoading(true);
    const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
    setLoading(false);
    setProducts([...products, ...data?.products]);
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};


  // filter by cat
  const handleFilter = (value,id) => {
    let all = [...checked]
    if (value) {
      all.push(id)
    } else {
      all = all.filter(c => c!== id)
    }
    setChecked(all)
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    filterproduct()
  }, [checked]);

  //get filter prod
 const filterproduct = async() =>{
  try {
    const {data} = await axios.post('/api/v1/product/product-filter',{checked})
    setProducts(data?.products)
  } catch (error) {
    console.log(error);
  }
 }
 
  return (
    <Layout title="All Products">
      <div className="container mt-3">
        <h4 className='text-center'>Filters</h4>
        {categories?.map(c =>(
          <Checkbox key = {c._id} onChange={(e) => handleFilter(e.target.checked,c._id)}>
           {c.name}
          </Checkbox>
        ))}
        <h1 className="text-center mb-4">All Products</h1>
        <div className="row">
          {products.map((p) => (
            <div key={p._id} className="col-md-4 mb-4">
              <div className="card h-100">
                <img
                  src={`/api/v1/product/product-image/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text flex-grow-1">{p.description.substring(0,30)}</p>
                  <p className="card-text flex-grow-1"><FaIndianRupeeSign /> {p.price}</p>
                  <button className="btn btn-primary mt-3" 
                  onClick={() =>navigate(`/product/${p.slug}`)}>View Details</button>
                  <button className="btn btn-secondary mt-3" onClick={()=>{
                    setCart([...cart,p])
                    localStorage.setItem('cart',JSON.stringify([...cart,p]))
                    toast.success('Iteam added to cart')
                    }}>
                      Add to cart  <FaShoppingCart/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      
        </div>
        <div className='m-2 p-3'>
        {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
                >
                  {loading ? 'loading...' : 'loading'}
                </button>
        )}
      </div>
    </Layout>
  );
};

export default Homepage;