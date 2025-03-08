import React, { useEffect, useState } from 'react';
import styles from './Expense.module.css';
import sharedStyles from '../styles/sharedStyles.module.css';
import Table from '../component/tables/Table.tsx';
import {capitalizeWords, formatDate} from '../utils/TextFormatting.tsx'

interface Expense {
  id: number;
  date: string;
  amount: number;
  merchant: string;
  category: string;
}

interface ApiResponse {
  currentPage: number;
  totalPages: number;
  next: { page: number; limit: number } | null;
  transactions: Expense[];
}


const fetchExpenses = async (): Promise<ApiResponse> => {
    try {
      const response = await fetch('https://tip-transactions.vercel.app/api/transactions?page=1');
  
      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }
  
      // Parse the JSON data
      const data = await response.json();
      return data;
    } catch (error) {
      // Narrow down the type of the error
      if (error instanceof Error) {
        throw new Error(`Error fetching transactions: ${error.message}`);
      } else {
        throw new Error('An unknown error occurred while fetching transactions.');
      }
    }
};

const Expense: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchExpenses()
      .then((data) => setExpenses(data.transactions))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Date', accessor: 'date' },
    { header: 'Amount', accessor: 'amount' },
    { header: 'Merchant', accessor: 'merchant' },
    { header: 'Category', accessor: 'category' }
  ];

  const formattedData = expenses.map((expense) => ({
    ...expense,
    date: formatDate(expense.date),
    amount: `£${expense.amount.toFixed(2)}`,
    category: capitalizeWords(expense.category)
  }));

  return (
    <div className={styles.container}>
      <h1 className={sharedStyles.title}>Expenses</h1>
      {loading && <p className={sharedStyles.loading}>Loading...</p>}
      {error && <p className={sharedStyles.error}>Error: {error}</p>}
      {!loading && !error && (
        <Table
          columns={columns}
          data={formattedData}
          ariaLabel="List of expenses with columns for ID, Date, Amount, Merchant, and Category"
        />
      )}
    </div>
  );
};

export default Expense;