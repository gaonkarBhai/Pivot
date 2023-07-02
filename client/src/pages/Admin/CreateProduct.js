import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { toast } from "react-hot-toast";
const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");

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
