<template>
  <div class="about-container">
    <div class="about-header">
      <h1>Welcome</h1>
      <p>We are Bahaa and Diana, third-year students studying Software and Information Systems Engineering.</p>
    </div>

    <div class="about-section">
      <h3>Tasty Recipes</h3>
      <p>
        Foodie Recipes is a platform where you can discover and explore various recipes. We source our recipes from an
        external API called Spoonacular.
      </p>
      <p>
        Whether you are a registered user or a guest, you can search for recipes and apply various filters. Registered
        users have additional features such as creating personal recipes, saving favorites, and viewing personal and
        family recipes.
      </p>
      <p>Each recipe on our site is labeled with dietary information, including options for vegan, vegetarian, and gluten-free diets.</p>
      <p>We hope you enjoy using Foodie Recipes!</p>
    </div>

    <div class="about-section">
      <h3>Personal Websites</h3>
      <p>
        Apart from our collaboration on Tasty Recipes, we have each created individual websites, showcasing our unique styles and creativity.
      </p>
      <p>Bahaa's Website: <a href="https://wed-2023.github.io/assignment1-208742015//" target="_blank">Visit Bahaa's Site</a></p>
      <p>Diana's Website: <a href="https://wed-2023.github.io/209318666/" target="_blank">Visit Diana's Site</a></p>
    </div>

    <div class="about-section">
      <h3>Contact Us</h3>
      <p>Bahaa: <a href="mailto:rayanb@post.bgu.ac.il">rayanb@post.bgu.ac.il</a></p>
      <p>Diana: <a href="mailto:dianaib@post.bgu.ac.il">dianaib@post.bgu.ac.il</a></p>
    </div>
  </div>
</template>

<style scoped>
.about-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px;
  background-color: #f8f9fa;
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

.about-header {
  margin-bottom: 40px;
  color: #5a6268;
  text-align: center;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
}

.about-header h1 {
  font-size: 2.8em;
  margin-bottom: 10px;
  font-weight: bold;
}

.about-header p {
  font-size: 1.2em;
}

.about-section {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #5a6268;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);
}

.about-section h3 {
  color: #007bff;
  margin-bottom: 20px;
  font-size: 1.7em;
  font-weight: bold;
  border-bottom: 2px solid #007bff;
  padding-bottom: 10px;
}

.about-section p {
  line-height: 1.8;
  margin-bottom: 20px;
  font-size: 1.1em;
}

a {
  color: #007bff;
  text-decoration: none;
  transition: color 0.3s, text-shadow 0.3s;
}

a:hover {
  color: #0056b3;
  text-decoration: underline;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .about-container {
    padding: 20px;
  }

  .about-header h1 {
    font-size: 2.2em;
  }

  .about-section h3 {
    font-size: 1.5em;
  }

  .about-section p {
    font-size: 1em;
  }
}

@media (max-width: 480px) {
  .about-header h1 {
    font-size: 1.8em;
  }

  .about-header p {
    font-size: 1em;
  }

  .about-section h3 {
    font-size: 1.3em;
  }

  .about-section p {
    font-size: 0.9em;
  }
}
</style>
