import React from 'react';
import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Footer from './Footer';

test('renders footer brand and sections', () => {
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );

  expect(screen.getByRole('link', { name: 'INTERIOR' })).toBeInTheDocument();
  expect(screen.getByText('Quick Links')).toBeInTheDocument();
  expect(screen.getByText('Newsletter')).toBeInTheDocument();
});