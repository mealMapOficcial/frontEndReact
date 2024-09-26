import { useState, useEffect } from 'react';
import { Table } from "../../../shared/interfaces/tables";

const useTable = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [tables, setTables] = useState<Table[]>([]);

  const createTable = async (newTable: Table) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8080/tables/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTable),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.errors ? errorData.errors.join(', ') : 'Invalid input');
        return;
      }

      await fetchTables(); // Re-fetch tables after creating a new one
    } catch (err) {
      setError('An error occurred while creating the table.');
    } finally {
      setLoading(false);
    }
  };

  const fetchTables = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch('http://localhost:8080/tables/readAll');
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Error fetching tables');
        return;
      }
  
      const data = await response.json();
      console.log(data); // Verifica la estructura de datos
      setTables(data);
    } catch (err) {
      setError('An error occurred while fetching tables.');
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchTables(); // Fetch tables on mount
  }, []);

  return {
    createTable,
    fetchTables,
    tables,
    error,
    loading,
  };
};

export default useTable;
