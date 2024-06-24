<template>
    <div class="recipe-list">
      <h1>Recipes</h1>
      <div class="recipe-cards">
        <div v-for="recipe in recipes" :key="recipe.recipeId" class="recipe-card">
          <img :src="recipe.image" alt="salad.jpg" class="recipe-image" />
          <div class="recipe-info">
            <h2 class="recipe-title">{{ recipe.name }}</h2>
            <div class="recipe-details">
              <p><strong>Whose Recipe:</strong> {{ recipe.whoseRecipe }}</p>
              <p><strong>When Customarily Prepared:</strong> {{ recipe.customarilyPrepared }}</p>
              <p v-if="recipe.vegeterian">Vegetarian</p>
              <p v-if="recipe.vegan">Vegan</p>
              <p v-if="recipe.gluten">Gluten-Free</p>
              <p>Servings: {{ recipe.portions }}</p>
              <p>Time: {{ recipe.time }} minutes</p>
            </div>
            <h3>Components:</h3>
            <ul class="recipe-components">
              <li v-for="component in recipe.components" :key="component">{{ component }}</li>
            </ul>
            <h3>Method of Preparation:</h3>
            <p class="method-of-preparation">{{ recipe.methodOfPreparation }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
    import salad from "../assets/salad.jpg"
    import pasta from "../assets/pasta.jpg"
    import stirfry from "../assets/stirfry.jpg"
    export default {
      data() {
        return {
          recipes: [
            {
              userId: 1,
              name: "Delicious Salad",
              image: salad,
              vegeterian: true,
              vegan: false,
              gluten: false,
              portions: 4,
              ingredients: "Lettuce, tomatoes, cucumber, dressing",
              instructions: "1. Wash the vegetables. 2. Chop them. 3. Mix with dressing.",
              time: 10,
              recipeId: 101,
              whoseRecipe: "Grandma Mary",
              customarilyPrepared: "On special family gatherings",
              components: ["Lettuce", "Tomatoes", "Cucumber", "Salad Dressing"],
              methodOfPreparation:
                "Wash and chop the vegetables. Mix them together in a large bowl. Add the salad dressing and toss well.",
            },
            {
              userId: 2,
              name: "Pasta Carbonara",
              image: pasta,
              vegeterian: false,
              vegan: false,
              gluten: true,
              portions: 2,
              ingredients: "Pasta, eggs, bacon, cheese",
              instructions: "1. Cook pasta. 2. Fry bacon. 3. Mix pasta with beaten eggs and bacon. 4. Add cheese.",
              time: 20,
              recipeId: 102,
              whoseRecipe: "Aunt Jane",
              customarilyPrepared: "On Sunday family dinners",
              components: ["Pasta", "Eggs", "Bacon", "Cheese"],
              methodOfPreparation:
                "Cook the pasta according to package instructions. Fry bacon until crispy. In a separate bowl, beat eggs and mix with cooked pasta and bacon. Add cheese on top and serve.",
            },
            {
              userId: 3,
              name: "Veggie Stir-Fry",
              image: stirfry,
              vegeterian: true,
              vegan: true,
              gluten: true,
              portions: 3,
              ingredients: "Broccoli, carrots, tofu, soy sauce",
              instructions: "1. Stir-fry veggies and tofu. 2. Add soy sauce. 3. Serve over rice.",
              time: 15,
              recipeId: 103,
              whoseRecipe: "Mom",
              customarilyPrepared: "As a quick weeknight dinner",
              components: ["Broccoli", "Carrots", "Tofu", "Soy Sauce"],
              methodOfPreparation:
                "In a wok or pan, stir-fry the vegetables and tofu until tender. Add soy sauce and mix well. Serve over cooked rice.",
            },
          ],
        };
      },
    };
  </script>
  
  <style>
    /* Recipe List Container */
    .recipe-list {
      padding: 20px;
    }
  
    /* Recipe Cards Container */
    .recipe-cards {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    }
  
    /* Recipe Card Container */
    .recipe-card {
      display: flex;
      flex-direction: column;
      width: 300px;
      border: 1px solid #ccc;
      padding: 10px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: box-shadow 0.3s ease-in-out;
    }
  
    .recipe-card:hover {
      box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
    }
  
    /* Recipe Image */
    .recipe-image {
      max-width: 100%;
      height: 150px;
      object-fit: cover;
      border-radius: 8px;
      margin-bottom: 10px;
    }
  
    /* Recipe Title */
    .recipe-title {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 10px;
    }
  
    /* Recipe Details */
    .recipe-details {
      margin-bottom: 10px;
    }
  
    .recipe-details strong {
      font-weight: bold;
    }
  
    /* Recipe Components */
    .recipe-components {
      margin-bottom: 10px;
    }
  
    .recipe-components li {
      list-style-type: disc;
      margin-left: 20px;
    }
  
    /* Method of Preparation */
    .method-of-preparation {
      margin-bottom: 10px;
    }
  </style>
  