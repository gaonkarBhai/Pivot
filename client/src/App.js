// importing 
import { Route, Routes } from "react-router-dom";

import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Pagenotfound from './pages/Pagenotfound';
import Register from './pages/Auth/Register';
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Adminroute from "./components/Routes/Adminroute";
import Admindashboard from "./pages/Admin/Admindashboard";

//  Routing
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/dashboard" element={<PrivateRoute/>}>
          <Route path="" element={<Dashboard />} />
        </Route>
        <Route path="/dashboard" element={<Adminroute/>}>
          <Route path="admin" element={<Admindashboard />} />
        </Route>
        
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
