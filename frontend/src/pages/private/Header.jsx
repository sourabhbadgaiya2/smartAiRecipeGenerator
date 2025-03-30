import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Drawer, Avatar, Dropdown, Space } from "antd";
import { MenuOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const navigation = [
  { name: "Home", route: "/Home" },
  { name: "Create Recipes", route: "/CreateRecipe" },
  { name: "About", route: "/" },
];

const userNavigation = [
  { name: "Your Profile", route: "/Profile", icon: <UserOutlined /> },
  { name: "Sign out", route: "/auth/signout", icon: <LogoutOutlined /> },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.users);

  const handleSignOut = () => {
    Cookies.remove("token");
    navigate(0);
    message.success("Logged Out Successfully");
  };

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

  return (
    <header className='sticky top-0 z-50 bg-green-800 shadow-md px-6 py-1'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-9'>
          {/* Logo */}
          <div className='bg-white'>
            <Link to='/'>
              <img src='logo.svg' alt='logo' className='w-16 h-16' />
            </Link>
          </div>

          {/* Desktop Navigation with Active State */}
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

        {/* User Actions */}
        <div className='flex items-center gap-4'>
          <div className='hidden md:inline'>
            <Dropdown menu={{ items: dropdownItems }} trigger={["click"]}>
              <Space className='cursor-pointer  text-white'>
                <Avatar className='!bg-[#679F38]'>
                  {user?.name ? (
                    user.name.charAt(0).toUpperCase()
                  ) : (
                    <UserOutlined />
                  )}
                </Avatar>
                <span className='hidden md:inline'>{user?.name || "User"}</span>
              </Space>
            </Dropdown>
          </div>
          {/* Mobile Menu Button */}
          <button
            className='md:hidden cursor-pointer hover:bg-green-900 p-2 text-2xl rounded text-white'
            onClick={() => setMobileMenuOpen(true)}
          >
            <MenuOutlined />
          </button>
        </div>
      </div>

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
        <div className='border-t my-4'></div>
        {userNavigation.map((item) => (
          <Link
            key={item.name}
            to={item.route !== "/auth/signout" ? item.route : "#"}
            className=' w-full py-2 text-lg flex items-center gap-2'
            onClick={
              item.route === "/auth/signout"
                ? handleSignOut
                : () => setMobileMenuOpen(false)
            }
          >
            {item.icon} {item.name}
          </Link>
        ))}
      </Drawer>
    </header>
  );
};

export default Header;
