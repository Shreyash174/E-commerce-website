import React from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminMenu from '../../Components/Layout/AdminMenu'

const User = () => {
  return (
    <Layout title = {'Dashboard - All user'}>
        <div className='container-fluid m-3 p-4'>
        <div className='row'>
            <div className='col-md-3'></div>
            <AdminMenu/>
            <div className='col-md-9'>
            <h1>User</h1>
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default User