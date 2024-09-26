'use client';
import React, { useState } from 'react';
import { Floor } from '@/app/shared/interfaces/tables';
import ConfirmationModal from './ConfirmationModal';
import AddTableModal from './AddTableModal';
import useTable from '../hooks/useTables';
import Swal from 'sweetalert2';

interface FloorTablesProps {
  floors: Floor[];
}

const FloorTables: React.FC<FloorTablesProps> = ({ floors }) => {
  const { tables, createTable, fetchTables } = useTable();
  const [modalOpen, setModalOpen] = useState(false);
  const [addTableModalOpen, setAddTableModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [isAvailable, setIsAvailable] = useState<boolean>(true);

  const toggleAvailability = (tableId: string, currentAvailability: boolean) => {
    setSelectedTable(tableId);
    setIsAvailable(!currentAvailability); // Cambiar la disponibilidad
    setModalOpen(true);
  };

  const confirmToggle = async () => {
    if (selectedTable) {
      const result = await Swal.fire({
        title: 'Confirmar',
        text: `¿Estás seguro de que deseas cambiar la disponibilidad de la mesa ${selectedTable}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, cambiar',
        cancelButtonText: 'No, cancelar'
      });

      if (result.isConfirmed) {
        const response = await fetch(`http://localhost:8080/tables/update/${selectedTable}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            numberOfChairs: tables.find(table => table.idTable.toString() === selectedTable)?.numberOfChairs || 0,
            disponibility: isAvailable,
            available: isAvailable,
          }),
        });

        if (response.ok) {
          await fetchTables(); // Actualizar la lista de mesas
          Swal.fire('Actualizado', 'La disponibilidad ha sido actualizada.', 'success');
        } else {
          const errorData = await response.json();
          Swal.fire('Error', `No se pudo actualizar: ${errorData.message}`, 'error');
        }
      }
    }

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
                <th className="py-2 px-4 border-b">Disponibility</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
                {tables
                  .filter((table) => table.floor === floor.floorNumber) // Filtrar mesas por piso
                  .map((table) => (
                    <tr key={table.idTable} className={table.disponibility ? 'bg-blue-100' : 'bg-red-100'}>
                      <td className="py-2 px-4 border-b">{table.idTable}</td>
                      <td className="py-2 px-4 border-b">{table.numberOfChairs}</td>
                      <td className="py-2 px-4 border-b">
                        {table.disponibility ? 'Available' : 'Not Available'}
                      </td>
                      <td className="py-2 px-4 border-b">
                        <button onClick={() => toggleAvailability(table.idTable.toString(), table.disponibility)} className="bg-yellow-500 text-white px-2 py-1 rounded">
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
