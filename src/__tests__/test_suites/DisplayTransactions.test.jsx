import { render, screen } from '@testing-library/react'
import App from "../../components/App";

describe('Display Transactions', () => {
  it('displays transactions on startup', async () => {
    const mockTransactions = [
      {
        id: 1,
        date: '2025-06-11',
        description: 'Coffee',
        category: 'Food',
        amount: 3.5,
      },
      {
        id: 2,
        date: '2025-06-10',
        description: 'Rent',
        category: 'Housing',
        amount: 1000.0,
      },
    ]

    setFetchResponse(mockTransactions)

    render(<App />)

    for (const tx of mockTransactions) {
      expect(await screen.findByText(tx.description)).toBeInTheDocument()
      expect(await screen.findByText(tx.category)).toBeInTheDocument()
      expect(await screen.findByText(tx.amount.toString())).toBeInTheDocument()
    }
  })
})
