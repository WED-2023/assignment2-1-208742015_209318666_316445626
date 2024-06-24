<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row v-if="sortedRecipes.length > 0">
      <b-col v-for="r in sortedRecipes" :key="r.id || r.recipeId" style="flex-basis: 0;flex-grow: 0;max-width: 100%;padding: 40px;">
        <RecipePreview class="recipePreview" :recipe="r.recipe || r" :id="r.id || r.recipeId" />
      </b-col>
    </b-row>
    <div v-else>No recipes found</div>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
import { mockGetRecipesPreview } from "../services/recipes.js";

export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    sort: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.updateRecipes();
  },
  computed: {
    sortedRecipes() {
      let sorted = [...this.recipes];
      if (this.sort === "By time") {
        sorted = sorted.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
      } else if (this.sort === "By popularity") {
        sorted = sorted.sort((a, b) => b.aggregateLikes - a.aggregateLikes);
      }
      return sorted;
    }
  },
  methods: {
    async updateRecipes() {
      try {
        const response = mockGetRecipesPreview(5); // Fetch 5 recipes for example
        let recipes = response.data.recipes;
        this.recipes = recipes;
      } catch (error) {
        console.log(error);
      }
    }
  },
  watch: {
    path() {
      this.updateRecipes();
    },
    sort() {
      // Trigger recomputation of sorted recipes when sort changes
      this.recipes = [...this.recipes]; // Trigger reactivity by replacing the array reference
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
