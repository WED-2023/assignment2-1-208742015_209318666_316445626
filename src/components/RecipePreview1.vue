<template>
    <div class="card">
      <div class="card_image">
        <img :src="recipe.image || '/path/to/default-image.jpg'" alt="Recipe Image" />
        <label :for="checkboxId" class="custom-checkbox">
          <input type="checkbox" :id="checkboxId" />
          <i ref="starIcon" class="glyphicon glyphicon-star-empty" @click.prevent="markFavorite"></i>
        </label>
      </div>
      <div class="card_content">
        <h2 class="card_title">{{ recipe.title }}</h2>
        <div class="card_text">
          <ul class="recipe-overview">
            <img src="../assets/timer.png" alt="timer icon" />
            {{ recipe.readyInMinutes }} minutes
            <img src="https://static.vecteezy.com/system/resources/previews/000/422/468/original/like-icon-vector-illustration.jpg" alt="like icon" />
            {{ recipe.popularity }} likes
          </ul>
          <ul v-if="recipe.glutenFree">The recipe is gluten free</ul>
          <ul v-if="recipe.vegetarian">The recipe is for vegetarians</ul>
          <ul v-if="recipe.vegan">The recipe is for vegans</ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      recipe: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        checkboxId: 'unique-checkbox-id-' + Math.random().toString(36).substr(2, 9), // Unique checkbox ID
      };
    },
    methods: {
      async markFavorite() {
        const starIconElement = this.$refs.starIcon;
        if (starIconElement.classList.contains('glyphicon-star-empty')) {
          starIconElement.classList.remove('glyphicon-star-empty');
          starIconElement.classList.add('glyphicon-star');
          await this.axios.post("http://localhost:80/users/favorites", {
            recipeId: this.recipe.id,
          });
        } else {
          starIconElement.classList.remove('glyphicon-star');
          starIconElement.classList.add('glyphicon-star-empty');
          await this.axios.delete("http://localhost:80/users/favorites", {
            data: { recipeId: this.recipe.id },
          });
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .card {
    background-color: white;
    border-radius: 0.25rem;
    box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 100%;
    max-width: 300px; /* Limit the card width */
    margin: 10px;
  }
  
  .card_image {
    position: relative;
    width: 100%;
    height: 200px;
  }
  
  .card_image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
  
  .custom-checkbox {
    position: absolute;
    right: 10px;
    top: 10px;
  }
  
  .custom-checkbox .glyphicon {
    font-size: 1.5em;
  }
  
  .card_content {
    padding: 16px;
    text-align: center;
  }
  
  .card_title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .recipe-overview {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
  }
  
  .recipe-overview img {
    width: 20px;
    margin-right: 5px;
  }
  </style>
  