import React from "react";
import "./Sidebar.css";
import { AiOutlineHome } from "react-icons/ai";
import { MdProductionQuantityLimits } from "react-icons/md";
import { BiCommentDetail } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { BsBagCheck } from "react-icons/bs";
import { CiDiscount1 } from "react-icons/ci";
import { Link, NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h1 className="sidebar-title">به داشبورد خود خوش آمدید</h1>
      <ul className="sidebar-links">
        <NavLink to="/">
          <AiOutlineHome className="sidebar-icon" />
          صفحه اصلی
        </NavLink>
        <NavLink to="/products">
          <MdProductionQuantityLimits className="sidebar-icon" />
          محصولات
        </NavLink>
        <NavLink to="/comments">
          <BiCommentDetail className="sidebar-icon" />
          کامنت ها
        </NavLink>
        <NavLink to="/users">
          <FiUsers className="sidebar-icon" />
          کاربران
        </NavLink>
        <NavLink to="/orders">
          <BsBagCheck className="sidebar-icon" />
          سفارشات
        </NavLink>
        <NavLink to="/offs">
          <CiDiscount1 className="sidebar-icon" />
          تخفیف ها
        </NavLink>
      </ul>
    </div>
  );
}
