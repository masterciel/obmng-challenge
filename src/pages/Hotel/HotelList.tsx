import React, { useState, useEffect } from 'react';

import { HotelCard } from './components/HotelCard';
import { Loader } from '../../components/Loader';
import { fetchHotels } from '../../services/apis';
import { type Hotel } from '../../types';

export const HotelList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filterStars, setFilterStars] = useState(0);
  const [hotels, setHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    fetchHotelList(0);
  }, []);

  const fetchHotelList = async (ratings: number) => {
    setIsLoading(true);
    const responseData = await fetchHotels(ratings);
    setIsLoading(false);
    if (!responseData) return;
    setHotels(responseData);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchHotelList(filterStars);
  };

  return (
    <div className="flex flex-col gap-3 items-center py-10">
      <form className="flex gap-1 items-center" onSubmit={handleSubmit}>
        <p className="text-lg font-semibold">Rating:</p>
        <input
          type="number"
          name="filterStars"
          data-testid="test-stars"
          value={filterStars}
          min={0}
          max={5}
          className="px-4 py-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
          onChange={(e) => setFilterStars(+e.target.value)}
        />
        <button
          type="submit"
          data-testid="test-filter-btn"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-none rounded-lg w-full px-5 py-2.5 text-center"
        >
          Filter
        </button>
      </form>
      {isLoading ? (
        <Loader />
      ) : hotels.length !== 0 ? (
        hotels.map((item: Hotel) => (
          <HotelCard key={item.id} hotelItem={item} />
        ))
      ) : (
        <p>No hotels</p>
      )}
    </div>
  );
};
