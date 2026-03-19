import type { Recipe } from "@/schema/ZodSchema";

type RecipeProps = {
   recipe: Recipe;
};

const RecipeCard = ({ recipe }: RecipeProps) => {

   return (
      <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-5 max-w-md mt-6">
         <h2 className="text-xl font-bold mb-3">{recipe.strMeal}</h2>
         <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-48 object-cover rounded-lg mb-4"
         />

         <p className="flex gap-4 text-sm text-gray-600 mb-4">
            <strong>Category:</strong> {recipe.strCategory}
            <strong>Cuisine:</strong> {recipe.strArea}
         </p>

         <div className="max-h-40 overflow-y-auto pr-2">
            <p className="text-gray-700 text-sm leading-relaxed">
               {recipe.strInstructions}
            </p>
         </div>
      </div>
   );
};

export default RecipeCard;
