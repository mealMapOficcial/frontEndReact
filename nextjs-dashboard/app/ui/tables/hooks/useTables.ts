import { useState, useEffect } from 'react';
import { Table } from '../../../shared/interfaces/tables';

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
        setError(errorData.message || 'Invalid input');
        return;
      }

      await fetchTables(); // Refrescar la lista de mesas después de crear una nueva
    } catch (err) {
      setError('An error occurred while creating the table.');
    } finally {
      setLoading(false);
    }
  };

  const toggleTableAvailability = async (updatedTable: Table) => {
    try {
      const response = await fetch(`http://localhost:8080/tables/update/${updatedTable.idTable}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTable),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error updating table:', errorData);
        return false;
      }
  
      await fetchTables(); // Refrescar la lista de mesas
      return true;
    } catch (error) {
      console.error('An error occurred while toggling availability:', error);
      return false;
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
      setTables(data);
    } catch (err) {
      setError('An error occurred while fetching tables.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTables(); // Obtener las mesas al montar el componente
  }, []);

  return {
    createTable,
    fetchTables,
    toggleTableAvailability,
    tables,
    error,
    loading,
  };
};

export default useTable;
