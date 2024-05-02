const express = require("express");
const app = express();
const workingHoursMiddleware = (req, res, next) => {
  const date = new Date();
  const dayOfWeek = date.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday
  const hour = date.getHours();

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 17) {
    next(); // Continue to the next middleware or route handler
  } else {
    res
      .status(404)
      .send(
        "Sorry, the website is only available during working hours (Monday to Friday, 9 AM to 5 PM)."
      );
  }
};
app.use(workingHoursMiddleware);
// Home page
app.get("/", (req, res) => {
  res.send(
    "<h1>Welcome to the Home Page</h1><p>Feel free to explore our website!</p>"
  );
});

// Our Services page
app.get("/services", (req, res) => {
  res.send(
    "<h1>Our Services</h1><p>Discover the amazing services we offer.</p>"
  );
});

// Contact us page
app.get("/contact", (req, res) => {
  res.send("<h1>Contact Us</h1><p>Get in touch with us for any inquiries.</p>");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
