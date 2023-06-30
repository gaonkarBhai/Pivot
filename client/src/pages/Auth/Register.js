import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import "../styles/register.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
//       getter, setter
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [question, setQuestion] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        {
          name,
          email,
          password,
          phone,
          address,
          question,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else toast.error(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <Layout title={"Register | Pivot Online Ecommerce WebApp"}>
      <div className="page-content">
        <div className="form-v4-content">
          <div className="form-left">
            <h2>Create An Account</h2>
            <p className="text-1">
              To enjoy a seamless shopping experience! By registering, you gain
              access to a range of exclusive benefits. <br />
              Don't worry, we value your privacy and will keep your information
              secure. Fill in the form below to get started and unlock a world
              of convenience and exciting offers. Don't miss out on the
              opportunity to create a seamless shopping experience with us. Sign
              up today and let us elevate your online shopping adventure!
            </p>
            <p className="text-2">
              <span>Already have account ? </span>
              If you already have an account with us, simply log in to access
              your personalized shopping experience.
            </p>
            <div className="form-left-last">
              <Link className="btn btn-light" to="/login">
                Login
              </Link>
            </div>
          </div>
          <form className="form-detail" onSubmit={handleSubmit} id="myform">
            <h2>REGISTER FORM</h2>
            <div className="form-row ">
              <label htmlFor="first_name">Your Name</label>
              <input
                type="text"
                name="name"
                id="first_name"
                className="input-text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="your_email">Your Email</label>
              <input
                type="email"
                name="your_email"
                id="your_email"
                className="input-text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-row ">
              <label htmlFor="address">Your Address</label>
              <input
                type="text"
                name="address"
                id="address"
                className="input-text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="form-row ">
              <label htmlFor="address">Who is your favorite teacher</label>
              <input
                type="text"
                name="teacher"
                id="teacher"
                className="input-text"
                required
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <div className="form-group">
              <div className="form-row form-row-1">
                <label htmlFor="phone">Your Phone</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className="input-text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="form-row form-row-1 ">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="input-text"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="form-row-last">
              <button className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
