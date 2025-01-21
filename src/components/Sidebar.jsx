import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import Logo from "./Logo";
import styls from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styls.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />

      <footer className={styls.footer}>
        <p className={styls.copyright}>
          &copy; Copyright {new Date().getFullYear()} by Worldwise Inc.
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
