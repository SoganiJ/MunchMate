import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import recipes from '../data';
import SidebarNav from './header'; 

const Layout = styled.div`
  display: flex;
  height: 100vh; /* Full viewport height */
`;

const ContentWrapper = styled.div`
  flex: 1;
  margin-left: 270px; /* Sidebar width */
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(to bottom,rgb(244, 244, 244),rgb(255, 255, 255)); /* Background covers all cards */
  min-height: 100vh; /* Ensures it covers all content - Adjusted from 200vh */
`;

const RecipeListH2 = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: #4a2c14;
  margin-bottom: 30px;
  margin-top: 0px;
  text-align: center;
`;

const RecipeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  max-width: 1200px;
  width: 100%;
`;

const RecipeCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  min-height: 350px; /* Ensures uniform height */

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.15);
  }
`;

const RecipeImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const RecipeInfo = styled.div`
  flex-grow: 1; /* Ensures content is evenly spaced */
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const RecipeName = styled.h3`
  font-size: 1.4rem;
  font-weight: bold;
  color: #4a2c14;
  margin-bottom: 8px;
  text-align: center;
  word-wrap: break-word; /* Prevents breaking layout */
`;

const RecipeDescription = styled.p`
  font-size: 0.95rem;
  color: #6b4f36;
  line-height: 1.4;
  text-align: center;
  word-wrap: break-word;
`;

const ViewRecipeLink = styled(Link)`
  display: block;
  text-align: center;
  padding: 12px;
  background-color: #ff9800;
  color: white;
  font-weight: bold;
  border-radius: 0 0 12px 12px;
  text-decoration: none;
  transition: background 0.3s ease;

  &:hover {
    background-color: #e68900;
  }
`;

function RecipeList() {
  return (
    <Layout>
      <SidebarNav /> {/* Sidebar with the same background */}
      <ContentWrapper>
        <RecipeListH2 style={{fontWeight:"bold",fontSize:"2.6rem",fontFamily: "Helvetica, Arial, sans-serif"}} >Tasty Bites 🍴</RecipeListH2>
        <RecipeGrid>
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id}>
              <RecipeImage src={recipe.image} alt={recipe.name} />
              <RecipeInfo>
                <RecipeName>{recipe.name}</RecipeName>
                <RecipeDescription>{recipe.description}</RecipeDescription>
              </RecipeInfo>
              <ViewRecipeLink to={`/recipe/${recipe.id}`}>View Recipe</ViewRecipeLink>
            </RecipeCard>
          ))}
        </RecipeGrid>
      </ContentWrapper>
    </Layout>
  );
}

export default RecipeList;