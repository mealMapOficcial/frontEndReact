import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/'); // Si no hay token, redirigir al login
      return;
    }

    try {
      jwt.verify(token, 'ohI44dqBMFwW82n1B97QzoSTp7ORnHvmQzC04+vBG0U='); // Verificar si el token es válido
      setIsAuthenticated(true);
    } catch (error) {
      localStorage.removeItem('token');
      router.push('/dashboard'); // Si el token es inválido, redirigir al login
    }
  }, []);
}

