import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Drawer, Avatar, Dropdown, Space, Button, Modal } from "antd";
import { MenuOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Landing from "../pages/public/Landing";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.users);

  // Logout function
  const handleSignOut = () => {
    Cookies.remove("token");
    navigate(0);
  };

  // Navigation links
  const dashboardNavigation = [
    { name: "Home", route: "/Home" },
    { name: "Create Recipes", route: "/create-recipe" },
    { name: "About", route: "/" },
  ];

  const homeNavigation = [
    { name: "Home", route: "/" },
    { name: "Product", route: "/product" },
    { name: "Features", route: "/features" },
    { name: "About", route: "/about" },
  ];

  // User dropdown menu
  const userNavigation = [
    { name: "Your Profile", route: "/Profile", icon: <UserOutlined /> },
    { name: "Sign out", route: "/auth/signout", icon: <LogoutOutlined /> },
  ];

  const dropdownItems = userNavigation.map((item) => ({
    key: item.route,
    label: (
      <span
        onClick={
          item.route === "/auth/signout"
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
      <div className='hidden'>
        <Landing setIsLoginOpen={() => setIsLoginOpen(true)} />
      </div>
      <header className='sticky top-0 z-50 bg-green-800 shadow-md px-6 py-1'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-9'>
            {/* Logo */}
            <Link to='/'>
              <img src='logo.svg' alt='logo' className='w-16 h-16' />
            </Link>

            {/* Desktop Navigation */}
            <nav className='hidden md:flex gap-4'>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.route}
                  className={`px-3 py-2 rounded font-semibold ${
                    location.pathname === item.route
                      ? "!bg-white !text-black"
                      : "!text-white hover:!bg-green-700"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* User Section */}
          <div className='flex items-center gap-4'>
            {user ? (
              <Dropdown menu={{ items: dropdownItems }} trigger={["click"]}>
                <Space className='cursor-pointer text-white'>
                  <Avatar className='!bg-[#679F38]'>
                    {user?.name?.charAt(0).toUpperCase() || <UserOutlined />}
                  </Avatar>
                  <span className='hidden md:inline'>
                    {user?.name || "User"}
                  </span>
                </Space>
              </Dropdown>
            ) : (
              <>
                <Button onClick={() => setIsLoginOpen(true)} type='default'>
                  Log in
                </Button>
                <Button onClick={() => setIsSignUpOpen(true)} type='primary'>
                  Sign up
                </Button>
              </>
            )}

            {/* Mobile Menu */}
            <button
              className='md:hidden cursor-pointer hover:bg-green-900 p-2 text-2xl rounded text-white'
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
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.route}
            className='block w-full py-2 text-lg'
            onClick={() => setMobileMenuOpen(false)}
          >
            {item.name}
          </Link>
        ))}
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
        />
      </Modal>
    </>
  );
};

export default Navbar;
