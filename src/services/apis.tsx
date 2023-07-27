import axios from 'axios';

import { Hotel, Room, Occupancy } from '../types';
import { API_URL } from '../constants';

export const fetchHotels = async (ratings: number) => {
  try {
    const response = await axios.get<Hotel[]>(
      `${API_URL}/hotels?collection-id=OBMNG`
    );
    const responseData = response.data.filter(
      (item: Hotel) => item.starRating >= ratings.toString()
    );
    return responseData;
  } catch (err) {
    console.error('error: ', err);
  }
};

export const fetchRooms = async (hotelId: string, filter: Occupancy) => {
  try {
    const response = await axios.get(`${API_URL}/roomRates/OBMNG/${hotelId}`);
    const responseData = response.data.rooms.filter(
      (room: Room) =>
        room.occupancy.maxAdults >= filter.maxAdults &&
        room.occupancy.maxChildren >= filter.maxChildren
    );
    return responseData;
  } catch (err) {
    console.error('error: ', err);
  }
};
