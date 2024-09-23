/* export default function handler(req, res) {
    if (req.method === 'POST') {
      const { email, password } = req.body;
  
      // Aquí se podría agregar lógica para validar el email y password desde una base de datos
      if (email === 'user@example.com' && password === 'password123') {
        // Enviar una respuesta simulada de éxito con un token
        res.status(200).json({ token: 'fake-jwt-token' });
      } else {
        // Respuesta de error si las credenciales son incorrectas
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } */
  