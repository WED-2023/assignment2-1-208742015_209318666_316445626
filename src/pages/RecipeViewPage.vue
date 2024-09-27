<template>
  <div class="container">
    <!-- Show loader while the recipe is being fetched -->
    <div v-if="!recipe">
      Loading...
    </div>

    <!-- Show recipe details once the recipe is loaded -->
    <div v-else>
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <img :src="recipe.image" class="center" />
        <svg class="star-icon" :class="{ 'liked': recipe.isLiked }" @click="toggleLike(recipe)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="12 2, 19 21, 2 8, 22 8, 5 21"></polygon>
        </svg>
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div>Likes: {{ recipe.aggregateLikes }} likes</div>
              <div>Ready in {{ recipe.readyInMinutes }} minutes.</div>
              <div>Portions for {{ recipe.servings }} people.</div>
              <div v-html="recipe.summary" class="summary"></div>
            </div>
            <div class="ingredients">
              Ingredients:
              <ul>
                <li v-for="(ingredient, index) in recipe.extendedIngredients" :key="index + '_' + ingredient.id">
                  {{ ingredient.amount }} {{ ingredient.unit }} {{ ingredient.name }}
                </li>
              </ul>
            </div>
            <div class="inst">
              Instructions:
              <ol>
                <li v-for="(step, index) in (recipe.instructions ? recipe.instructions.split('.') : [])" :key="index">
                  {{ step.trim() }}
                </li>
              </ol>
            </div>
            <div class="servings">
              <label for="servings">Number of servings:</label>
              <input type="number" id="servings" v-model.number="servings" @change="updateIngredients">
            </div>
            <div>
              <b-progress :value="progress" max="100" class="my-3">{{ progress }}%</b-progress>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: null, // This will hold the single recipe data
      servings: 2,
      originalServings: 2,
      progress: 0,
    };
  },
  async created() {
    // Fetch the recipe when the component is created
    this.updateRecipe();
  },
  methods: {
    async updateRecipe() {
      try {
        // Get recipe ID from the route parameters
        const recipeId = this.$route.params.recipeId;

        // Fetch the recipe from the backend
        const response = await this.axios.get(`http://localhost:80/recipes/${recipeId}`);
        
        // Log response to inspect data
        console.log(response.data);

        // Set the recipe data
        this.recipe = response.data;

        // Store the original number of servings
        this.originalServings = this.recipe.servings;

        // Update ingredients based on servings
        this.markRecipeAsSeen(recipeId);
        this.updateIngredients();
        console.log(recipeId);
        
      } catch (error) {
        console.error('Error fetching recipe:', error.message);
      }
    },
    updateIngredients() {
      // Adjust ingredient amounts based on the number of servings
      if (this.recipe && this.recipe.extendedIngredients) {
        this.recipe.extendedIngredients.forEach(ingredient => {
          const amount = parseFloat(ingredient.amount);
          if (!isNaN(amount)) {
            ingredient.amount = (amount / this.originalServings * this.servings).toFixed(2);
          }
        });
      }
    },
    async markRecipeAsSeen(recipeId) {
      try {
        // Send POST request to mark the recipe as seen
        await this.axios.post('http://localhost:80/users/lastSeen', {
          recipeId: recipeId
        }, {
          withCredentials: true  
        });
        console.log(`Recipe ${recipeId} marked as seen.`);
      } catch (error) {
        console.error('Error marking recipe as seen:', error);
      }
    },

    toggleLike() {
    this.isLiked = !this.isLiked; // Toggle the liked state

    if (this.isLiked) {
      this.sendLike();
    } else {
      this.sendUnlike(); // Optionally handle unlike case
    }
  },

    async sendLike() {
    try {
      const recipeId = this.$route.params.recipeId;

      await this.axios.post('http://localhost:80/users/favorites', {
        recipeId: recipeId
      }, {
        withCredentials: true
      });

      console.log(`Recipe ${recipeId} liked.`);
      // Optionally update the UI to reflect the like
    } catch (error) {
      console.error('Error sending like:', error.message);
    }
  },
  }
};
</script>

<style scoped>
/* Add styles for your recipe view */
.container {
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 10px;
  margin-top: 20px;
}
.wrapper {
  display: flex;
  width: 100%;
  padding: 5px;
  flex-wrap: wrap;
  justify-content: center;
}
.wrapped {
  width: 75%;
}
.star-icon {
  cursor: pointer;
  width: 36px; /* Larger size */
  height: 36px;
  fill: #ccc; /* Default unliked state */
  transition: fill 0.3s, transform 0.3s;
}

.star-icon:hover, .star-icon.liked {
  fill: #ffcc00; /* Gold color when hovered or liked */
  transform: scale(1.5); /* Magnifying effect */
}

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  padding: 5px;
  background-color: rgba(20, 18, 15, 0.827);
}
.recipe-header {
  font-family: Verdana, Tahoma, sans-serif;
  color: white;
  text-align: center;
}
.wrapped {
  font-family: cursive;
  color: white;
}
.mb-3 {
  margin-left: auto;
  margin-right: auto;
}
.ingr {
  display: block;
  margin-left: -10px;
}
.ingr li {
  display: block;
  position: relative;
}
.ingr li:not(:last-child) {
  margin-bottom: 16px;
}
.ingr li:before {
  content: "";
  position: absolute;
  top: 1.2em;
  left: -30px;
  margin-top: -.9em;
  background: white;
  height: 12px;
  width: 12px;
  border-radius: 50%;
}
.container {
  background-color: rgba(228, 140, 40, 0.786);
  border-radius: 25px;
}
.summary >>> a {
  color: rgba(93, 47, 179, 0.767);
}
.servings {
  margin-top: 20px;
}
.servings label {
  margin-right: 10px;
}
.servings input {
  width: 100px;
}
</style>
