import { useRecipe } from "@/hooks/useRecipe";
import RecipeCard from "@/components/RecipeCard";

export function IndexPage() {
   const { recipe, error, getRecipe, loading } = useRecipe();

   return (
      <div className="border border-gray-300 p-4 rounded-xl max-w-100 mt-5">
         <h1 className="text-4xl font-bold p-4">Verkefni 9</h1>
         {loading && <p>Loading...</p>}
         {error && <p>{error}</p>}

         {recipe && <RecipeCard recipe={recipe} />}
         <div >
            <button className="w-full mt-4 bg-blue-400 text-white py-2 rounded-lg font-medium transition hover:bg-blue-600 active:scale-95" onClick={getRecipe}>Get New Recipe</button>
         </div>
      </div>
   );
}
