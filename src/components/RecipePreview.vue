<template>
  <router-link
    :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
    class="recipe-preview"
    style="text-decoration: none; color: #050505;"
  >
    <div class="card">
      <div class="card_image">
        <img :src="recipe.image" alt="Recipe Image" />
        <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet" />
        <label :for="checkboxId" class="custom-checkbox">
          <input type="checkbox" :id="checkboxId" />
          <i ref="starIcon" class="glyphicon glyphicon-star-empty" @click.prevent="markFavorite"></i>
        </label>
      </div>
      <div class="card_content">
        <h2 class="card_title">{{ recipe.title }}</h2>
        <div class="card_text">
          <ul class="recipe-overview">
            <img src="../assets/timer.png" style="width: 35px;" />
            {{ recipe.readyInMinutes }} minutes
            <img src="https://static.vecteezy.com/system/resources/previews/000/422/468/original/like-icon-vector-illustration.jpg" style="width: 35px;" />
            {{ recipe.aggregateLikes }}
          </ul>
          <ul v-if="recipe.glutenFree">The recipe is gluten free</ul>
          <ul v-if="recipe.vegetarian">The recipe is for vegetarians</ul>
          <ul v-if="recipe.vegan">The recipe is for vegans</ul>
          <hr />
          <div v-html="recipe.summary"></div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  mounted() {
    this.axios.get(this.recipe.image).then(() => {
      this.image_load = true;
    });
  },
  data() {
    return {
      image_load: true,
      checkboxId: 'unique-checkbox-id-' + Math.random().toString(36).substr(2, 9), // Generate a unique checkbox id
    };
  },
  methods: {
    async markFavorite() {
      try {
        const starIconElement = this.$refs.starIcon;
        if (starIconElement.classList.contains('glyphicon-star-empty')) {
          starIconElement.classList.remove('glyphicon-star-empty');
          starIconElement.classList.add('glyphicon-star');
          await this.axios.post("http://bahaar.cs.bgu.ac.il//users/favorites", {
            recipeId: this.recipe.id,
          });
        } else {
          starIconElement.classList.remove('glyphicon-star');
          starIconElement.classList.add('glyphicon-star-empty');
          await this.axios.delete("http://bahaar.cs.bgu.ac.il//users/favorites", {
            data: { recipeId: this.recipe.id },
          });
        }
      } catch (err) {
        console.log(err.response);
      }
    },
  },
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

.card_image {
  position: relative;
  max-height: 250px;
}

.card_image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card_price {
  position: absolute;
  bottom: 8px;
  right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  border-radius: 0.25rem;
  background-color: #c89b3f;
  font-size: 18px;
  font-weight: 700;
}

.card_price span {
  font-size: 12px;
  margin-top: -2px;
}

.note {
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 4px 8px;
  border-radius: 0.25rem;
  background-color: #c89b3f;
  font-size: 14px;
  font-weight: 700;
}

@media (min-width: 40rem) {
  .cards_item {
    width: 50%;
  }
}

@media (min-width: 56rem) {
  .cards_item {
    width: 33.3333%;
  }
}

.card {
  background-color: white;
  border-radius: 0.25rem;
  box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 300px;
}

.card_content {
  position: relative;
  padding: 16px 12px 32px 24px;
  margin: 16px 8px 8px 0;
  max-height: 290px;
  overflow-y: scroll;
}

.card_content::-webkit-scrollbar {
  width: 8px;
}

.card_content::-webkit-scrollbar-track {
  box-shadow: 0;
  border-radius: 0;
}

.card_content::-webkit-scrollbar-thumb {
  background: #c89b3f;
  border-radius: 15px;
}

.card_title {
  position: relative;
  margin: 0 0 24px;
  padding-bottom: 10px;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
}

.card_title::after {
  position: absolute;
  display: block;
  width: 50px;
  height: 2px;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #c89b3f;
  content: "";
}

hr {
  margin: 24px auto;
  width: 50px;
  border-top: 2px solid #c89b3f;
}

.card_text p {
  margin: 0 0 24px;
  font-size: 14px;
  line-height: 1.5;
}

.card_text p:last-child {
  margin: 0;
}

.favoriting {
  display: inline-block;
}

.favorite__heart {
  display: inline-block;
  padding: 3px;
  vertical-align: middle;
  line-height: 1;
  font-size: 16px;
  color: #ababab;
  cursor: pointer;
  -webkit-transition: color 0.2s ease-out;
  transition: color 0.2s ease-out;
}

.favorite__heart.is-disabled:hover {
  cursor: default;
}

.favorite__checkbox {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
}

.favorite__heart__selected {
  color: #df470b;
}

label {
  /* Presentation */
  font-size: 48px;
}

/* Required Styling */
label input[type="checkbox"] {
  display: none;
}

.custom-checkbox {
  margin-left: 2em;
  position: relative;
  cursor: pointer;
  width: 30px;
  position: absolute;
  right: -40px;
  top: -18px;
}

.custom-checkbox .glyphicon {
  color: gold;
  position: absolute;
  top: 0.4em;
  left: -1.25em;
  font-size: 0.75em;
}

.custom-checkbox .glyphicon-star-empty {
  color: gray;
}

.custom-checkbox .glyphicon-star {
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

.custom-checkbox:hover .glyphicon-star {
  opacity: 0.5;
}

.custom-checkbox input[type="checkbox"]:checked ~ .glyphicon-star {
  opacity: 1;
}
</style>
