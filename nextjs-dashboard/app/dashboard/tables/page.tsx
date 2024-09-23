// pages/tables/page.tsx

import React from 'react';
import { Floor } from '@/app/shared/interfaces/tables'; // Asegúrate de que la ruta sea correcta
import FloorTables from '@/app/ui/tables/components/FloorTables';
const floors: Floor[] = [
  {
    floorNumber: 1,
    tables: [
      { id: '101', numberOfChairs: 4, isAvailable: true },
      { id: '102', numberOfChairs: 2, isAvailable: false },
    ],
  },
  {
    floorNumber: 2,
    tables: [
      { id: '201', numberOfChairs: 4, isAvailable: true },
      { id: '202', numberOfChairs: 2, isAvailable: true },
    ],
  },
  {
    floorNumber: 3,
    tables: [
      { id: '301', numberOfChairs: 6, isAvailable: false },
      { id: '302', numberOfChairs: 4, isAvailable: true },
    ],
  },
];

export default function TablesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-4">Tables Management</h1>
      <FloorTables floors={floors} />
    </div>
  );
}
