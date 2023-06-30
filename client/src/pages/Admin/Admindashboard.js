import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
const Admindashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid m-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 mt-4 mr-0">
            <div
              className="card text-white bg-primary mb-3"
              style={{ maxWidth: "29rem"}}
            >
              <h2 className="card-header">{auth?.user?.name}</h2>
              <div className="card-body">
                <h5 className="card-title">Email : {auth?.user?.email}</h5>
                <h5 className="card-title">Phone : {auth?.user?.phone}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Admindashboard;
