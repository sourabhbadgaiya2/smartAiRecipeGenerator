import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Card, Spin, App } from "antd";
import { setGeneratedRecipe } from "../../../store/features/recipeSlice";
import {
  generateRecipes,
  saveGenerateRecipe,
} from "../../../api-services/recipe-service";
import { HideLoading, ShowLoading } from "../../../store/features/alertSlice";
import { useNavigate } from "react-router-dom";

const GenerateRecipe = () => {
  const [loading, setLoading] = useState(false);
  const { message } = App.useApp();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const generatedRecipe = useSelector((state) => state.recipe.generatedRecipe);
  const [sanitizedInput, setSanitizedInput] = useState(null);

  const onFinish = useCallback(
    async (values) => {
      const formattedValues = {
        ...values,
        ingredients: values.ingredients
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item !== ""),
        preferences: values.preferences
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item !== ""),
      };

      try {
        dispatch(ShowLoading());
        const sanitizedValues = {
          ingredients: formattedValues.ingredients,
          preferences: formattedValues.preferences,
          cuisine: formattedValues.cuisine || "",
        };

        setSanitizedInput(sanitizedValues);

        const data = await generateRecipes(sanitizedValues);
        dispatch(setGeneratedRecipe(data));
        message.success("Recipe generated successfully!");
      } catch (error) {
        message.error(
          error?.response?.data?.message || "Something went wrong! Try again."
        );
      } finally {
        dispatch(HideLoading());
      }
    },
    [dispatch, message]
  );

  const saveRecipe = async () => {
    if (!generatedRecipe || !sanitizedInput) {
      message.error("No recipe or input available to save!");
      return;
    }

    try {
      dispatch(ShowLoading());
      const formattedRecipe = {
        ...generatedRecipe,
        ...sanitizedInput,
        ingredients: Array.isArray(generatedRecipe.ingredients)
          ? generatedRecipe.ingredients
          : [],
        instructions: Array.isArray(generatedRecipe.instructions)
          ? generatedRecipe.instructions
          : [],
      };
      await saveGenerateRecipe(formattedRecipe);
      message.success("Recipe Saved successfully!");
      dispatch(setGeneratedRecipe(null));
      navigate("/Home");
    } catch (error) {
      console.error(error);
      message.error(
        error?.response?.data?.error || "Something went wrong! Try again."
      );
    } finally {
      dispatch(HideLoading());
    }
  };

  return (
    <div className='flex flex-col-reverse lg:flex-row bg-gray-100 min-h-[88vh] relative w-full overflow-hidden'>
      <Card className='w-full lg:max-w-lg shadow-lg p-6'>
        <h1 className='text-2xl font-bold text-gray-700 mb-4'>
          Generate a New Recipe
        </h1>
        <Form layout='vertical' onFinish={onFinish}>
          <Form.Item
            name='ingredients'
            label='Ingredients'
            rules={[
              {
                required: true,
                message: "Please enter at least one ingredient",
              },
            ]}
          >
            <Input.TextArea placeholder='Enter ingredients, separated by commas (e.g. potato, garlic, onion)' />
          </Form.Item>

          <Form.Item name='preferences' label='Preferences'>
            <Input.TextArea placeholder='Enter preferences, separated by commas (e.g. vegan, gluten-free, low-carb)' />
          </Form.Item>

          <Form.Item name='cuisine' label='Cuisine'>
            <Input placeholder='Optional: Enter cuisine type' />
          </Form.Item>

          <Button type='primary' htmlType='submit' block disabled={loading}>
            {loading ? <Spin /> : "Generate Recipe"}
          </Button>
        </Form>
      </Card>

      <img
        className='absolute hidden lg:block -top-10 right-15 w-1/2 h-screen object-cover opacity-10 pointer-events-none select-none'
        src='logo.svg'
        alt='logo'
      />

      {generatedRecipe && (
        <Card className='w-full relative lg:w-2/3 pb-10 mt-6 p-6 max-h-[86vh] overflow-y-auto rounded-2xl shadow-xl bg-white/30 backdrop-blur-lg border border-white/40'>
          <div className='flex justify-end'>
            <Button
              type='primary'
              className='!bg-green-600 hover:!bg-green-700'
              onClick={() => saveRecipe()}
            >
              Save Recipe
            </Button>
          </div>
          <h2 className='text-3xl font-bold text-gray-900 tracking-wide'>
            {generatedRecipe.title}
          </h2>

          <div className='mt-4 space-y-3 text-gray-700'>
            <p className='text-lg font-medium'>
              <span className='font-bold text-green-700'>🍽 Ingredients:</span>
              <span className='block mt-1 text-gray-600'>
                {generatedRecipe.ingredients.join(", ")}
              </span>
            </p>
            <p className='text-lg font-medium'>
              <span className='font-bold text-blue-700'>📜 Instructions:</span>
              <span className='block mt-1 text-gray-600 whitespace-pre-line'>
                {generatedRecipe.instructions}
              </span>
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default GenerateRecipe;
