import React, { useState, useEffect } from "react";
import { Input, Button, Space, Card } from "antd";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import PopularTags from "./PopularTags ";
import { useNavigate } from "react-router-dom";

const SearchRecipes = ({ recipes, onFilter }) => {
  const [searchVal, setSearchVal] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (searchVal.trim()) {
      handleSearch(searchVal);
    }
  }, [searchVal, recipes]);

  const handleSearch = (value) => {
    const lowerCaseValue = value.toLowerCase();

    const filtered = recipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(lowerCaseValue) ||
        recipe.cuisine.toLowerCase().includes(lowerCaseValue) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(lowerCaseValue)
        ) ||
        recipe.preferences.some((pref) =>
          pref.toLowerCase().includes(lowerCaseValue)
        )
    );

    onFilter(filtered);
  };

  const handleTagClick = (tag) => {
    setSearchVal(tag);
  };

  return (
    <>
      <div className='w-full max-w-screen-lg flex mx-auto items-center justify-between p-2 mt-4 rounded-full shadow-md bg-green-50 border border-green-300'>
        <div className='relative w-full flex items-center'>
          <Input
            className='w-full pl-10 pr-10 py-2 text-sm !text-gray-700 !placeholder-gray-600 !bg-transparent !border-none !rounded-full !focus:outline-none focus:ring-2 focus:!ring-green-200'
            placeholder='Search recipes by name, ingredient, or type...'
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            onPressEnter={() => handleSearch(searchVal)}
            prefix={<SearchOutlined style={{ color: "#0f9d58" }} />}
            suffix={
              searchVal.trim() && (
                <Space>
                  <CloseOutlined
                    onClick={() => (setSearchVal(""), navigate(0))}
                    style={{ color: "#d32f2f", cursor: "pointer" }}
                  />
                </Space>
              )
            }
          />
        </div>

        <Button
          className='ml-4 px-4 py-2 text-sm font-medium text-white !bg-green-600 hover:!bg-green-700 !rounded-full focus:!ring-4 focus:!outline-none focus:!ring-green-200 transition-all duration-200'
          type='primary'
          onClick={() => handleSearch(searchVal)}
        >
          Search
        </Button>
      </div>

      <PopularTags onTagClick={handleTagClick} />
    </>
  );
};

export default SearchRecipes;
