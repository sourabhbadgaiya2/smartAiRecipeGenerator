import { Spin } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const PopularTags = ({ onTagClick }) => {
  const [activeTag, setActiveTag] = useState("");
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);

  const recipe = useSelector((state) => state.recipe?.savedRecipes || []);

  const extractTags = (recipes) => {
    const tagSet = new Set();

    recipes.map((recipe) => {
      if (recipe.cuisine) tagSet.add(recipe.cuisine.trim().toLowerCase());

      if (recipe.preferences?.length) {
        recipe.preferences.map((pref) => tagSet.add(pref.trim().toLowerCase()));
      }

      if (recipe.title) {
        const titleTags = recipe.title
          .toLowerCase()
          .split(/\s+/)
          .filter((word) => word.length > 2)
          .map((word) => word.trim());

        titleTags.slice(0, 3).map((tag) => tagSet.add(tag));
      }
    });

    // Convert Set to Array
    return Array.from(tagSet).map((tag) => ({ _id: tag }));
  };

  // Load Tags
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    setTags(extractTags(recipe));
    return () => clearTimeout(timer);
  }, [recipe]);

  const handleTagClick = (tag) => {
    const newActiveTag = activeTag === tag ? "" : tag;
    setActiveTag(newActiveTag);
    onTagClick(tag);
  };

  // Adjust Tag Count Based on Screen Size
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sliceAmount = width < 640 ? 8 : width < 1024 ? 10 : tags.length;

  return (
    <div className='w-full py-4 px-6'>
      <h2 className='text-lg font-semibold text-gray-800 mb-2'>
        🔥 Popular Tags
      </h2>

      <div className='flex flex-wrap gap-2'>
        {loading ? (
          <Spin />
        ) : (
          tags.slice(0, sliceAmount).map(({ _id, count }) => (
            <button
              key={_id}
              className={`px-3 py-1 text-sm font-medium rounded-lg transition ${
                activeTag === _id
                  ? "bg-green-700 text-white"
                  : "bg-green-200 text-green-800 hover:bg-green-300"
              }`}
              onClick={() => handleTagClick(_id)}
            >
              {_id}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default PopularTags;
