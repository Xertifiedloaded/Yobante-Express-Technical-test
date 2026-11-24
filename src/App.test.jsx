import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { App } from './main.jsx';

describe('Parcel tracker dashboard', () => {
  it('shows the three mock parcels by default', () => {
    render(<App />);
    expect(screen.getByText('Wireless headphones')).toBeInTheDocument();
    expect(screen.getByText('Everyday essentials')).toBeInTheDocument();
    expect(screen.getByText('Sneakers · White / 42')).toBeInTheDocument();
  });

  it('filters parcels by status', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Out for delivery' }));
    expect(screen.getByText('Everyday essentials')).toBeInTheDocument();
    expect(screen.queryByText('Wireless headphones')).not.toBeInTheDocument();
    expect(screen.queryByText('Sneakers · White / 42')).not.toBeInTheDocument();
  });

  it('searches parcels and shows the empty state when there are no matches', () => {
    render(<App />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Search parcels' }), {
      target: { value: 'SoundHaus' },
    });
    expect(screen.getByText('Wireless headphones')).toBeInTheDocument();
    expect(screen.queryByText('Everyday essentials')).not.toBeInTheDocument();

    fireEvent.change(screen.getByRole('textbox', { name: 'Search parcels' }), {
      target: { value: 'no matching parcel' },
    });
    expect(screen.getByText('No parcels found')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /clear search & filters/i })).toBeInTheDocument();
  });


  it('opens parcel details and closes the modal', () => {
    render(<App />);
    const parcelCard = screen.getByText('Wireless headphones').closest('article');
    fireEvent.click(within(parcelCard).getByRole('button', { name: /details/i }));
    expect(screen.getByText('PARCEL DETAILS')).toBeInTheDocument();
    expect(screen.getByText('YE-8042-1190')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByText('PARCEL DETAILS')).not.toBeInTheDocument();
  });
});
