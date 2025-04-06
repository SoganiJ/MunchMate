import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Upload, Image as ImageIcon, CheckCircle, Search } from "lucide-react";
import SidebarNav from "./header";

const PageContainer = styled.div`
  display: flex;
`;

const ContentContainer = styled(motion.div)`
  flex: 1;
  margin-left: 260px; /* Adjust based on your sidebar width */
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background:linear-gradient(to bottom, #fff8e1,rgb(255, 255, 255));
  min-height: 100vh;
`;

const ImageUploadContainer = styled(motion.div)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  text-align: center;
`;

const UploadTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  font-weight: 600;
`;

const ImageInputLabel = styled.label`
  display: flex;
  align-items: center;
  background: #ff7f50;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;

  &:hover {
    background: #ff6347;
  }
`;

const ImageInput = styled.input`
  display: none;
`;

const UploadedImage = styled(motion.img)`
  max-width: 300px;
  height: auto;
  margin-top: 10px;
  border-radius: 10px;
  border: 2px solid #ccc;
`;

const InputField = styled.input`
  padding: 8px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 5px;
  width: 80%;
  margin-top: 10px;
`;

const SuggestRecipesButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 15px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.3s;

  &:hover {
    background: #218838;
  }
`;

const RecipeList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 15px;
`;

const RecipeItem = styled(motion.li)`
  background: white;
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 500;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const PremiumMessage = styled.p`
  color: #d9534f;
  margin-top: 15px;
  font-size: 14px;
  font-weight: 500;
`;

function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [ingredientName, setIngredientName] = useState("");
  const [suggestedRecipes, setSuggestedRecipes] = useState([]);
  const [premiumMessage] = useState(
    "🔒 Image analysis requires Vertex AI premium account. Renew now!"
  );

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleIngredientNameChange = (event) => {
    setIngredientName(event.target.value);
  };

  const handleSuggestRecipes = () => {
    const recipes = [
      { id: 1, name: "Pancakes", ingredients: ["flour"] },
      { id: 2, name: "Cake", ingredients: ["flour", "sugar"] },
      { id: 3, name: "Soup", ingredients: ["salt"] },
    ];

    const matchingRecipes = recipes.filter((recipe) =>
      recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(ingredientName.toLowerCase())
      )
    );

    setSuggestedRecipes(matchingRecipes);
  };

  return (
    <PageContainer>
      <SidebarNav />
      <ContentContainer
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ImageUploadContainer>
          <UploadTitle>Suggest Recipes from Image</UploadTitle>
          <ImageInputLabel>
            <Upload size={20} /> Upload Image
            <ImageInput type="file" accept="image/*" onChange={handleImageChange} />
          </ImageInputLabel>

          {selectedImage && (
            <>
              <UploadedImage
                src={URL.createObjectURL(selectedImage)}
                alt="Uploaded Ingredient"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              <p>Enter the ingredient name:</p>
              <InputField
                type="text"
                value={ingredientName}
                onChange={handleIngredientNameChange}
                placeholder="e.g., flour, sugar, salt"
              />
              <SuggestRecipesButton
                onClick={handleSuggestRecipes}
                whileTap={{ scale: 0.9 }}
              >
                <Search size={18} /> Suggest Recipes
              </SuggestRecipesButton>
            </>
          )}

          {suggestedRecipes.length > 0 && (
            <div>
              <h3>Suggested Recipes:</h3>
              <RecipeList>
                {suggestedRecipes.map((recipe) => (
                  <RecipeItem key={recipe.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <CheckCircle color="green" /> {recipe.name}
                  </RecipeItem>
                ))}
              </RecipeList>
            </div>
          )}

          <PremiumMessage>{premiumMessage}</PremiumMessage>
        </ImageUploadContainer>
      </ContentContainer>
    </PageContainer>
  );
}

export default ImageUpload;
