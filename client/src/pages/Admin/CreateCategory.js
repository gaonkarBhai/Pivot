import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { toast } from "react-hot-toast";
import CategoryForm from "./../../components/Form/CategoryForm";
import { Modal } from "antd";
const CreateCategory = () => {
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        { name }
      );
      if (data.status) {
        toast.success("Category created successfully!!");
        getAllCategory();
        setName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong !!");
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
      toast.error("Something went wrong while fetching!!");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        {
          name: updatedName,
        }
      );
      if (data.status) {
        toast.success("Category updated successfully!!");
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating!!");
    }
  };

  const handleDelete = async (pid) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${pid}`
      );
      if (data.status) {
        toast.success("Category Deleted successfully!!");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting!!");
    }
  };

  return (
    <Layout title="Admin Create Category | Pivote">
      <div className="container m-3">
        <div className="row">
          <div className="col-md-3 mt-5">
            <AdminMenu />
          </div>
          <div className="col-md-9 ">
            <div className="container d-flex justify-content-center align-items-center flex-column">
              <h4 className="text-center mt-2">Manage Category</h4>
              <div className="">
                <CategoryForm
                  handleSubmit={handleSubmit}
                  value={name}
                  setValue={setName}
                />
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Index</th>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {category?.map((ele, i) => {
                    return (
                      <tr key={i * 0.2}>
                        <th scope="row" key={i}>
                          {i + 1}
                        </th>
                        <td key={ele._id}>{ele.name}</td>
                        <td>
                          <button
                            className="btn btn-success btn-rounded"
                            key={i + 1}
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(ele.name);
                              setSelected(ele);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-rounded "
                            key={i - 1}
                            onClick={() => {
                              handleDelete(ele._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Modal
                onCancel={() => setVisible(false)}
                footer={null}
                visible={visible}
              >
                <CategoryForm
                  value={updatedName}
                  setValue={setUpdatedName}
                  handleSubmit={handleUpdate}
                />
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
