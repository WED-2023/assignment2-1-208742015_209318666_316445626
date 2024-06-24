<template>
    <nav class="navbar">
      <div class="navbar-left">
        <router-link to="/">Vue Recipes</router-link> |
        <router-link to="/search">Search</router-link> |
        <router-link to="/about">About</router-link>
      </div>
      <div class="navbar-right">
        <span v-if="$root.store.username">Welcome, {{ $root.store.username }}</span>
        <span v-else>Guest:</span>
        <router-link v-if="!$root.store.username" to="/login">Login</router-link> |
        <router-link v-if="!$root.store.username" to="/register">Register</router-link>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: "NavBar",
  };
  </script>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #8bc34a;
    padding: 20px;
    font-size: 1.2em;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .navbar-left, .navbar-right {
    display: flex;
    align-items: center;
  }
  
  .navbar a {
    color: #007bff;
    text-decoration: none;
    margin: 0 10px;
    transition: color 0.3s;
  }
  
  .navbar a:hover {
    color: #0056b3;
  }
  
  .navbar-right {
    font-weight: bold;
  }
  
  .navbar-right a {
    margin-left: 10px;
  }
  
  .navbar-right span {
    margin-right: 10px;
  }
  </style>
  