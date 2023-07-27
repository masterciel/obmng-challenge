import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { RoomCard } from './components/RoomCard';
import { Loader } from '../../components/Loader';
import { fetchRooms } from '../../services/apis';
import { type Room, type Occupancy } from '../../types';

export const HotelDetail = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [maxAdults, setMaxAdults] = useState(0);
  const [maxChildren, setMaxChildren] = useState(0);
  const { hotelId } = useParams();

  useEffect(() => {
    if (!hotelId) return;
    fetchRoomData(hotelId, { maxAdults, maxChildren });
    // eslint-disable-next-line
  }, [hotelId]);

  const fetchRoomData = async (hotelId: string, filter: Occupancy) => {
    setIsLoading(true);
    const responseData = await fetchRooms(hotelId, filter);
    setIsLoading(false);
    if (!responseData) return;
    setRooms(responseData);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!hotelId) return;
    fetchRoomData(hotelId, { maxAdults, maxChildren });
  };

  return (
    <div className="flex flex-col gap-3 items-center py-10">
      <form className="flex gap-4" onSubmit={handleSubmit}>
        <div className="flex gap-1 items-center">
          <p className="text-lg font-semibold">Max Adults:</p>
          <input
            type="number"
            name="max-adults"
            data-testid="test-max-adults"
            value={maxAdults}
            min={0}
            className="w-24 px-4 py-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
            onChange={(e) => setMaxAdults(+e.target.value)}
          />
        </div>
        <div className="flex gap-1 items-center">
          <p className="text-lg font-semibold">Max Children:</p>
          <input
            type="number"
            name="max-children"
            data-testid="test-max-children"
            value={maxChildren}
            min={0}
            className="w-24 px-4 py-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
            onChange={(e) => setMaxChildren(+e.target.value)}
          />
        </div>
        <button
          type="submit"
          data-testid="test-filter-btn"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-none rounded-lg w-full px-5 py-2.5 text-center"
        >
          Filter
        </button>
        <Link
          to="/"
          data-testid="test-back-btn"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-none rounded-lg w-full px-5 py-2.5 text-center"
        >
          Back
        </Link>
      </form>
      {isLoading ? (
        <Loader />
      ) : rooms.length > 0 ? (
        rooms.map((item: Room) => <RoomCard key={item.id} roomItem={item} />)
      ) : (
        <p>No Rooms</p>
      )}
    </div>
  );
};
