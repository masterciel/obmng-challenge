import axios from 'axios';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { fetchRooms } from '../../services/apis';
import { HotelDetail } from './HotelDetail';

jest.mock('../../services/apis');

describe('<HotelDetail />', () => {
  it('should render component correctly', async () => {
    render(
      <MemoryRouter initialEntries={['/hotels/OBMNG1']}>
        <Routes>
          <Route path="/hotels/:hotelId" element={<HotelDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('test-max-adults')).toBeInTheDocument();
    expect(screen.getByTestId('test-max-children')).toBeInTheDocument();
    expect(screen.getByTestId('test-filter-btn')).toBeInTheDocument();
    expect(screen.getByTestId('test-back-btn')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText('No Rooms')).toBeNull();
    });
  });

  it("should display 'No Rooms' message if there are no rooms", async () => {
    axios.get = jest.fn().mockResolvedValue([]);

    render(
      <MemoryRouter initialEntries={['/hotels/OBMNG1']}>
        <Routes>
          <Route path="/hotels/:hotelId" element={<HotelDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('No Rooms')).toBeInTheDocument();
    });
  });

  it('should fetch updated room data', async () => {
    render(
      <MemoryRouter initialEntries={['/hotels/OBMNG1']}>
        <Routes>
          <Route path="/hotels/:hotelId" element={<HotelDetail />} />
        </Routes>
      </MemoryRouter>
    );

    const maxAdultsInput = screen.getByTestId('test-max-adults');
    const maxChildrenInput = screen.getByTestId('test-max-children');
    const filterBtn = screen.getByTestId('test-filter-btn');

    fireEvent.change(maxAdultsInput, { target: { value: '2' } });
    fireEvent.change(maxChildrenInput, { target: { value: '1' } });

    fireEvent.click(filterBtn);

    await waitFor(() => {
      expect(fetchRooms).toHaveBeenCalledTimes(2);
    });
  });
});
