'use client';
import AddUserModal from '@/app/ui/admin/components/AddUserModal';
import { useState } from 'react';
const AdminPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUserAdded = (user: any) => {
    console.log('User added:', user);
    // Aquí puedes actualizar tu estado o hacer cualquier acción adicional
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
        Add User
      </button>

      {isModalOpen && (
        <AddUserModal onClose={() => setIsModalOpen(false)} onUserAdded={handleUserAdded} />
      )}
    </div>
  );
};

export default AdminPage;
