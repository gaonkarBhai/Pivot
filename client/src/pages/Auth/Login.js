import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import '../styles/login.css'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        {
          email,
          password,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      } else toast.error(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container mb-5">
        <div className="row d-flex justify-content-center mt-5">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card py-3 px-2">
              <h2 className="text-center">Welcome Back</h2>
              <p className="text-center mb-3 mt-2">
                Sign in to your account and start shopping!
              </p>

              <form className="myform" onClick={handleSubmit}>
                <div className="form-group">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
                <div className="form-group">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
                {/* <div className="row">
                  <div className="col-md-6 col-12">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleCheck1"
                      >
                        Rester connecte
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6 col-12 bn">Mot se passe oublie</div>
                </div> */}
                <div className="form-group mt-3">
                  <button
                    type="submit"
                    className="btn btn-block btn-primary btn-lg"
                  >
                    <small>
                      <i className="far fa-user pr-2" />
                      Login
                    </small>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
