import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Checkbox } from "antd";

const HomePage = () => {

  const [products, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [checked, setChecked] = useState([]);

  const getAllProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      setProduct(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.status) setCategory(data.category);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFilter = (value,id) => {
    let all = [...checked]
    if(value)
    all.push(id)
    else{
      all = all.filter(c=>c!=id)
    }
    setChecked(all)
  };

  useEffect(() => {
    getAllCategory();
  }, []);
  useEffect(() => {
    getAllProduct();
  }, []);
  return (
    <Layout title="Pivote | Online Ecommerce website ">
      <div className="row">
        <div className="col-md-2">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {category?.map((c) => (
              <Checkbox key={c._id} onChange={e=>handleFilter(e.target.checked,c._id)}>
                {c.name}
              </Checkbox>
            ))}
          </div>
        </div>
        <div className="col-md-9">
        {JSON.stringify(checked,null,4)}
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
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
                  <button className="btn btn-primary ms-1">More Details</button>
                  <button className="btn btn-primary ms-1">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
