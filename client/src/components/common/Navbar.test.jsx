import React from 'react'
import { render, screen } from '@testing-library/react'
import { test, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Navbar from './Navbar'

test('renders navbar brand and navigation links', () => {
  render(
    <MemoryRouter>
      <Navbar toggleTheme={() => {}} isDark={false} />
    </MemoryRouter>
  )

  expect(screen.getByText(/INTERIOR/i)).toBeInTheDocument()
  expect(screen.getAllByText(/Home/i).length).toBeGreaterThan(0)
  expect(screen.getAllByText(/About/i).length).toBeGreaterThan(0)
  expect(screen.getAllByText(/Services/i).length).toBeGreaterThan(0)
  expect(screen.getAllByText(/Contact/i).length).toBeGreaterThan(0)
})