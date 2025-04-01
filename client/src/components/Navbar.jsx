import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Drawer, Avatar, Dropdown, Space, Button, Modal, App } from "antd";
import { MenuOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";

import { logoutUser } from "../api-services/auth-service";
import { HideLoading, ShowLoading } from "../store/features/alertSlice";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const { message } = App.useApp();

  // Logout function
  const handleSignOut = async () => {
    try {
      dispatch(ShowLoading());
      const response = await logoutUser();
      message.success(response.message);
      Cookies.remove("token");
      navigate(0);
    } catch (error) {
      message.error(
        error.response?.data.error ||
          error.response.data.message ||
          error.message
      );
    } finally {
      dispatch(HideLoading());
    }
  };

  // Navigation links
  const dashboardNavigation = [
    { name: "Home", route: "/Home" },
    { name: "Create Recipes", route: "/create-recipe" },
    {
      name: "About",
      route: "https://github.com/sourabhbadgaiya2/smartAiRecipeGenerator",
      external: true, // Flag to identify external links
    },
  ];

  const homeNavigation = [
    { name: "Home", route: "/" },
    { name: "Product", route: "/product" },
    { name: "Features", route: "/features" },
    {
      name: "About",
      route: "https://github.com/sourabhbadgaiya2/smartAiRecipeGenerator",
      external: true, // Flag to identify external links
    },
  ];

  // User dropdown menu
  const userNavigation = [
    { name: "Your Profile", route: "/Profile", icon: <UserOutlined /> },
    { name: "Sign out", route: "/api/auth/logout", icon: <LogoutOutlined /> },
  ];

  const dropdownItems = userNavigation.map((item) => ({
    key: item.route,
    label: (
      <span
        onClick={
          item.route === "/api/auth/logout"
            ? handleSignOut
            : () => navigate(item.route)
        }
        className='flex items-center gap-2'
      >
        {item.icon} {item.name}
      </span>
    ),
  }));

  // Select correct navigation links based on user login status
  const navigation = user ? dashboardNavigation : homeNavigation;

  return (
    <>
      <header className='sticky top-0 z-50 bg-green-800 shadow-md px-6 py-1'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-9'>
            {/* Logo */}
            <div className='bg-white'>
              <Link to='/Home'>
                <img src='logo.svg' alt='logo' className='w-16 h-16' />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className='hidden md:flex gap-4'>
              {navigation.map((item) =>
                item.external ? ( // External link ke liye alag handle karo
                  <a
                    key={item.name}
                    href={item.route}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='px-3 py-2 rounded font-semibold hover:!bg-green-700 !text-white hover:!text-white'
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.route}
                    className={`px-3 py-2  rounded font-semibold ${
                      location.pathname === item.route
                        ? "!bg-white !text-black"
                        : "hover:!bg-green-700 !text-white hover:!text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              )}
            </nav>
          </div>

          {/* User Section */}
          <div className='flex items-center gap-4'>
            {user ? (
              <Dropdown menu={{ items: dropdownItems }} trigger={["click"]}>
                <Space className='cursor-pointer'>
                  <Avatar className='!bg-[#679F38] font-bold'>
                    {user?.name?.charAt(0).toUpperCase() || <UserOutlined />}
                  </Avatar>
                  <span className='hidden text-white md:inline'>
                    {user?.name || "User"}
                  </span>
                </Space>
              </Dropdown>
            ) : (
              <>
                <Button
                  className='!bg-[#e0eaff] hover:!bg-gray-200'
                  onClick={() => setIsLoginOpen(true)}
                  type='default'
                >
                  Log in
                </Button>
                <Button onClick={() => setIsSignUpOpen(true)} type='primary'>
                  Sign up
                </Button>
              </>
            )}

            {/* Mobile Menu */}
            <button
              className='md:hidden cursor-pointer font-semibold bg-green-900 p-2 text-2xl rounded text-white'
              onClick={() => setMobileMenuOpen(true)}
            >
              <MenuOutlined />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <Drawer
        title='Menu'
        placement='right'
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
      >
        {navigation.map((item) =>
          item.external ? ( // External link ke liye <a> tag use karo
            <a
              key={item.name}
              href={item.route}
              target='_blank'
              rel='noopener noreferrer'
              className='block w-full py-2 text-lg'
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </a>
          ) : (
            <Link
              key={item.name}
              to={item.route}
              className='block w-full py-2 text-lg'
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          )
        )}
      </Drawer>

      {/* Modals */}
      <Modal
        title='Sign Up'
        open={isSignUpOpen}
        onCancel={() => setIsSignUpOpen(false)}
        footer={null}
      >
        <Register
          setIsLoginOpen={() => {
            setIsLoginOpen(true);
            setIsSignUpOpen(false);
          }}
          onSuccess={() => setIsSignUpOpen(false)}
        />
      </Modal>

      <Modal
        title='Log In'
        open={isLoginOpen}
        onCancel={() => setIsLoginOpen(false)}
        footer={null}
      >
        <Login
          setIsSignUpOpen={() => {
            setIsSignUpOpen(true);
            setIsLoginOpen(false);
          }}
          onSuccess={() => setIsLoginOpen(false)}
        />
      </Modal>
    </>
  );
};

export default Navbar;
