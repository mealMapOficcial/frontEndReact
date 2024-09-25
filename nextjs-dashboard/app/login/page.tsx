"use client"
<<<<<<< HEAD
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';

=======

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';

>>>>>>> 7e02d5ce2d1cc05ef92d2318cd13a2a47d2c74c1
export default function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
<<<<<<< HEAD
  /* const router = useRouter(); */
=======
  const router = useRouter();
>>>>>>> 7e02d5ce2d1cc05ef92d2318cd13a2a47d2c74c1

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token); // Guardar el JWT en localStorage
<<<<<<< HEAD
      /* router.push('/dashboard') */; // Redirigir a la página protegida
=======
      router.push('/dashboard'); // Redirigir a la página protegida
>>>>>>> 7e02d5ce2d1cc05ef92d2318cd13a2a47d2c74c1
    } else {
      setError(data.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}


