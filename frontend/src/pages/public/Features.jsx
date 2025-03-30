import React from "react";
import { CircleCheck } from "lucide-react";
import { Link } from "react-router-dom";

const Features = ({ resetPage }) => {
  return (
    <div className='mx-auto max-w-2xl py-32 sm:py-48 lg:py-10'>
      <div className='hidden sm:mb-8 sm:flex sm:justify-center'>
        <div className='relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20'>
          Discover our new AI-powered recipe generator.
        </div>
      </div>
      <div className='flex flex-col justify-center items-center px-4 md:px-8 lg:px-12'>
        <h1 className='mb-2 text-4xl font-semibold text-gray-900  text-center'>
          Features
        </h1>
        <h2 className='mt-6 mb-5 text-2xl leading-8 text-gray-600 text-center max-w-2xl'>
          Discover the features that make our product unique.
        </h2>
        <ul className='space-y-4 text-gray-500 list-inside dark:text-gray-400'>
          <li className='flex items-center text-lg'>
            <CircleCheck className='block mr-2 h-6 w-6 text-green-500' />
            Ingredient-based recipe generation using advanced AI algorithms.
          </li>
          <li className='flex items-center text-lg'>
            <CircleCheck className='block mr-2 h-6 w-6 text-green-500' />
            Support for various dietary preferences like vegan, gluten-free, and
            more.
          </li>
          <li className='flex items-center text-lg'>
            <CircleCheck className='block mr-2 h-6 w-6 text-green-500' />
            Easy-to-use interface for adding ingredients and generating recipes.
          </li>
          <li className='flex items-center text-lg'>
            <CircleCheck className='block mr-2 h-6 w-6 text-green-500' />
            Save, rate, and share your favorite recipes with others.
          </li>
        </ul>
        <Link
          to={"/"}
          className='mt-10 rounded-md bg-indigo-600 px-3.5 py-2.5 cursor-pointer text-sm font-semibold text-white shadow-sm hover:bg-indigo-500  '
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Features;
