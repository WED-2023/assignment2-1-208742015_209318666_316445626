<template>
    <div class="recipe-preparation">
      <h1>{{ recipe.title }}</h1>
      <img :src="recipe.image" alt="Image of the recipe" class="recipe-image">
      <h2>Ingredients</h2>
      <ul>
        <li v-for="ingredient in adjustedIngredients" :key="ingredient.id">
          {{ ingredient.amount }} {{ ingredient.name }}
        </li>
      </ul>
      <h2>Preparation Steps</h2>
      <ol>
        <li v-for="(step, index) in recipe.steps" :key="index">
          {{ step.description }}
          <input type="checkbox" :id="'step-' + index" v-model="step.completed" @change="updateProgress">
          <label :for="'step-' + index">Completed</label>
        </li>
      </ol>
      <div>
        <b-progress :value="progress" max="100" class="my-3 progress-bar">
          <b-progress-bar :value="progress">{{ progress }}%</b-progress-bar>
        </b-progress>
      </div>
      <div>
        <label for="servings">Number of servings:</label>
        <input type="number" id="servings" v-model="servings" @change="updateIngredients">
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        recipe: {
          title: '',
          image: '',
          ingredients: [],
          steps: []
        },
        servings: 4,
        originalServings: 4,
        progress: 0
      };
    },
    computed: {
      adjustedIngredients() {
        return this.recipe.ingredients.map(ingredient => {
          const amount = parseFloat(ingredient.amount);
          if (!isNaN(amount)) {
            const adjustedAmount = (amount / this.originalServings) * this.servings;
            return { ...ingredient, amount: adjustedAmount.toFixed(2) };
          }
          return ingredient;
        });
      }
    },
    async created() {
      const apiKey = '92aaadff300d44c5a15eefa56975fb95';  // Replace 'YOUR_API_KEY' with your actual Spoonacular API key
      const recipeId = 324694;  // The recipe ID for which you want to fetch data
      try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=${apiKey}`);
        if (response.data && response.data.length > 0) {
          const instructionsData = response.data[0].steps;
          const steps = instructionsData.map((step, index) => ({
            description: step.step,
            completed: false,
            ingredients: step.ingredients.map(ingredient => ({
              id: ingredient.id,
              name: ingredient.name,
              amount: ingredient.amount // Assuming API provides an amount here
            })),
            index
          }));
          this.recipe.steps = steps;
          this.recipe.title = 'Loaded from Spoonacular'; // Adjust based on actual data if available
          this.recipe.image = 'path/to/default/image.jpg'; // Adjust based on actual data if available
  
          // Flatten ingredients array from all steps
          this.recipe.ingredients = steps.flatMap(step => step.ingredients);
  
          // Set original servings based on API data if available
          this.originalServings = this.servings; // Update if you have the original servings from API
        }
        this.updateProgress();
      } catch (error) {
        console.error('Failed to fetch recipe data:', error);
      }
    },
    methods: {
      updateIngredients() {
        this.recipe.ingredients.forEach(ingredient => {
          const amount = parseFloat(ingredient.amount);
          if (!isNaN(amount)) {
            ingredient.amount = (amount / this.originalServings * this.servings).toFixed(2);
          }
        });
      },
      updateProgress() {
        const completedSteps = this.recipe.steps.filter(step => step.completed).length;
        const totalSteps = this.recipe.steps.length;
        this.progress = Math.round((completedSteps / totalSteps) * 100);
      }
    }
  };
  </script>
  
  <style scoped>
  .recipe-preparation {
    border: 1px solid #ccc;
    padding: 20px;
    margin-top: 20px;
    background-color: #f8f8f8;
    border-radius: 8px;
  }
  
  .recipe-preparation h1, 
  .recipe-preparation h2 {
    text-align: center;
  }
  
  .recipe-image {
    display: block;
    margin: 0 auto;
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  ul li {
    background: #fff;
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 5px;
    border-radius: 4px;
  }
  
  ol {
    padding-left: 0;
  }
  
  ol li {
    background: #fff;
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 5px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .progress-bar {
    margin-top: 20px;
  }
  
  #servings {
    display: block;
    margin: 10px auto;
    padding: 5px;
    border-radius: 4px;
    border: 1px solid #ddd;
    text-align: center;
  }
  
  button {
    display: block;
    margin: 10px auto;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  