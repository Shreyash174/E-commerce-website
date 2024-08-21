import React from 'react'
import Layout from "./../Components/Layout/Layout";
import { useSearch } from '../context/Search';
import { FaIndianRupeeSign } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/Cart';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
    const [values] = useSearch()
    const [cart,setCart] = useCart()
    const navigate = useNavigate()
  return (
    <Layout title = {'Search results'}>
        <div className='container'>
        <div className='text-center'>
          <h1>Search results</h1>
          <h6>{values?.results.length <1
           ? 'No product Found' 
           : `Found ${values?.results.length}`}
          </h6>
          <div className="row">
          {values?.results.map((p) => (
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
        </div>
    </Layout>
  )
}

export default SearchPage