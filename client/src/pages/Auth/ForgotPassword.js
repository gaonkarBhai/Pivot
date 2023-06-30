import Layout from "../../components/Layout/Layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [question, setQuestion] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
          {
            email,
            newPassword,
            question,
          }
        );
        if (res.data.success) {
          toast.success(res.data.message);   
          navigate( "/login");
        } else toast.error(res.data.message);
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <Layout title={"Forgot password | Pivot Onine Ecommerce"}>
      <div className="container d-flex flex-column">
        <div className="row align-items-center justify-content-center m-3 g-0">
          <div className="col-12 col-md-8 col-lg-4 border-3 ">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="mb-4">
                  <h5>Forgot Password?</h5>
                  <p className="mb-2">
                    Enter your registered email and answer the question to reset
                    the password
                  </p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      name="email"
                      placeholder="youremail@email.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="question" className="form-label">
                      Who is your favorite teacher
                    </label>
                    <input
                      type="text"
                      id="question"
                      className="form-control"
                      name="question"
                      placeholder="Doe"
                      required
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      name="password"
                      placeholder="new password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 d-grid">
                    <button type="submit" className="btn btn-primary">
                      Reset Password
                    </button>
                  </div>
                  <span className="d-flex gap-1">
                    Don't have an account?{" "}
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/register")}
                    >
                      Register
                    </p>
                  </span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
