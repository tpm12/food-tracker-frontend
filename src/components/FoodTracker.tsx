import React, { useState, useEffect } from "react";
import { api } from "../api";

const FoodTracker: React.FC = () => {
  const [food, setFood] = useState("");
  const [calories, setCalories] = useState("");
  const [foodEntries, setFoodEntries] = useState<{ id: number; foodName: string; calories: number }[]>([]);

  // Fetch existing food entries from the backend
  useEffect(() => {
    api.get("/food/1") // Assuming user ID is 1 (Replace this with dynamic user ID later)
      .then(response => setFoodEntries(response.data))
      .catch(error => console.error("Error fetching food entries:", error));
  }, []);

  const handleAddFood = () => {
    if (food && calories) {
      const newEntry = {
        user: { id: 1 }, // Replace with dynamic user ID later
        foodName: food,
        calories: parseFloat(calories),
      };

      api.post("/food", newEntry)
        .then(response => {
          setFoodEntries([...foodEntries, response.data]);
          setFood("");
          setCalories("");
        })
        .catch(error => console.error("Error adding food:", error));
    }
  };

  return (
    <div>
      <h2>Food Tracker</h2>
      <input type="text" placeholder="Food Name" value={food} onChange={(e) => setFood(e.target.value)} />
      <input type="number" placeholder="Calories" value={calories} onChange={(e) => setCalories(e.target.value)} />
      <button onClick={handleAddFood}>Add Food</button>

      <ul>
        {foodEntries.map((entry) => (
          <li key={entry.id}>
            {entry.foodName} - {entry.calories} kcal
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodTracker;
