<template>
  <div class="main-page">
    <!-- Loading indicator while the data is being fetched -->
    <div v-if="loading" class="loading-indicator">Loading recipes...</div>
    
    <!-- No recipes found message when the array is empty -->
    <div v-else-if="recipes.length === 0" class="no-recipes">No favorite recipes found.</div>
    
    <!-- Render the list of favorite recipes -->
    <div v-else class="recipe-list">
      <RecipePreview
        v-for="recipe in recipes"
        :key="recipe.id"
        :recipe="recipe"
        @favorite-toggle="toggleFavorite"
      />
    </div>
  </div>
</template>

<script>
import RecipePreview from '../components/RecipePreview1.vue';
import axios from 'axios';

export default {
  components: {
    RecipePreview
  },
  data() {
    return {
      recipes: [],   // Array to store favorite recipes
      loading: false // Loading state to indicate when data is being fetched
    };
  },
  created() {
    // Fetch favorite recipes when the component is created
    this.fetchFavorites();
  },
  methods: {
    // Method to fetch favorite recipes from the API
    async fetchFavorites() {
      this.loading = true; // Set loading to true before the API call
      try {
        const response = await axios.get('http://localhost:80/users/favorites', {
          withCredentials: true
        });
        console.log(response.data);  // Debugging the response structure
        // Flatten the response to extract all recipes
        this.recipes = response.data.flatMap(item => item[0].recipes);
        this.loading = false; // Set loading to false after the data is fetched
      } catch (error) {
        console.error('Error fetching favorite recipes:', error.response || error);
        this.recipes = []; // Handle the error by setting an empty array
        this.loading = false; // Stop loading on error
      }
    },
    
    // Method to toggle the favorite status of a recipe
    toggleFavorite(recipeId) {
      const recipe = this.recipes.find(r => r.id === recipeId);
      if (recipe) {
        recipe.isFavorite = !recipe.isFavorite; // Toggle the favorite status
        
        // Optionally, update the server with the new favorite status
        axios.post(`http://localhost:80/update-favorite`, { id: recipeId, isFavorite: recipe.isFavorite }, {
          withCredentials: true
        }).catch(error => console.error('Error toggling favorite:', error));
      }
    }
  }
}
</script>

<style scoped>
/* Style for the main page container */
.main-page {
  background-color: #f7f7f7;
  padding: 20px;
}

/* Style for the recipe list container */
.recipe-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* Add spacing between the cards */
  justify-content: space-around; /* Evenly space the cards */
  padding: 20px;
}

/* Center the loading indicator */
.loading-indicator, .no-recipes {
  text-align: center;
  margin-top: 20px;
  font-size: 1.2em;
  color: #777;
}

/* Style for individual recipe items */
.recipe-item {
  flex: 0 0 auto;
  scroll-snap-align: start;
  margin-right: 20px;
}
</style>
