import React from 'react'
import Layout from '../components/Layout/Layout';
const About = () => {
  return (
    <Layout title={"About | E-commerce App Best selling products"}>
      <div>
        <div className="bg-light">
          <div className="container py-5">
            <div className="row h-100 align-items-center py-5">
              <div className="col-lg-6">
                <h1 className="display-4">We Are PIVOT</h1>
                <p className="lead text-muted mb-0">
                  Our company was founded in 2023. Goal is to providing
                  high-quality products at affordable prices. Our mission is to
                  make it easy for people to find the products they need and
                  love. Our values are customer service, quality, and
                  innovation.
                </p>
              </div>
              <div className="col-lg-6 d-none d-lg-block">
                <img
                  src="https://bootstrapious.com/i/snippets/sn-about/illus.png"
                  alt
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white py-5">
          <div className="container py-5">
            <div className="row align-items-center mb-5">
              <div className="col-lg-6 order-2 order-lg-1">
                <i className="fa fa-bar-chart fa-2x mb-3 text-primary" />
                <h2 className="font-weight-light">Our Products</h2>
                <p className="font-italic text-muted mb-4">
                  We offer a wide variety of products, including clothing,
                  shoes, accessories, and home goods. Our products are made from
                  high-quality materials and are designed to last. We offer a
                  satisfaction guarantee on all of our products.
                </p>
              </div>
              <div className="col-lg-5 px-5 mx-auto order-1 order-lg-2">
                <img
                  src="https://bootstrapious.com/i/snippets/sn-about/img-1.jpg"
                  alt
                  className="img-fluid mb-4 mb-lg-0"
                />
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col-lg-5 px-5 mx-auto">
                <img
                  src="https://bootstrapious.com/i/snippets/sn-about/img-2.jpg"
                  alt
                  className="img-fluid mb-4 mb-lg-0"
                />
              </div>
              <div className="col-lg-6">
                <i className="fa fa-leaf fa-2x mb-3 text-primary" />
                <h2 className="font-weight-light">Our Team</h2>
                <p className="font-italic text-muted mb-4">
                  We are a team of passionate and dedicated individuals who are
                  committed to providing our customers with the best possible
                  shopping experience. We are always available to answer your
                  questions and help you find the perfect product for your
                  needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default About