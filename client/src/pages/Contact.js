import './styles/contact.css';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
const Contact = () => {
  return (
    <Layout title={"Contact | PIVOT an E-commerce App Best selling products"}>
      <div className="content">
        <div className="container">
          <div className="row justify-content-center mt-5 mb-2">
            <div className="col-md-10">
              <div className="row align-items-center">
                <div className="col-lg-7 mb-5 mb-lg-0">
                  <h2 className="mb-5 fw-bold">How can we help you today?</h2>
                  <p className="">
                    Tell us about your query or concern.We are here to assist
                    you promptly.
                  </p>
                  <form
                    className="border-right pr-5 mb-5"
                    method="post"
                    id="contactForm"
                    name="contactForm"
                  >
                    <div className="row">
                      <div className="col-md-6 form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="fname"
                          id="fname"
                          placeholder="First name"
                        />
                      </div>
                      <div className="col-md-6 form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="lname"
                          id="lname"
                          placeholder="Last name"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="email"
                          id="email"
                          placeholder="Email"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 form-group">
                        <textarea
                          className="form-control"
                          name="message"
                          id="message"
                          cols={30}
                          rows={7}
                          placeholder="Write your message"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <input
                          type="submit"
                          defaultValue="Send Message"
                          className="btn btn-primary rounded-0 py-2 px-4 mt-2"
                        />
                        <span className="submitting" />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="col-lg-4 ml-auto">
                  <h3 className="mb-4">We're here to help!</h3>
                  <p>
                    If you have any questions, comments, or feedback, please
                    don't hesitate to contact us. We'll get back to you as soon
                    as possible.
                  </p>
                  <p>
                    <Link to="/" className="btn btn-primary">
                      Back To Home
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Contact