<template>
    <div class="favorites-container">
      <RecipePreviewList ref="favoriterecipes" title="Favorite Recipes" path="users/favorites" class="FavortiesRecipes"/>
    </div>
</template>
  
<script>
    import RecipePreviewList from '../components/RecipePreviewList.vue'
    export default {
    components: {
        RecipePreviewList
    }
    };
    </script>

<style>
    .favorites-container {
    display: flex;  
    align-items: center;
    justify-content: center;
    padding-bottom: 30px;
    }
</style>