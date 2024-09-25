'use client';

import { useState } from 'react';
import useUsers from '../hooks/useUsers';

interface AddUserModalProps {
  onClose: () => void;
  onUserAdded: (user: any) => void; // Cambia el tipo según la estructura de tu usuario
}

const AddUserModal: React.FC<AddUserModalProps> = ({ onClose, onUserAdded }) => {
  const { addUser, error } = useUsers();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'client' | 'owner'>('admin');

  const handleSubmit = async () => {
    if (!name || !email || !password) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const newUser = await addUser({ name, email, password, role });
      onUserAdded(newUser);
      onClose();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-2">Add User</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded w-full mb-2 p-2"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded w-full mb-2 p-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded w-full mb-2 p-2"
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as 'admin' | 'client' | 'owner')}
          className="border rounded w-full mb-2 p-2"
          required
        >
          <option value="admin">Admin</option>
          <option value="client">Client</option>
          <option value="owner">Owner</option>
        </select>

        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Save User
        </button>
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddUserModal;
