// src/components/Recipe.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import recipes from '../data';
import './Recipe.css';
import styled from 'styled-components';

const RecipeDetailContainer = styled.div`
  padding: 20px;
  color: ${(props) => props.theme.text};
`;

const RecipeName = styled.h2`
  font-size: 28px;
  margin-bottom: 10px;
`;

const RecipeImage = styled.img`
  max-width: 500px;
  height: auto;
  margin-bottom: 20px;
`;

const RecipeDescription = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

const IngredientsHeading = styled.h3`
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const InstructionsHeading = styled.h3`
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const IngredientList = styled.ul`
  padding-left: 20px;
  margin-bottom: 20px;
`;

const InstructionList = styled.ol`
  padding-left: 20px;
  margin-bottom: 20px;
`;

const ListItem = styled.li`
  font-size: 16px;
  line-height: 1.5;
`;

function Recipe() {
  const { id } = useParams();
  const recipe = recipes.find((recipe) => recipe.id === parseInt(id));

  if (!recipe) {
    return <div>Recipe not found.</div>;
  }

  return (
    <RecipeDetailContainer>
      <RecipeName>{recipe.name}</RecipeName>
      <RecipeImage src={recipe.image} alt={recipe.name} />
      <RecipeDescription>{recipe.description}</RecipeDescription>

      <IngredientsHeading>Ingredients:</IngredientsHeading>
      <IngredientList>
        {recipe.ingredients.map((ingredient, index) => (
          <ListItem key={index}>{ingredient}</ListItem>
        ))}
      </IngredientList>

      <InstructionsHeading>Instructions:</InstructionsHeading>
      <InstructionList>
        {recipe.instructions.map((instruction, index) => (
          <ListItem key={index}>{instruction}</ListItem>
        ))}
      </InstructionList>
    </RecipeDetailContainer>
  );
}

export default Recipe;