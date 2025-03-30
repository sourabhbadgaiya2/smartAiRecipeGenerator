import React from "react";
import { Input, Button } from "antd";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";

const SearchRecipes = ({ recipe }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className='w-full max-w-screen-lg flex items-center justify-between p-4 mt-4 rounded-full shadow-md bg-green-50 border border-green-300'>
      <div className='relative w-full flex items-center'>
        {/* Input Field */}
        <Input
          className='w-full pl-10 pr-10 py-2 text-sm text-gray-700 placeholder-gray-600 bg-transparent border-none rounded-full focus:outline-none focus:ring-2 focus:ring-green-200'
          placeholder='Search recipes by name, ingredient, or type...'
          value={recipe}
          onChange={(e) => setSearchVal(e.target.value)}
          onKeyDown={handleKeyPress}
          prefix={<SearchOutlined className='text-green-700' />}
          suffix={
            searchVal.trim() ? (
              <CloseOutlined
                className='text-green-700 cursor-pointer'
                onClick={() => setSearchVal("")}
              />
            ) : null
          }
        />
        {/* {totalRecipes > 0 && (
          <span className='text-sm text-gray-500 font-bold ml-2'>
            ({totalRecipes})
          </span>
        )} */}
      </div>

      {/* Search Button */}
      <Button
        type='primary'
        className='ml-4 bg-green-600 hover:bg-green-700 rounded-full focus:ring-4 focus:outline-none focus:ring-green-200'
        onClick={handleSearch}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchRecipes;
