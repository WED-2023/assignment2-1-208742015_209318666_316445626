<template>
    <div class="myrecipes-container">
      <RecipePreviewList ref="myrecipes" title="My Recipes" path="users/Recipes" class="MyRecipes"/>
    </div>
</template>
    
<script>
  import RecipePreviewList from '../components/RecipePreviewList.vue'
  export default {
    components: {
        RecipePreviewList,
    }
  };
</script>
    
<style>
  .myrecipes-container {
    display: flex;  
    align-items: center;
    justify-content: center;
    padding-bottom: 30px;
  }
</style>