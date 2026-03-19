import z from "zod";

export const recipeSchema = z.object({
    meals: z.array(
        z.object({
            idMeal: z.string(),
            strMeal: z.string(),
            strCategory: z.string().nullable(),
            strArea: z.string().nullable(),
            strInstructions: z.string().nullable(),
            strMealThumb: z.string().url(),
        })
    )
})

export type RecipeResponse = z.infer<typeof recipeSchema>;
export type Recipe = RecipeResponse['meals'][0];