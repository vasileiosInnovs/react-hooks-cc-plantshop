import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then(res => res.json())
      .then(setPlants);
  }, []);

  const addPlant = (newPlant) => {
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPlant)
    })
      .then(res => res.json())
      .then(plant => setPlants([...plants, plant]));
  };

  const toggleSoldOut = (id) => {
    const updatedPlants = plants.map(plant => {
      if (plant.id === id) {
        return { ...plant, soldOut: !plant.soldOut };
      }
      return plant;
    });
    setPlants(updatedPlants);
  };

  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={addPlant} />
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <PlantList plants={filteredPlants} onToggleSoldOut={toggleSoldOut} />
    </main>
  );
}

export default PlantPage;