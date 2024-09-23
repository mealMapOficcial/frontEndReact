'use client';
import React, { useState } from 'react';
import { Floor } from '@/app/shared/interfaces/tables';
import ConfirmationModal from './ConfirmationModal'; // Asegúrate de tener este componente

interface FloorTablesProps {
  floors: Floor[];
}

const FloorTables: React.FC<FloorTablesProps> = ({ floors }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [floorData, setFloorData] = useState<Floor[]>(floors);

  const toggleAvailability = (tableId: string) => {
    setSelectedTable(tableId);
    setModalOpen(true);
  };

  const confirmToggle = () => {
    setFloorData((prev) =>
      prev.map((floor) => ({
        ...floor,
        tables: floor.tables.map((table) =>
          table.id === selectedTable
            ? { ...table, isAvailable: !table.isAvailable }
            : table
        ),
      }))
    );
    setModalOpen(false);
    setSelectedTable(null);
  };

  const cancelToggle = () => {
    setModalOpen(false);
    setSelectedTable(null);
  };

  return (
    <div>
      {floorData.map((floor) => (
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
              {floor.tables.map((table) => (
                <tr key={table.id} className={table.isAvailable ? 'bg-blue-100' : 'bg-red-100'}>
                  <td className="py-2 px-4 border-b">{table.id}</td>
                  <td className="py-2 px-4 border-b">{table.numberOfChairs}</td>
                  <td className="py-2 px-4 border-b">
                    {table.isAvailable ? 'Available' : 'Not Available'}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button onClick={() => toggleAvailability(table.id)} className="bg-yellow-500 text-white px-2 py-1 rounded">
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
    </div>
  );
};

export default FloorTables;
