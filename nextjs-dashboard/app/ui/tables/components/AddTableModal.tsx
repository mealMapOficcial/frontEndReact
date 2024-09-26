'use client';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useTable from '../hooks/useTables';

interface AddTableModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTableModal: React.FC<AddTableModalProps> = ({ isOpen, onClose }) => {
  const { createTable, error, loading } = useTable();
  const [newTable, setNewTable] = useState<{
    idTable: number;
    numberOfChairs: number;
    disponibility: boolean;
    floor: number;
    available: boolean; // Agrega la propiedad available aquí
  }>({
    idTable: 0,
    numberOfChairs: 0,
    disponibility: true,
    floor: 0, // Cambiar según la lógica de tu aplicación
    available: true, // Inicializa como true o false según tu lógica
  });

  const handleSubmit = async () => {
    if (newTable.idTable <= 0 || newTable.numberOfChairs <= 0 || newTable.floor < 0) {
      Swal.fire('Error', 'Please provide valid table details.', 'error');
      return;
    }

    await createTable(newTable); // Llama a la función del hook

    if (!error) {
      Swal.fire('Success', 'Table added successfully!', 'success');
      setNewTable({ idTable: 0, numberOfChairs: 0, disponibility: true, floor: 0, available: true });
      onClose();
    } else {
      Swal.fire('Error', error, 'error');
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">Add Table</h2>
        <input
          type="number"
          placeholder="Table ID"
          value={newTable.idTable}
          onChange={(e) => setNewTable({ ...newTable, idTable: parseInt(e.target.value) })}
          className="border rounded w-full py-2 px-3 mb-4"
        />
        <input
          type="number"
          placeholder="Number of Chairs"
          value={newTable.numberOfChairs}
          onChange={(e) => setNewTable({ ...newTable, numberOfChairs: parseInt(e.target.value) })}
          className="border rounded w-full py-2 px-3 mb-4"
        />
        <input
          type="number"
          placeholder="Floor"
          value={newTable.floor}
          onChange={(e) => setNewTable({ ...newTable, floor: parseInt(e.target.value) })}
          className="border rounded w-full py-2 px-3 mb-4"
        />
        <button 
          onClick={handleSubmit} 
          disabled={loading} 
          className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Adding...' : 'Add Table'}
        </button>
        <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Close
        </button>
      </div>
    </div>
  ) : null;
};

export default AddTableModal;
