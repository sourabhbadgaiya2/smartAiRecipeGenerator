import React from "react";

const Spinner = () => {
  return (
    <div className='flex items-center backdrop-blur-3xl absolute z-[9999] h-screen w-screen justify-center mt-5'>
      <div className='relative'>
        <div className='h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200'></div>
        <div className='absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin'></div>
      </div>
    </div>
  );
};

export default Spinner;
