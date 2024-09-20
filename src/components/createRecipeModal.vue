<template>
  <div class="container">
    <form @submit.prevent="add">
      <div>
        <label for="name">Title:</label>
        <input id="name" type="text" v-model="recipe.name" required>
      </div>
      <div>
        <label for="image">Image:</label>
        <input id="image" type="text" v-model="recipe.image" required>
      </div>
      <div>
        <label for="instructions">Instructions:</label>
        <textarea id="instructions" v-model="recipe.instructions" required></textarea>
      </div>
      <div>
        <label for="ingredients">Ingredients:</label>
        <textarea id="ingredients" v-model="recipe.ingredients" required></textarea>
      </div>
      <div>
        <label for="numOfPortions">Servings:</label>
        <input type="number" id="numOfPortions" min="0" v-model.number="recipe.numOfPortions" required>
      </div>
      <div>
        <label for="time">Ready In Minutes:</label>
        <input type="number" id="time" min="0" v-model.number="recipe.time" required>
      </div>
      <div>
        <label for="vegan">Vegan:</label>
        <input type="checkbox" id="vegan" v-model="recipe.vegan">
      </div>
      <div>
        <label for="vegetarian">Vegetarian:</label>
        <input type="checkbox" id="vegetarian" v-model="recipe.vegetarian">
      </div>
      <div>
        <label for="glutenFree">Gluten Free:</label>
        <input type="checkbox" id="glutenFree" v-model="recipe.glutenFree">
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: {
        name: '',
        image: '',
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        numOfPortions: 0,
        ingredients: '',
        instructions: '',
        time: 0,
      }
    };
  },
  methods: {
    async add() {
      try {
        alert(`Vegeterian: ${this.recipe.vegeterian}\nVegan: ${this.recipe.vegan}\nGluten: ${this.recipe.gluten}`);
        const timeValue = Number(this.recipe.time);
        const response = await this.axios.post(
          // "BahaaR.cs.bgu.ac.il/users/Recipes",
          // "http://BahaaR.cs.bgu.ac.il/users/Recipes",

          "localhost:80/user/Recipes",
          {
            name: this.recipe.name,
            image:this.recipe.image,
            vegeterian: this.recipe.vegeterian === "true" ? 1 : 0,
            vegan: this.recipe.vegan === "true" ? 1 : 0,
            gluten: this.recipe.gluten === "true" ? 1 : 0,
            numOfPortions: this.recipe.numOfPortions,
            ingridiants: this.recipe.ingridiants,
            instructions: this.recipe.instructions,
            time: timeValue
          }
        );
        // Create alert that recipe was added successfully
        alert("Recipe added successfully!");
        this.$emit("formSubmitted");
        // Close the modal when I click on OK
        this.$emit("formSubmitted");

      } catch (err) {
        console.error("Error adding recipe:", err);
        alert("There is a problem with the recipe's data");
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f2f2f2;
  border-radius: 5px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
textarea,
input[type="number"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 10px;
}

input[type="checkbox"] {
  margin-left: 10px;
}

button[type="submit"] {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin: 0 auto;
  display: block;
}

button[type="submit"]:hover {
  background-color: #45a049;
}
</style>
