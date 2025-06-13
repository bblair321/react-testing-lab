import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import App from "../../components/App";

describe('Search and Sort Transactions', () => {
  const mockTransactions = [
    { id: 1, date: '2025-06-13', description: 'Zebra', category: 'Misc', amount: 1 },
    { id: 2, date: '2025-06-12', description: 'Apple', category: 'Food', amount: 2 },
    { id: 3, date: '2025-06-11', description: 'Monkey', category: 'Fun', amount: 3 },
  ];

  beforeEach(() => {
    setFetchResponse(mockTransactions);
  });

  it('filters transactions by search input', async () => {
    render(<App />);

    expect(await screen.findByText('Zebra')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText(/search your recent transactions/i), {
      target: { value: 'apple' },
    });

    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.queryByText('Zebra')).not.toBeInTheDocument();
      expect(screen.queryByText('Monkey')).not.toBeInTheDocument();
    });
  });

  it('sorts transactions by description', async () => {
    render(<App />);

    expect(await screen.findByText('Zebra')).toBeInTheDocument();

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'description' },
    });

    await waitFor(() => {
      const rows = screen.getAllByRole('row').slice(1);

      const descriptions = rows.map(row =>
        within(row).getByText(/Zebra|Apple|Monkey/).textContent
      );

      expect(descriptions).toEqual(['Apple', 'Monkey', 'Zebra']);
    });
  });

  it('sorts transactions by category', async () => {
    render(<App />);

    expect(await screen.findByText('Zebra')).toBeInTheDocument();

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'category' },
    });

    await waitFor(() => {
      const rows = screen.getAllByRole('row').slice(1);

      const categories = rows.map(row => {
        const cells = within(row).getAllByRole('cell');
        return cells[2].textContent;
      });

      expect(categories).toEqual(['Food', 'Fun', 'Misc']);
    });
  });
});
