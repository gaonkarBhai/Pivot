import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [ID, setID] = useState("");
  const params = useParams();

  const getSingleCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setPhoto(data.product.photo);
      setCategory(data.product.category._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setID(data.product._id);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching!!");
    }
  };
  useEffect(() => {
    getSingleCategory();
  }, []);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.status) setCategories(data.category);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching!!");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        name,
        description,
        photo,
        category,
        price,
        quantity,
      };
      console.log(productData);

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${ID}`,
        productData
      );

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    const ans  = window.prompt("Are you sure ??")
    if(!ans) return 

    try {
        const { data } = await axios.delete(
          `${process.env.REACT_APP_API}/api/v1/product/delete-product/${ID}`
        );
        toast.success("successfully deleted")
        navigate("/dashboard/admin/product");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  return (
    <Layout title="Admin Create Product | Pivote">
      <div className="container m-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h4 className="text-center">Update Product</h4>
            <form className="m-1 w-75 container">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo?.name : "Upload photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => {
                      setPhoto(e.target.files[0]);
                    }}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${ID}`}
                      alt="product photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  className="form-control"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  value={description}
                  className="form-control"
                  placeholder="Description"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <input
                  type="text"
                  value={price}
                  className="form-control"
                  placeholder="Price"
                  onChange={(e) => setPrice(e.target.value)}
                />
                <input
                  type="text"
                  value={quantity}
                  className="form-control"
                  placeholder="quantity"
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <div className="mb-3">
                  <Select
                    bordered={false}
                    size="large"
                    className="form-control"
                    placeholder="shipping"
                    showSearch
                    onChange={(value) => setShipping(value)}
                    value={shipping ? "Yes" : "No"}
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                </div>
              </div>
              <div className="mb-3">
                <button
                  className="btn btn-success m-2"
                  type="submit"
                  onClick={handleUpdate}
                >
                  Update Product
                </button>
                <button className="btn btn-danger m-2" onClick={handleDelete}>
                  Delete Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
