import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
const CreateCategory = () => {
  return (
    <Layout title="Admin Create Category | Pivote">
      <div className="container m-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">CreateCategory</div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
