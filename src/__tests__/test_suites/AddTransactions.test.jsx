import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from "../../components/App";

describe('Add Transactions', () => {
  beforeEach(() => {
    setFetchResponse([])
  })

  it('adds a new transaction to the frontend', async () => {
    render(<App />)

    fireEvent.change(screen.getByLabelText(/date/i), {
      target: { value: '2025-06-13' },
    })
    fireEvent.change(screen.getByPlaceholderText('Description'), {
      target: { value: 'Book' },
    })
    fireEvent.change(screen.getByPlaceholderText('Category'), {
      target: { value: 'Education' },
    })
    fireEvent.change(screen.getByPlaceholderText('Amount'), {
      target: { value: '25.99' },
    })

    global.fetch = vi.fn((url, options) => {
      if (options?.method === 'POST') {
        return Promise.resolve({
          ok: true,
          status: 201,
          json: () => Promise.resolve({
            id: 1,
            date: '2025-06-13',
            description: 'Book',
            category: 'Education',
            amount: 25.99,
          }),
        })
      } else {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve([]),
        })
      }
    })

    fireEvent.click(screen.getByRole('button', { name: /add transaction/i }))

    await waitFor(() => {
      expect(screen.getByText('Book')).toBeInTheDocument()
      expect(screen.getByText('Education')).toBeInTheDocument()
      expect(screen.getByText('25.99')).toBeInTheDocument()
    })
  })

  it('sends a POST request when form is submitted', async () => {
    render(<App />)

    fireEvent.change(screen.getByLabelText(/date/i), {
      target: { value: '2025-06-12' },
    })
    fireEvent.change(screen.getByPlaceholderText('Description'), {
      target: { value: 'Laptop' },
    })
    fireEvent.change(screen.getByPlaceholderText('Category'), {
      target: { value: 'Work' },
    })
    fireEvent.change(screen.getByPlaceholderText('Amount'), {
      target: { value: '1299.99' },
    })

    const mockFetch = vi.fn((url, options) => {
      if (options?.method === 'POST') {
        expect(JSON.parse(options.body)).toEqual({
          date: '2025-06-12',
          description: 'Laptop',
          category: 'Work',
          amount: '1299.99',
        })

        return Promise.resolve({
          ok: true,
          status: 201,
          json: () => Promise.resolve({
            id: 2,
            date: '2025-06-12',
            description: 'Laptop',
            category: 'Work',
            amount: 1299.99,
          }),
        })
      }

      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve([]),
      })
    })

    global.fetch = mockFetch

    fireEvent.click(screen.getByRole('button', { name: /add transaction/i }))

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalled()
    })
  })
})
