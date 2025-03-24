// src/components/RecipeList.jsx
import React from 'react';
import './RecipeList.css';
import recipes from '../data';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const RecipeCard = styled.div`
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: ${(props) => props.theme.header}; /* Use header color for background */
`;

const RecipeImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const RecipeName = styled.h3`
  font-size: 18px;
  margin: 10px;
  color: ${(props) => props.theme.text};
`;

const RecipeDescription = styled.p`
  font-size: 14px;
  margin: 10px;
  color: ${(props) => props.theme.recipeText}; /* Use recipeText color */
`;

const ViewRecipeLink = styled(Link)`
  display: block;
  padding: 10px;
  background-color: #007bff;
  color: white;
  text-align: center;
  text-decoration: none;
  &:hover {
    background-color: #0056b3;
  }
`;

const RecipeListH2 = styled.h2`
  color: ${(props) => props.theme.text};
`;

function RecipeList() {
  return (
    <div className="recipe-list">
      <RecipeListH2>Our Recipes</RecipeListH2>
      <div className="recipes">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id}>
            <RecipeImage src={recipe.image} alt={recipe.name} />
            <RecipeName theme="props">{recipe.name}</RecipeName>  {/* Check the code implementation in RecipeList is correct or not*/}
            <RecipeDescription>
              {recipe.description}
            </RecipeDescription>
            <ViewRecipeLink to={`/recipe/${recipe.id}`}>View Recipe</ViewRecipeLink>
          </RecipeCard>
        ))}
      </div>
    </div>
  );
}

export default RecipeList;