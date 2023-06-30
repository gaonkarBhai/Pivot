import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

const Layout = ({ children, title, description, keyword, author }) => {
  return (
    <>

      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keyword} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>

      <Header />
      <main>
        <Toaster  />
        {children}
      </main>
      <Footer />

    </>
  );
};
Layout.defaultProps = {
  title: "PIVOT | E-commerce App Best selling products of top brand",
  description: "Buy best of best product at any time",
  keyword: "React, ecommerce, pivot, webapp, product, online,mern,mongodb",
  author: "Naveen",
};
export default Layout;
