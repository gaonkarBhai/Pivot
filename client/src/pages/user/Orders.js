import React from 'react'
import Layout from './../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
const Orders = () => {
  return (
    <Layout title="Orders | User Pivote">
      <div className="container m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h4>Your Orders</h4>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Orders