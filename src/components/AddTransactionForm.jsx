import React, { useState } from "react";

function AddTransactionForm({ postTransaction }) {
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    category: "",
    amount: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    postTransaction(formData);
    setFormData({
      date: "",
      description: "",
      category: "",
      amount: "",
    });
  }

  return (
    <form className="ui form segment" onSubmit={handleSubmit}>
      <div className="inline fields">
        <div className="field">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            name="description"
            type="text"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="category">Category</label>
          <input
            id="category"
            name="category"
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <button type="submit" className="ui button primary">
        Add Transaction
      </button>
    </form>
  );
}

export default AddTransactionForm;
