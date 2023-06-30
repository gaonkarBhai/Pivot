import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
const CreateProduct = () => {
  return (
    <Layout title="Admin Create Product | Pivote">
      <div className="container m-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">Create Product</div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
