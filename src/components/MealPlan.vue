<template>
    <div class="meal-plan">
      <h1>Meal Plan</h1>
      <ul>
        <li v-for="(recipe, index) in mealPlan" :key="recipe.id">
          <div class="recipe-info">
            <span>{{ index + 1 }}. {{ recipe.title }}</span>
            <b-progress :value="recipe.progress" max="100"></b-progress>
            <button @click="removeRecipe(index)">Remove</button>
          </div>
        </li>
      </ul>
      <button @click="clearMealPlan">Clear Meal Plan</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        mealPlan: []
      };
    },
    methods: {
      removeRecipe(index) {
        this.mealPlan.splice(index, 1);
        this.updateMealPlan();
      },
      clearMealPlan() {
        this.mealPlan = [];
        this.updateMealPlan();
      },
      updateMealPlan() {
        localStorage.setItem('mealPlan', JSON.stringify(this.mealPlan));
        this.$root.$emit('updateMealPlanCount', this.mealPlan.length);
      }
    },
    created() {
      const savedMealPlan = JSON.parse(localStorage.getItem('mealPlan'));
      if (savedMealPlan) {
        this.mealPlan = savedMealPlan;
      }
      this.$root.$on('addToMealPlan', (recipe) => {
        this.mealPlan.push({ ...recipe, progress: 0 });
        this.updateMealPlan();
      });
    }
  };
  </script>
  
  <style scoped>
  .meal-plan {
    padding: 20px;
  }
  .recipe-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  </style>
  