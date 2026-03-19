import { useEffect, useState } from "react";
import { fetchNewRecipe } from "@/api/recipeAPI";
import type { Recipe } from "@/schema/ZodSchema";

export function useRecipe() {
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function getRecipe() {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchNewRecipe();
            setRecipe(data)
        } catch (err) {
            setError('failed to fetch recipe')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getRecipe()
    }, []);

    return { recipe, loading, error, getRecipe}
}