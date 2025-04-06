const recipes = [
    {
      id: 1,
      name: 'Spaghetti Carbonara',
      image: 'https://th.bing.com/th?id=OSK.151e8ecece0473ecb774609c3ae639fe&w=194&h=129&rs=2&qlt=80&o=6&cdv=1&dpr=1.3&pid=16.1',
      description: 'A classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.',
      ingredients: ['200g Spaghetti', '2 Eggs', '100g Pancetta', '50g Parmesan Cheese', '1 tsp Black Pepper'],
      instructions: [
        'Boil water in a large pot and add a pinch of salt.',
        'Cook 200g spaghetti according to the package instructions until al dente, then drain and save 1/2 cup of pasta water.',
        'In a bowl, whisk together 2 eggs and 50g grated Parmesan cheese until smooth.',
        'Heat a pan over medium heat and add 100g diced pancetta. Cook until crispy.',
        'Reduce heat to low and add the drained pasta to the pan with pancetta. Stir well.',
        'Slowly add the egg and cheese mixture while tossing the pasta quickly to avoid scrambling the eggs.',
        'Add a little reserved pasta water to create a creamy sauce.',
        'Season with 1 tsp black pepper and mix well before serving.'
      ]
    },
    {
      id: 2,
      name: 'Chicken Stir-Fry',
      image: 'https://th.bing.com/th?id=OSK.1c1b4216b127c8aa28655594fe059274&w=194&h=145&rs=2&qlt=80&o=6&cdv=1&dpr=1.3&pid=16.1',
      description: 'A quick and easy stir-fry with chicken, vegetables, and a savory sauce.',
      ingredients: ['200g Chicken Breast', '1 cup Broccoli', '1/2 cup Carrots', '2 tbsp Soy Sauce', '1 tsp Ginger (grated)'],
      instructions: [
        'Cut 200g chicken breast into thin strips.',
        'Heat a wok or pan over high heat and add 1 tbsp oil.',
        'Add the chicken strips and cook for 4-5 minutes until golden brown.',
        'Remove chicken and set aside.',
        'In the same pan, add 1 cup broccoli and 1/2 cup sliced carrots.',
        'Stir-fry for 2-3 minutes, then add 1 tsp grated ginger.',
        'Return the cooked chicken to the pan and pour in 2 tbsp soy sauce.',
        'Mix well and stir-fry for another 2 minutes before serving hot.'
      ]
    },
    {
      id: 3,
      name: 'Chocolate Chip Cookies',
      image: 'https://th.bing.com/th?id=OSK.598c5b2b7b65082004e599cc520830a2&w=194&h=194&rs=2&qlt=80&o=6&cdv=1&dpr=1.3&pid=16.1',
      description: 'A timeless favorite: soft, chewy chocolate chip cookies.',
      ingredients: ['250g Flour', '150g Sugar', '100g Butter', '100g Chocolate Chips', '1 tsp Vanilla Extract'],
      instructions: [
        'Preheat oven to 180°C (350°F).',
        'In a bowl, cream together 100g softened butter and 150g sugar until light and fluffy.',
        'Add 1 egg and 1 tsp vanilla extract, then mix well.',
        'Slowly mix in 250g flour until a dough forms.',
        'Fold in 100g chocolate chips and mix gently.',
        'Scoop small portions onto a baking sheet lined with parchment paper.',
        'Bake for 10-12 minutes until golden brown.',
        'Let cool for 5 minutes before serving.'
      ]
    },
    {
      id: 4,
      name: 'Margherita Pizza',
      image: 'https://cdn.loveandlemons.com/wp-content/uploads/2019/09/margherita-pizza-1080x1080.jpg',
      description: 'A simple yet delicious pizza topped with fresh tomatoes, mozzarella, and basil.',
      ingredients: ['1 Pizza Dough', '1/2 cup Tomato Sauce', '100g Mozzarella Cheese', 'Fresh Basil Leaves', '1 tbsp Olive Oil'],
      instructions: [
        'Preheat oven to 220°C (425°F).',
        'Roll out the pizza dough on a floured surface to your desired thickness.',
        'Spread 1/2 cup tomato sauce evenly over the dough.',
        'Tear 100g mozzarella cheese into pieces and scatter over the sauce.',
        'Drizzle 1 tbsp olive oil and bake for 12-15 minutes until the crust is golden brown.',
        'Remove from oven and add fresh basil leaves before serving.'
      ]
    },
    {
      id: 5,
      name: 'Butter Chicken',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-c_Rbr69vPBYlKvxP0nQz6cXlQxPqTp8WCg&s',
      description: 'A rich and creamy Indian dish made with spiced tomato sauce and buttered chicken.',
      ingredients: ['200g Chicken', '3 Tomatoes', '50g Butter', '100ml Cream', '1 tbsp Indian Spices'],
      instructions: [
        'Marinate 200g chicken with 1 tbsp Indian spices and set aside for 30 minutes.',
        'Heat a pan and melt 50g butter, then sauté 3 chopped tomatoes until soft.',
        'Blend the cooked tomatoes into a smooth puree.',
        'In the same pan, cook the marinated chicken until golden brown.',
        'Add the tomato puree and 100ml cream, then simmer for 10 minutes.',
        'Serve with rice or naan.'
      ]
    },
    {
      id: 6,
      name: 'Caesar Salad',
      image: 'https://cdn.loveandlemons.com/wp-content/uploads/2024/12/caesar-salad.jpg',
      description: 'A fresh and crispy salad with romaine lettuce, croutons, Parmesan, and Caesar dressing.',
      ingredients: ['1 Romaine Lettuce', '1/2 cup Croutons', '50g Parmesan Cheese', '3 tbsp Caesar Dressing'],
      instructions: [
        'Wash and chop 1 romaine lettuce into bite-sized pieces.',
        'Add 1/2 cup croutons and 50g grated Parmesan cheese.',
        'Drizzle with 3 tbsp Caesar dressing.',
        'Toss everything together and serve immediately.'
      ]
    },
    {
      id: 7,
      name: 'Mango Smoothie',
      image: 'https://www.cubesnjuliennes.com/wp-content/uploads/2021/04/Mango-Smoothie-Recipe.jpg',
      description: 'A refreshing and creamy mango smoothie, perfect for summer.',
      ingredients: ['1 Mango', '200ml Milk', '100g Yogurt', '1 tbsp Honey', '5 Ice Cubes'],
      instructions: [
        'Peel and chop 1 ripe mango into small pieces.',
        'Add 200ml milk, 100g yogurt, 1 tbsp honey, and 5 ice cubes into a blender.',
        'Blend until smooth and creamy.',
        'Pour into a glass and serve chilled.'
      ]
    },
    {
      id: 8,
      name: 'French Toast',
      image: 'https://cdn.loveandlemons.com/wp-content/uploads/2024/08/french-toast-recipe.jpg',
      description: 'A sweet breakfast dish made with bread dipped in eggs and milk, then fried to golden perfection.',
      ingredients: ['2 Slices Bread', '2 Eggs', '100ml Milk', '1 tbsp Sugar', '1/2 tsp Cinnamon'],
      instructions: [
        'In a bowl, whisk together 2 eggs, 100ml milk, 1 tbsp sugar, and 1/2 tsp cinnamon.',
        'Dip 2 slices of bread into the mixture, ensuring both sides are coated.',
        'Heat a pan over medium heat and add a little butter.',
        'Cook each slice for 2-3 minutes per side until golden brown.',
        'Serve with maple syrup or powdered sugar.'
      ]
    },

  
  {
    id: 9,
    name: 'Pancakes',
    image: 'https://bing.com/th?id=OSK.e840a401ab0885f1722d57699b9dd895',
    description: 'Fluffy homemade pancakes perfect for breakfast.',
    ingredients: ['1 cup Flour', '1 tbsp Sugar', '1 tsp Baking Powder', '1 Egg', '3/4 cup Milk', '1 tbsp Butter'],
    instructions: [
      'In a bowl, mix 1 cup flour, 1 tbsp sugar, and 1 tsp baking powder.',
      'In another bowl, whisk 1 egg, 3/4 cup milk, and 1 tbsp melted butter.',
      'Combine the wet and dry ingredients and mix until smooth.',
      'Heat a pan over medium heat and lightly grease with butter.',
      'Pour 1/4 cup batter onto the pan and cook until bubbles form on top.',
      'Flip and cook the other side until golden brown.',
      'Serve with syrup or fresh fruits.'
    ]
  },
  {
    id: 10,
    name: 'Garlic Bread',
    image: 'https://bing.com/th?id=OSK.9b898441e31e150ce2c53a9c07412a03',
    description: 'Crispy and buttery garlic bread with a hint of herbs.',
    ingredients: ['1 Baguette', '50g Butter', '3 Garlic Cloves', '1 tbsp Parsley'],
    instructions: [
      'Preheat oven to 180°C (350°F).',
      'Melt 50g butter and mix with 3 minced garlic cloves and 1 tbsp parsley.',
      'Slice the baguette in half and spread the butter mixture evenly.',
      'Wrap in foil and bake for 10 minutes.',
      'Remove foil and bake for another 5 minutes until crispy.',
      'Serve warm with pasta or soup.'
    ]
  },
  {
    id: 11,
    name: 'Vegetable Soup',
    image: 'https://bing.com/th?id=OSK.99e6ed8db359f65033c999ff63014c7a',
    description: 'A healthy and hearty vegetable soup.',
    ingredients: ['1 Onion', '2 Carrots', '2 Potatoes', '1 cup Green Beans', '4 cups Vegetable Broth'],
    instructions: [
      'Chop 1 onion, 2 carrots, 2 potatoes, and 1 cup green beans.',
      'In a pot, sauté the onion in 1 tbsp oil until soft.',
      'Add the chopped vegetables and cook for 3 minutes.',
      'Pour in 4 cups vegetable broth and bring to a boil.',
      'Reduce heat and simmer for 20 minutes.',
      'Season with salt and pepper and serve hot.'
    ]
  },
  {
    id: 12,
    name: 'Grilled Cheese Sandwich',
    image: 'https://bing.com/th?id=OSK.053fd921cba953b13b850eac54d0ed1e',
    description: 'A crispy grilled cheese sandwich with melted cheese inside.',
    ingredients: ['2 Bread Slices', '50g Cheddar Cheese', '1 tbsp Butter'],
    instructions: [
      'Heat a pan over medium heat.',
      'Butter one side of each bread slice.',
      'Place one slice butter-side down and add 50g cheese on top.',
      'Cover with the second slice, butter-side up.',
      'Cook for 2-3 minutes per side until golden brown and crispy.',
      'Serve hot with soup or on its own.'
    ]
  },
  {
    id: 13,
    name: 'Fruit Salad',
    image: 'https://bing.com/th?id=OSK.2ad51308577f06df5cfd930925a2959c',
    description: 'A refreshing mix of seasonal fruits.',
    ingredients: ['1 Apple', '1 Banana', '1 cup Grapes', '1/2 cup Strawberries', '1 tbsp Honey'],
    instructions: [
      'Wash and chop 1 apple, 1 banana, and 1/2 cup strawberries.',
      'Mix in 1 cup grapes.',
      'Drizzle with 1 tbsp honey and toss gently.',
      'Chill for 15 minutes before serving.'
    ]
  }
  
];


export default recipes;
