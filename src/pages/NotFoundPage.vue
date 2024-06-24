<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <h1 class="not-found-title">404</h1>
      <h2 class="not-found-subtitle">Four Oh Four you didn't</h2>
      <p class="not-found-text">Oops! The page you're looking for doesn't exist.</p>
      <router-link to="/" exact class="home-link">
        <b-button class="home-button">ET Go Home</b-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
  font-family: 'Roboto', sans-serif;
  text-align: center;
}

.not-found-content {
  background: white;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.not-found-title {
  font-size: 96px;
  margin: 0;
  color: #ff6f61;
}

.not-found-subtitle {
  font-size: 24px;
  margin: 0;
  color: #333;
}

.not-found-text {
  margin: 20px 0;
  font-size: 18px;
  color: #666;
}

.home-link {
  text-decoration: none;
}

.home-button {
  background-color: #ff6f61;
  border: none;
  color: white;
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 5px;
  transition: background-color 0.3s;
  cursor: pointer;
}

.home-button:hover {
  background-color: #ff3b2f;
}
</style>
