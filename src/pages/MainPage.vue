<template>
  <div class="main-page">
 
    <div class="container">
      <h1 class="title">Main Page</h1>
      <div class="content-container">
        <div class="blurred-content">
          <div class="recipe-list-container">
            <RecipePreviewList ref="RecipePreviewList" title="Explore these Recipes" class="recipe-list" path="recipes/random" />
            <RecipePreviewList
              title="Last Viewed Recipes"
              path="users/lastWatched"
              :class="{
                'recipe-list': true,
                'blur': !$root.store.username,
              }"
              disabled
            />
          </div>
          <button type="submit" @click="updateRecipes" class="btn-more-recipes">More Recipes</button>
        </div>
        <LoginPage v-if="!$root.store.username"></LoginPage>
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import LoginPage from "./LoginPage.vue";
import NavBar from "../components/NavBar.vue";

export default {
  components: {
    RecipePreviewList,
    LoginPage,
    NavBar,
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined
      },
      recipes: [],
    };
  },
  methods: {
    async updateRecipes() {
      this.$refs.RecipePreviewList.updateRecipes();
    }
  }
};
</script>

<style lang="scss" scoped>
.main-page {
  background-color: #f7f7f7;
}

.container {
  min-height: 400px;
  padding: 20px;
}

.title {
  font-size: 2.5em;
  color: #34495e;
  text-align: center;
  margin-bottom: 20px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.blurred-content {
  width: 100%;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

.recipe-list-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.recipe-list {
  width: 45%;
}

.blur {
  filter: blur(5px);
}

.btn-more-recipes {
  display: block;
  margin: 20px auto 0;
  padding: 10px 20px;
  background-color: #27ae60;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-more-recipes:hover {
  background-color: #2ecc71;
}

@media (max-width: 768px) {
  .recipe-list {
    width: 100%;
  }
}
</style>
