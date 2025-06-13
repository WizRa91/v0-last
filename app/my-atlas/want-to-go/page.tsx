"use client";

import { useState } from 'react';

export default function WantToGoPage() {
  const [destinations, setDestinations] = useState<string[]>([]);
  const [newDestination, setNewDestination] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDestination(e.target.value);
  };

  const handleAddDestination = () => {
    if (newDestination.trim() !== '') {
      setDestinations([...destinations, newDestination.trim()]);
      setNewDestination('');
    }
  };

  const handleRemoveDestination = (index: number) => {
    const updatedDestinations = [...destinations];
    updatedDestinations.splice(index, 1);
    setDestinations(updatedDestinations);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Want to Go</h1>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Add a destination"
          value={newDestination}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button
          onClick={handleAddDestination}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
        >
          Add
        </button>
      </div>
      <ul>
        {destinations.map((destination, index) => (
          <li key={index} className="mb-2 flex items-center">
            {destination}
            <button
              onClick={() => handleRemoveDestination(index)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
