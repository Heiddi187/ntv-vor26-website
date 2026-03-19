import { recipeSchema, type Recipe } from "@/schema/ZodSchema";

export async function fetchNewRecipe(): Promise<Recipe> {
    const res = await fetch(
        'https://www.themealdb.com/api/json/v1/1/random.php'
    );

    const data = await res.json();

    const parsedData = recipeSchema.safeParse(data);

    if (!parsedData.success) {
        console.log(parsedData.error);
        throw new Error('Invalid API response')
    }
    
    return parsedData.data.meals[0]
}