import React, { useState, useEffect } from "react";
import { Button, Modal, Avatar, App } from "antd";
import { UserOutlined, CloseOutlined } from "@ant-design/icons";
import { MoveRight, X, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../../../store/features/alertSlice";
import {
  getSaveRecipe,
  deletedRecipe,
} from "../../../api-services/recipe-service";
import { setSavedRecipes } from "../../../store/features/recipeSlice";
import SearchRecipes from "../../../components/SearchRecipes";

const RecipeCard = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const { message } = App.useApp();

  const { user } = useSelector((state) => state.users);
  const savedRecipes = useSelector((state) => state.recipe?.savedRecipes || []);

  const fetchSavedRecipes = async () => {
    if (savedRecipes.length) return;
    try {
      dispatch(ShowLoading());
      const data = await getSaveRecipe();
      dispatch(setSavedRecipes(data));
      message.success("Saved recipes fetched successfully!");
    } catch (error) {
      message.error("Error fetching saved recipes:", error);
    } finally {
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    fetchSavedRecipes();
  }, []);

  const showRecipeDetails = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedRecipe(null);
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  const deleteRecipe = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await deletedRecipe(id);
      dispatch(
        setSavedRecipes(savedRecipes.filter((recipe) => recipe._id !== id))
      );

      message.success(response.message);
      fetchSavedRecipes();
      setSelectedRecipe(null);
    } catch (error) {
      message.error(`Error fetching saved recipes: ${error.message}`);
    } finally {
      dispatch(HideLoading());
    }
  };

  if (!savedRecipes.length) return null;

  return (
    <>
      {/* <SearchRecipes recipes={savedRecipes} /> */}

      <div className='grid grid-cols-1 md:grid-cols-4 px-4 py-2 gap-4'>
        {savedRecipes.map((recipe) => (
          <div
            key={recipe._id}
            className='recipe-card max-w-sm bg-gradient-to-r from-slate-200 to-stone-100 border border-gray-200 rounded-lg shadow-lg mt-4 mb-2 transform transition-transform hover:scale-105 hover:shadow-lg flex flex-col h-full'
          >
            <div className='p-5 flex-grow'>
              <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 drop-shadow-lg'>
                {recipe.title}
              </h5>
              <h6 className='mt-4 font-semibold'>Ingredients:</h6>
              <div className='flex flex-wrap gap-2 mt-2'>
                {recipe.ingredients.slice(0, 3).map((item, index) => (
                  <span
                    key={index}
                    className='bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded'
                  >
                    {item}
                  </span>
                ))}
                {recipe.ingredients.length > 3 && (
                  <span className='text-gray-500 text-sm'>
                    +{recipe.ingredients.length - 3} more
                  </span>
                )}
              </div>

              <div className='flex flex-wrap justify-center gap-3 mt-2'>
                {recipe.preferences.map((item, index) => (
                  <span
                    key={index}
                    className='bg-purple-100 text-purple-800 text-lg font-medium px-2.5 py-0.5 rounded'
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <Button
              className='w-full !bg-blue-700 !text-white !rounded-lg hover:!bg-blue-800'
              onClick={() => showRecipeDetails(recipe)}
            >
              See Recipe <MoveRight className='ml-2' />
            </Button>
          </div>
        ))}
      </div>

      {selectedRecipe && (
        <Modal open={true} closable={false} footer={null}>
          <div className='flex justify-between items-center mb-4'>
            <div className='flex items-center gap-2 bg-gray-200 p-2 rounded-md'>
              <Avatar className='!bg-[#679F38]'>
                {user?.name?.charAt(0).toUpperCase() || <UserOutlined />}
              </Avatar>
              <strong>
                {user?.name} <br />
                <span className='text-gray-500 text-sm'>
                  {formatDate(selectedRecipe.createdAt)}
                </span>
              </strong>
            </div>
            <div className='flex gap-2 '>
              <Button
                type='text'
                danger
                onClick={() => deleteRecipe(selectedRecipe._id)}
                className='!bg-gray-200 !text-xl !text-red-400 hover:!bg-gray-300'
              >
                <Trash2 />
              </Button>
              <Button
                type='text'
                danger
                onClick={closeModal}
                className='!bg-gray-200 !text-xl !text-gray-700 hover:!bg-gray-300'
              >
                <CloseOutlined />
              </Button>
            </div>
          </div>
          <h3 className='text-2xl text-black font-bold mb-2'>
            {selectedRecipe.title}
          </h3>
          <h3 className='text-xl font-bold mb-2 text-gray-700'>Ingredients:</h3>
          <div className='flex flex-wrap gap-2 mb-4'>
            {selectedRecipe.ingredients.map((item, index) => (
              <span
                key={index}
                className='bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded'
              >
                {item}
              </span>
            ))}
          </div>
          <h3 className='text-xl font-bold mb-2 text-gray-700'>
            Dietary Preference:
          </h3>

          <div className='flex flex-wrap gap-2 mb-4'>
            {selectedRecipe.preferences.map((item, index) => (
              <span
                key={index}
                className='bg-purple-100 text-purple-800 text-sm font-medium px-2.5 py-0.5 rounded'
              >
                {item}
              </span>
            ))}
          </div>

          <div>
            <h3
              className='text-xl flex justify-between font-bold mb-2  text-indigo-900 bg-indigo-100 rounded-lg hover:bg-indigo-200 focus:outline-none py-2 px-4 cursor-pointer'
              onClick={() => setIsOpen(!isOpen)}
            >
              Instructions: <span className=''>{isOpen ? "▲" : "▼"}</span>
            </h3>
            <div className='bg-gray-50 border p-2 border-gray-200 rounded-lg space-y-2 transition-all duration-300 ease-in-out'>
              {isOpen && (
                <ol className='list-decimal list-inside mb-4'>
                  {selectedRecipe.instructions.map((step, index) => (
                    <li key={index} className='mb-2'>
                      {step}
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default RecipeCard;
