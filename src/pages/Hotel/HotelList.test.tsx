import axios from 'axios';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { fetchHotels } from '../../services/apis';
import { HotelList } from './HotelList';

jest.mock('../../services/apis');

describe('HotelList', () => {
  it('should fetch and render hotels', async () => {
    render(<HotelList />);

    expect(screen.getByText('Rating:')).toBeInTheDocument();
    expect(screen.getByTestId('test-stars')).toBeInTheDocument();

    await waitFor(() => {
      expect(fetchHotels).toHaveBeenCalledTimes(1);
    });
  });

  it("should display 'No hotels' message if there are no hotels", async () => {
    axios.get = jest.fn().mockResolvedValue([]);

    render(<HotelList />);

    await waitFor(() => {
      expect(screen.getByText('No hotels')).toBeInTheDocument();
    });
  });

  it('should fetch filtered hotel data', async () => {
    render(<HotelList />);

    const filterStarsInput = screen.getByTestId('test-stars');
    const filterBtn = screen.getByTestId('test-filter-btn');

    fireEvent.change(filterStarsInput, { target: { value: '4' } });
    fireEvent.click(filterBtn);

    await waitFor(() => {
      expect(fetchHotels).toHaveBeenCalledTimes(2);
    });
  });
});
