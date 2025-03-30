import { useState } from "react";
import { Button, Drawer, Modal } from "antd";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Product from "./Product";
import Features from "./Features";
import Landing from "./Landing";
import { Menu } from "lucide-react";

const Home = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const [selectedPage, setSelectedPage] = useState("");

  // Navigation links for the header
  const navigation = [
    { name: "Product", key: "product" },
    { name: "Features", key: "features" },
    { name: "About", key: "about" },
  ];

  const renderContent = () => {
    switch (selectedPage) {
      case "product":
        return <Product resetPage={() => setSelectedPage(null)} />;
      case "features":
        return <Features resetPage={() => setSelectedPage(null)} />;
      case "about":
        window.open("", "_blank");
        setSelectedPage(null);
        return <Landing setIsLoginOpen={() => setIsLoginOpen(true)} />;
      default:
        return <Landing setIsLoginOpen={() => setIsLoginOpen(true)} />;
    }
  };

  return (
    <div className='relative w-full h-screen flex flex-col items-center overflow-hidden'>
      {/* Background Blur Overlay (Only visible when modal is open) */}
      {(isSignUpOpen || isLoginOpen) && (
        <div className='fixed inset-0  backdrop-blur-md z-10'></div>
      )}

      {/* Header */}
      <header className='w-full fixed flex bg-white justify-between items-center px-4 shadow-lg shadow-gray-100 z-20'>
        <img className='h-17' src='./logo.svg' alt='logo' />

        <div className='hidden lg:flex lg:gap-x-12'>
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => setSelectedPage(item.key)}
              className='text-sm font-semibold cursor-pointer leading-6 text-gray-900'
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className='hidden lg:flex lg:gap-3'>
          <Button onClick={() => setIsLoginOpen(true)} type='default'>
            Log in
          </Button>
          <Button onClick={() => setIsSignUpOpen(true)} type='primary'>
            Sign up
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className=' cursor-pointer p-5 flex lg:hidden'>
          <Menu
            size={30}
            color='black'
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          />
        </div>

        {showMobileMenu && (
          <Drawer
            open={showMobileMenu}
            placement='right'
            onClose={() => setShowMobileMenu(false)}
          >
            <div className='lg:hidden flex flex-col gap-x-12'>
              {navigation.map((item) => (
                <h1
                  type='none'
                  key={item.name}
                  onClick={() => {
                    setSelectedPage(item.key), setShowMobileMenu(false);
                  }}
                  className='text-xl cursor-pointer text-center font-semibold leading-12 hover:bg-gray-200 text-gray-900'
                >
                  {item.name}
                </h1>
              ))}
            </div>
            <div className='lg:hidden  flex flex-col gap-x-12'>
              <h1
                className='text-xl cursor-pointer text-center font-semibold leading-12 hover:bg-gray-200 text-gray-900'
                onClick={() => setIsLoginOpen(true)}
              >
                Log in
              </h1>
              <h1
                className='text-xl cursor-pointer text-center font-semibold leading-12 hover:bg-gray-200 text-gray-900'
                onClick={() => setIsSignUpOpen(true)}
              >
                Sign up
              </h1>
            </div>
          </Drawer>
        )}
      </header>

      {/* Signup Modal */}
      <Modal
        title='Sign Up'
        open={isSignUpOpen}
        onCancel={() => setIsSignUpOpen(false)}
        footer={null}
        centered
        className='z-30'
      >
        <Register
          isLoginOpen={isLoginOpen}
          setIsLoginOpen={() => {
            setIsLoginOpen(true);
            setIsSignUpOpen(false);
          }}
        />
      </Modal>

      {/* Login Modal */}
      <Modal
        title='Log In'
        open={isLoginOpen}
        onCancel={() => setIsLoginOpen(false)}
        footer={null}
        centered
        className='z-30'
      >
        <Login
          isSignUpOpen={isSignUpOpen}
          setIsSignUpOpen={() => {
            setIsSignUpOpen(true);
            setIsLoginOpen(false);
          }}
        />
      </Modal>

      <div className='mx-auto max-w-2xl py-32 sm:py-48 lg:py-36'>
        <div className='hidden sm:mb-8 sm:flex sm:justify-center'>
          <div className='relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20'>
            Discover our new AI-powered recipe generator.
          </div>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default Home;
