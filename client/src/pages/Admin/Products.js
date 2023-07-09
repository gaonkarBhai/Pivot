import React, { useEffect, useState } from "react";
import AdminMenu from "./../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
const Products = () => {
  const [products, setProduct] = useState([]);
  const getAllProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      // console.log(data.products);
      setProduct(data.products);
    } catch (error) {
      toast.error("Error while fetching products");
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProduct();
  }, []);
  return (
    <Layout title="Products | Admin panel">
      <div className="row container">
        <div className="col-md-3 mt-4 ms-3">
          <AdminMenu />
        </div>
        <div className="col-md-8 mt-3">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex gap-2">
            {products?.map((product) => (
              <div
                className="card"
                style={{ width: "18rem" }}
                key={product._id}
              >
                <img
                  className="card-img-top"
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                  alt={product.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <Link
                    to={`/dashboard/admin/product/${product.slug}`}
                    class="btn btn-primary"
                  >
                    Go somewhere
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
