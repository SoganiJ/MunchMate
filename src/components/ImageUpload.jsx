import React, { useState } from 'react';
import styled from 'styled-components';
import './ImageUpload.css';

const ImageUploadContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UploadTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: ${(props) => props.theme.text};
`;

const ImageInput = styled.input`
  margin-bottom: 10px;
  color: ${(props) => props.theme.imageUploadText}; /* Inherit theme text color */
  &::file-selector-button {
    background-color: ${(props) => props.theme.buttonColor};
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: ${(props) => props.theme.buttonColor};
      opacity: 0.8;
    }
  }
`;

const UploadedImage = styled.img`
  max-width: 300px;
  height: auto;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SuggestRecipesButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${(props) => props.theme.buttonColor};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.buttonColor};
    opacity: 0.8;
  }
`;

const PremiumMessage = styled.p`
  color: #FFC107;
  margin-top: 10px;
  text-align: center;
`;

function ImageUpload({ theme }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [ingredientName, setIngredientName] = useState('');
  const [suggestedRecipes, setSuggestedRecipes] = useState([]);
  const [premiumMessage, setPremiumMessage] = useState(
    'Image analysis requires Vertex AI premium account. Renew now to enjoy this feature.'
  );

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleIngredientNameChange = (event) => {
    setIngredientName(event.target.value);
  };

  const handleSuggestRecipes = () => {
    // In a real application, you would use an image recognition API
    // to automatically identify the ingredient in the image.
    // For this example, we'll just use the ingredient name that the user enters.

    // Replace this with your actual recipe data and logic
    const recipes = [
      { id: 1, name: 'Recipe 1', ingredients: ['flour'] },
      { id: 2, name: 'Recipe 2', ingredients: ['flour', 'sugar'] },
      { id: 3, name: 'Recipe 3', ingredients: ['salt'] },
    ];

    const matchingRecipes = recipes.filter((recipe) =>
      recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(ingredientName.toLowerCase())
      )
    );

    setSuggestedRecipes(matchingRecipes);
  };

  return (
    <ImageUploadContainer theme={theme}>
      <UploadTitle theme={theme}>Suggest Recipes from Image</UploadTitle>
      <ImageInput type="file" accept="image/*" onChange={handleImageChange} theme={theme}/>
      {selectedImage && (
        <div>
          <UploadedImage
            src={URL.createObjectURL(selectedImage)}
            alt="Uploaded Ingredient"
          />
          <p>Enter the ingredient name:</p>
          <input
            type="text"
            value={ingredientName}
            onChange={handleIngredientNameChange}
            placeholder="e.g., flour, sugar, salt"
          />
          <SuggestRecipesButton theme={theme} onClick={handleSuggestRecipes}>Suggest Recipes</SuggestRecipesButton>
        </div>
      )}
      {suggestedRecipes.length > 0 && (
        <div>
          <h3>Suggested Recipes:</h3>
          <ul>
            {suggestedRecipes.map((recipe) => (
              <li key={recipe.id}>{recipe.name}</li>
            ))}
          </ul>
        </div>
      )}
      <PremiumMessage theme={theme}>{premiumMessage}</PremiumMessage>
    </ImageUploadContainer>
  );
}

export default ImageUpload;