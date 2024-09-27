<template>
    <b-container>
      <h3>
        {{ title }}:
        <slot></slot>
      </h3>
      <b-row v-if="recipes.length > 0">
        <b-col v-for="recipe in recipes" :key="recipe.id" class="recipe-item">
          <RecipePreview :recipe="recipe" />
        </b-col>
      </b-row>
      <div v-else>No recipes found</div>
    </b-container>
  </template>
  
  <script>
  import RecipePreview from "./RecipePreview1.vue";
  import axios from "axios";
  
  export default {
    name: "RecipePreviewList",
    components: {
      RecipePreview,
    },
    props: {
      title: {
        type: String,
        required: true,
      },
      path: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        recipes: [], // Store recipes here
        loading: false,
      };
    },
    mounted() {
      this.fetchRecipes(); // Fetch recipes when the component mounts
    },
    methods: {
      async fetchRecipes() {
        this.loading = true; // Set loading state
        try {
          const response = await axios.get(`http://localhost:80/${this.path}`, { withCredentials: true });
          
          // Flatten the response data to extract all recipes into a single array
          this.recipes = response.data
            .flatMap(item => item[0].recipes); // Adjust the structure as per your response format
  
          this.loading = false; // Set loading to false after the data is fetched
        } catch (error) {
          console.error("Error fetching recipes:", error);
          this.loading = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .recipe-item {
    flex: 0 0 auto;
    scroll-snap-align: start;
    margin-bottom: 20px;
  }
  </style>
  