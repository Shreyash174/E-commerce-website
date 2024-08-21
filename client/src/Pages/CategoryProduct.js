import React,{useEffect,useState} from 'react'
import Layout from '../Components/Layout/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
const CategoryProduct = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        if (params?.slug) getPrductsByCat();
      }, [params?.slug]);
      const getPrductsByCat = async () => {
        try {
          const { data } = await axios.get(
            `/api/v1/product/product-category/${params.slug}`
          );
          setProducts(data?.products);
          setCategory(data?.category);
        } catch (error) {
          console.log(error);
        }
      };
    
  return (
    <Layout>
        <div className='container mt-3'>
            <h1 className='text-center'>{category?.name}</h1>
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
                  <p className="card-text flex-grow-1"> {p.price}</p>
                  <button className="btn btn-primary mt-3" 
                  onClick={() =>navigate(`/product/${p.slug}`)}>View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      
        </div>

    
    </Layout>
  )
}

export default CategoryProduct
