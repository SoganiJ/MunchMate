import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import recipes from '../data';
import SidebarNav from './header';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(to bottom, #fff3e0, #ffe0b2);
`;

const ContentWrapper = styled.div`
  flex: 1;
  margin-left: 270px; /* Matches sidebar width */
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RecipeDetailContainer = styled(motion.div)`
  background: white;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding: 30px;
  max-width: 500px;
  width: 100%;
  text-align: center;
`;

const RecipeName = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  color: #4a2c14;
  margin-bottom: 15px;
`;

const RecipeImage = styled.img`
  width: 80%;
  max-width: 300px; /* Smaller size */
  height: auto;
  border-radius: 10px;
  margin-bottom: 15px;
`;

const RecipeDescription = styled.p`
  font-size: 1rem;
  color: #6b4f36;
  margin-bottom: 20px;
  line-height: 1.5;
`;

const SectionHeading = styled.h3`
  font-size: 1.3rem;
  color: #d84315;
  margin-top: 15px;
  margin-bottom: 10px;
  border-bottom: 2px solid #ff9800;
  display: inline-block;
  padding-bottom: 5px;
`;

const List = styled.ul`
  text-align: left;
  padding-left: 20px;
  margin-bottom: 20px;
`;

const ListItem = styled.li`
  font-size: 1rem;
  color: #5d4037;
  line-height: 1.6;
  margin-bottom: 5px;
`;

const StepContainer = styled(motion.div)`
  background: #fff8e1;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
`;

const StepText = styled.p`
  font-size: 1rem;
  color: #4a2c14;
  font-weight: bold;
  line-height: 1.5;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const NavButton = styled.button`
  padding: 10px 15px;
  background: ${(props) => (props.disabled ? "#ccc" : "#ff9800")};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background 0.3s;
  font-weight: bold;
  &:hover {
    background: ${(props) => (props.disabled ? "#ccc" : "#e68900")};
  }
`;

const ConvertButton = styled.button`
  padding: 10px 15px;
  background: #4CAF50; /* Green color */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  font-weight: bold;
  &:hover {
    background: #388E3C; /* Darker green on hover */
  }
`;

const OriginalButton = styled.button`
  padding: 10px 15px;
  background:#4caf50; /* Blue color */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  font-weight: bold;
  &:hover {
    background:#409944; /* Darker blue on hover */
  }
`;

function Recipe() {
  const { id } = useParams();
  const recipe = recipes.find((recipe) => recipe.id === parseInt(id));

  const [stepIndex, setStepIndex] = useState(0);
  const [convertedInstructions, setConvertedInstructions] = useState(null);
  const [showOriginal, setShowOriginal] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 

  const handleConvertClick = async () => {
    setIsLoading(true); 
    setConvertedInstructions(null); 
    setShowOriginal(false); 

    const instructionTexts = recipe.instructions;
    const convertedTexts = [];

    try {
      for (const instruction of instructionTexts) {
        const response = await axios.post('http://localhost:4000/api/convert-instruction', {
          instruction,
        });
        convertedTexts.push(response.data.convertedInstruction);
      }
      setConvertedInstructions(convertedTexts);
    } catch (error) {
      console.error('Error converting instruction:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!recipe) {
    return (
      <Layout>
        <SidebarNav />
        <ContentWrapper>
          <RecipeDetailContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <RecipeName>Recipe not found.</RecipeName>
          </RecipeDetailContainer>
        </ContentWrapper>
      </Layout>
    );
  }

  return (
    <Layout>
      <SidebarNav />
      <ContentWrapper>
        <RecipeDetailContainer
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <RecipeName>{recipe.name}</RecipeName>
          <RecipeImage src={recipe.image} alt={recipe.name} />
          <RecipeDescription>{recipe.description}</RecipeDescription>

          <SectionHeading>Ingredients</SectionHeading>
          <List>
            {recipe.ingredients.map((ingredient, index) => (
              <ListItem key={index}> {ingredient}</ListItem>
            ))}
          </List>

          <SectionHeading>Instructions</SectionHeading>
          <StepContainer
            key={stepIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <StepText>
              {isLoading ? (
                "Loading..." 
              ) : showOriginal ? (
                recipe.instructions[stepIndex] 
              ) : convertedInstructions && convertedInstructions[stepIndex] ? (
                convertedInstructions[stepIndex].toLowerCase().includes("cannot accurately convert") ? (
                  "Conversion not possible for this instruction."
                ) : (
                  convertedInstructions[stepIndex]
                )
              ) : (
                recipe.instructions[stepIndex]
              )}
            </StepText>
          </StepContainer>

          <ButtonGroup>
            <NavButton
              onClick={() => setStepIndex((prev) => prev - 1)}
              disabled={stepIndex === 0}
            >
              Previous
            </NavButton>
            <ConvertButton onClick={handleConvertClick} disabled={isLoading}>
              {isLoading ? "Converting..." : "Convert"}
            </ConvertButton>
            <OriginalButton onClick={() => setShowOriginal(!showOriginal)} disabled={isLoading}>
              {showOriginal ? "Show Converted" : "Show Original"}
            </OriginalButton>
            <NavButton
              onClick={() => setStepIndex((prev) => prev + 1)}
              disabled={stepIndex === recipe.instructions.length - 1}
            >
              Next
            </NavButton>
          </ButtonGroup>
        </RecipeDetailContainer>
      </ContentWrapper>
    </Layout>
  );
}

export default Recipe;