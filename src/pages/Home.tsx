import React from "react";
import FoodTracker from "../components/FoodTracker";
import WaterTracker from "../components/WaterTracker";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Food Tracker</h1>
      <p>Track your daily food and water intake.</p>
      
      <div style={{ display: "flex", gap: "20px" }}>
        <FoodTracker />
        <WaterTracker />
      </div>
    </div>
  );
};

export default Home;
