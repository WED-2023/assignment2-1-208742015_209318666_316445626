<template>
  <div class="search-container">
    <h1 class="title">Recipe Search</h1>
    <form method="dialog">
      <div class="form-section">
        <b-row class="mb-3">
          <b-col>
            <label for="search-input" class="form-label">Search Recipes</label>
            <input id="search-input" type="text" v-model="input" class="form-control" placeholder="Search..." />
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col>
            <label for="cuisine-select" class="form-label">Select Cuisine</label>
            <select id="cuisine-select" v-model="selectedCuisine" class="form-control">
              <option value="" disabled>Select Cuisine</option>
              <option v-for="item in cuisinesOptions" :key="item" :value="item">{{ item }}</option>
            </select>
          </b-col>
          <b-col>
            <label for="diet-select" class="form-label">Select Diet</label>
            <select id="diet-select" v-model="selectedDiet" class="form-control">
              <option value="" disabled>Select Diet</option>
              <option v-for="item in dietOptions" :key="item" :value="item">{{ item }}</option>
            </select>
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col>
            <label for="intolerance-select" class="form-label">Select Intolerance</label>
            <select id="intolerance-select" v-model="selectedIntolerances" class="form-control">
              <option value="" disabled>Select Intolerance</option>
              <option v-for="item in intolerancesOtions" :key="item" :value="item">{{ item }}</option>
            </select>
          </b-col>
          <b-col>
            <label for="limit-select" class="form-label">Select Limit</label>
            <select id="limit-select" v-model="limit" class="form-control">
              <option value="" disabled>Select Limit</option>
              <option v-for="item in limitOptions" :key="item" :value="item">{{ item }}</option>
            </select>
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col>
            <label for="sort-select" class="form-label">Sort By</label>
            <select id="sort-select" v-model="sort" class="form-control">
              <option value="" disabled>Select Sort</option>
              <option v-for="item in sortOptions" :key="item" :value="item">{{ item }}</option>
            </select>
          </b-col>
        </b-row>
        <b-row class="mt-4">
          <b-col></b-col>
          <b-col class="text-center">
            <b-button @click="onSearch" class="btn btn-primary">Search</b-button>
          </b-col>
          <b-col></b-col>
        </b-row>
      </div>
    </form>
    <RecipePreviewList v-if="show" title="Results" :path="uri" :sort="sort" class="recipes"/>
  </div>
</template>

<script>
import RecipePreviewList from '../components/RecipePreviewList.vue'; 
import { cuisinesOptions, dietOptions, intolerancesOtions } from '../assets/search-filter.js';

export default {
  components: {
    RecipePreviewList
  },
  data() {
    return {
      show: false,
      input: '',
      selectedCuisine: '',
      cuisinesOptions: cuisinesOptions,
      selectedDiet: '',
      dietOptions: dietOptions,
      selectedIntolerances: '',
      intolerancesOtions: intolerancesOtions,
      limit: '5',
      limitOptions: [5, 10, 15],
      uri: '',
      sortOptions: ['By popularity', 'By time'],
      sort: ''
    };
  },
  methods: {
    onSearch() {
      if (this.input) {
        this.show = true;
      }
      const params = {
        key: this.input,
        limit: this.limit,
        cuisine: this.selectedCuisine,
        diet: this.selectedDiet,
        intolerances: this.selectedIntolerances,
        sort: this.sort
      };
      const queryString = Object.keys(params)
        .filter(key => params[key] !== "")
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join("&");
      this.uri = `recipes/search?${queryString}`;
    }
  }
};
</script>

<style scoped>
.search-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px;
  background-color: #ffffff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.title {
  text-align: center;
  color: #007bff;
  margin-bottom: 30px;
}

.form-section {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);
}

.form-label {
  font-weight: bold;
  color: #5a6268;
  margin-bottom: 5px;
}

.form-control {
  width: 100%;
}

.mb-3 {
  margin-bottom: 1.5rem;
}

.mt-4 {
  margin-top: 1.5rem;
}

.text-center {
  text-align: center;
}

.btn-primary {
  background-color: #007bff;
  border: none;
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: #0056b3;
}

/* Responsive Design */
@media (max-width: 768px) {
  .search-container {
    padding: 20px;
  }

  .title {
    font-size: 1.8em;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 1.5em;
  }

  .form-label {
    font-size: 0.9em;
  }
}
</style>
