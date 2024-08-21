import React,{useState,useEffect} from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
const Spinner = ({path='login'}) => {
    const [count, setCount] = useState(4)
    const navigate = useNavigate()
    const location = useLocation

    useEffect(() => {
        const interval = setInterval(() => {
           setCount((prevValue) => --prevValue)
        },1000)
        count === 0 && navigate(`/${path}`,{
            state: location.pathname,
        });
        return () => clearInterval(interval)
    },[count,navigate,location,path])
  return (
    <>  
    <div>
  <button className="btn btn-primary" type="button" disabled>
    <span className="spinner-grow spinner-grow-sm" aria-hidden="true" />
    <span className="visually-hidden" role="status">Loading...</span>
  </button>
  <h1 className='text-center'>redirecting to you {count} </h1>
  <button className="btn btn-primary" type="button" disabled>
    <span className="spinner-grow spinner-grow-sm" aria-hidden="true" />
    <span role="status">Loading...</span>
  </button>
</div>
    </>
  )
}

export default Spinner