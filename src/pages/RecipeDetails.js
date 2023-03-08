import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import RecipeHeader from '../components/recipeDetailsInProgress/RecipeHeader';
import RecipeIngredients from '../components/recipeDetailsInProgress/RecipeIngredients';
import RecipeInstructions from '../components/recipeDetailsInProgress/RecipeInstructions';
import RecipeYoutube from '../components/recipeDetailsInProgress/RecipeYoutube';
import { fetchRecipeDetails } from '../services';
import '../style/recipeDetails.css';

function RecipeDetails() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [recipeInfo, setRecipeInfo] = useState({});

  const fetchDetails = useCallback(async () => {
    const info = await fetchRecipeDetails(id, pathname);
    setRecipeInfo(info);
  }, [id, pathname]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const isDrink = pathname.includes('/drinks');
  return (
    <main>
      <RecipeHeader
        src={ isDrink ? recipeInfo.strDrinkThumb : recipeInfo.strMealThumb }
        alt={ isDrink ? recipeInfo.strDrink : recipeInfo.strMeal }
        title={ isDrink ? recipeInfo.strDrink : recipeInfo.strMeal }
        category={ isDrink ? recipeInfo.strAlcoholic : recipeInfo.strCategory }
      />
      <RecipeIngredients
        ingredients={ recipeInfo.ingredients }
      />
      <RecipeInstructions
        strInstructions={ recipeInfo.strInstructions }
      />
      <RecipeYoutube
        strYoutube={ recipeInfo.strYoutube }
        isDrink={ isDrink }
      />
    </main>
  );
}

export default RecipeDetails;
