<template>
  <div id="app">
    <div id="nav" class="navbar">
      <div class="nav-links">
        <router-link :to="{ name: 'main' }" class="nav-link">Vue Recipes</router-link>|
        <router-link :to="{ name: 'search' }" class="nav-link">Search</router-link>|
        <router-link :to="{ name: 'about' }" class="nav-link">About</router-link>|
        <span v-if="!$root.store.username" class="guest-info">
          Guest:
          <router-link :to="{ name: 'login' }" class="nav-link">Login</router-link>|
          <router-link :to="{ name: 'register' }" class="nav-link">Register</router-link>|
        </span>
        <span v-else class="user-info">
          {{ $root.store.username }}: <button @click="Logout" class="logout-button">Logout</button>|
          <div class="dropdown">
            <button class="dropbtn">Personal</button>
            <div class="dropdown-content">
              <router-link :to="{ name: 'favorites' }">Favorites</router-link>
              <router-link :to="{ name: 'myrecipes' }">Private</router-link>
              <router-link :to="{ name: 'family' }">La Familia</router-link>
            </div>
          </div>
          <div>
            <b-button @click="showModal=true">New Recipe</b-button>
            <b-modal v-model="showModal">
              <createRecipeModal @formSubmitted="closeModal"></createRecipeModal>
            </b-modal>
          </div>
        </span>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import createRecipeModal from "./components/createRecipeModal.vue";

export default {
  components: {
    createRecipeModal
  },
  name: "App",
  data() {
    return {
      showModal: false
    };
  },
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
    closeModal() {
      this.showModal = false;
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: rgba(22, 146, 80, 0.451);
  min-height: 100vh;
}

.navbar {
  background-color: #4CAF50;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 15px;
}

.nav-link {
  font-weight: bold;
  color: white;
  font-size: 18px;
  text-decoration: none;
}

.nav-link:hover {
  color: #FFD700;
}

.guest-info,
.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logout-button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-weight: bold;
}

.logout-button:hover {
  color: #FFD700;
}

.dropdown {
  display: inline-block;
  position: relative;
}

.dropbtn {
  background-color: transparent;
  color: white;
  font-weight: bold;
  padding: 5px;
  cursor: pointer;
  border: none;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: #2c3e50;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
