import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { HotelList, HotelDetail } from './pages/Hotel';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HotelList />} />
        <Route path="/:hotelId" element={<HotelDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export { AppRoutes as Routes };
