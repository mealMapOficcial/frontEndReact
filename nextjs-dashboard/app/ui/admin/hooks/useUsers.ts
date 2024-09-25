import { useState } from 'react';

interface User {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'client' | 'owner';
}

const useUsers = () => {
  const [error, setError] = useState<string | null>(null);

  const addUser = async (user: User) => {
    try {
      const response = await fetch('http://localhost:8080/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Failed to create user');
      }

      const data = await response.json();
      return data; // Retorna el usuario creado
    } catch (err) {
      setError(err.message);
      throw err; // Vuelve a lanzar el error para manejo adicional si es necesario
    }
  };

  return { addUser, error };
};

export default useUsers;
