import React from "react";
import { NavLink } from "react-router-dom";
const AdminMenu = () => {
  return (
    <>
      <div className="list-group text-center">
        <h4>Admin Panel</h4>
        <NavLink
          to="/dashboard/admin/create-category"
          className="list-group-item list-group-item-action"
          aria-current="true"
          activeClassName="active"
        >
          Create Category
        </NavLink>

        <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">
          Create Product
        </NavLink>
        <NavLink to="/dashboard/admin/create-users" className="list-group-item list-group-item-action">
          Users
        </NavLink>
      </div>
    </>
  );
};

export default AdminMenu;
