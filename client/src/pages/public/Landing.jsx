import { App } from "antd";

const Landing = () => {
  const { message } = App.useApp();

  return (
    <div className='text-center overflow-hidden'>
      <div className='mx-auto max-w-2xl py-32 sm:py-48 lg:py-14'>
        <div className='hidden sm:mb-8 sm:flex sm:justify-center'>
          <div className='relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20'>
            Discover our new AI-powered recipe generator.
          </div>
        </div>
        <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
          Generate Delicious Recipes with Your Ingredients
        </h1>
        <p className='mt-6 text-lg leading-8 text-gray-600'>
          Simply input your available ingredients, select dietary preferences,
          and let our AI create unique and delicious recipes just for you.
        </p>
        <div className='mt-10 flex items-center justify-center gap-x-6'>
          <button
            className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 cursor-pointer'
            onClick={() =>
              message.info(
                "🔒 Please login from the top-right corner to start."
              )
            }
          >
            Get started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
