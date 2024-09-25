'use client';
import React, { useState } from 'react';
import { Floor } from '@/app/shared/interfaces/tables';
import ConfirmationModal from './ConfirmationModal';
import AddTableModal from './AddTableModal';
import useTable from '../hooks/useTables';

interface FloorTablesProps {
  floors: Floor[];
}

const FloorTables: React.FC<FloorTablesProps> = ({ floors }) => {
  const { tables, createTable } = useTable();
  const [modalOpen, setModalOpen] = useState(false);
  const [addTableModalOpen, setAddTableModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  
  const toggleAvailability = (tableId: string) => {
    setSelectedTable(tableId);
    setModalOpen(true);
  };

  const confirmToggle = () => {
    // Aquí debes implementar la lógica para cambiar la disponibilidad
    setModalOpen(false);
    setSelectedTable(null);
  };

  const cancelToggle = () => {
    setModalOpen(false);
    setSelectedTable(null);
  };

  const handleAddTable = async (newTable: { idTable: number; numberOfChairs: number; disponibility: boolean; floor: number }) => {
    await createTable(newTable);
    setAddTableModalOpen(false);
  };

  return (
    <div>
      <button onClick={() => setAddTableModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        Add Table
      </button>

      {floors.map((floor) => (
        <div key={floor.floorNumber} className="mb-4">
          <h2 className="text-xl font-bold">Floor {floor.floorNumber}</h2>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border-b">Table ID</th>
                <th className="py-2 px-4 border-b">Chairs</th>
                <th className="py-2 px-4 border-b">Availability</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tables
                .filter((table) => table.floor === floor.floorNumber) // Filtra las mesas por piso
                .map((table) => (
                  <tr key={table.idTable} className={table.available ? 'bg-blue-100' : 'bg-red-100'}>
                    <td className="py-2 px-4 border-b">{table.idTable}</td>
                    <td className="py-2 px-4 border-b">{table.numberOfChairs}</td>
                    <td className="py-2 px-4 border-b">
                      {table.available ? 'Available' : 'Not Available'}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button onClick={() => toggleAvailability(table.idTable.toString())} className="bg-yellow-500 text-white px-2 py-1 rounded">
                        Toggle Availability
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}

      <ConfirmationModal
        isOpen={modalOpen}
        onConfirm={confirmToggle}
        onCancel={cancelToggle}
        message={`Are you sure you want to change the status of table ${selectedTable}?`}
      />

      <AddTableModal
        isOpen={addTableModalOpen}
        onClose={() => setAddTableModalOpen(false)}
        onAddTable={handleAddTable}
      />
    </div>
  );
};

export default FloorTables;
