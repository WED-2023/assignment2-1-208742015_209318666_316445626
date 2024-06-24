<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <img :src="recipe.image" class="center" />
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
                <li v-for="(step, index) in recipe.instructions.split('.')" :key="index">
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
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script>
import { mockGetRecipeFullDetails } from "@/services/recipes";

export default {
  data() {
    return {
      recipe: null,
      servings: 2,
      originalServings: 2,
      progress: 0,
    };
  },
  async created() {
    try {
      const response = mockGetRecipeFullDetails(this.$route.params.recipeId);
      const data = response.data.recipe;

      if (!data || !data.extendedIngredients || !Array.isArray(data.extendedIngredients)) {
        throw new Error("Invalid data structure: 'extendedIngredients' is missing or not an array");
      }

      this.recipe = {
        ...data,
        ingredients: data.extendedIngredients.map(ingredient => ({
          id: ingredient.id,
          name: ingredient.name,
          amount: ingredient.amount,
          unit: ingredient.unit
        })),
        instructions: data.instructions || "",
        servings: data.servings
      };

      this.originalServings = data.servings;
      this.updateIngredients();
    } catch (error) {
      console.error('Error fetching recipe data:', error.message);
    }
  },
  methods: {
    updateIngredients() {
      if (this.recipe && this.recipe.extendedIngredients) {
        this.recipe.extendedIngredients.forEach(ingredient => {
          const amount = parseFloat(ingredient.amount);
          if (!isNaN(amount)) {
            ingredient.amount = (amount / this.originalServings * this.servings).toFixed(2);
          }
        });
      }
    },
    updateProgress() {
      if (this.recipe && this.recipe.instructions) {
        const completedSteps = this.recipe.instructions.split('.').filter(step => step.trim().length > 0).length;
        const totalSteps = this.recipe.instructions.split('.').length;
        this.progress = Math.round((completedSteps / totalSteps) * 100);
      }
    }
  },
  watch: {
    servings() {
      this.updateIngredients();
    }
  }
};
</script>

<style scoped>
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
