
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Usuario de ejemplo
const users = [
  { id: 1, username: 'admin', password: bcrypt.hashSync('password', 10) }
];

// Handler para la API de login
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Método no permitido
  }

  const { username, password } = req.body;

  // Buscar usuario
  const user = users.find(u => u.username === username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
  }

  // Firmar el JWT
  const token = jwt.sign({ sub: user.id }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });

  return res.status(200).json({ token });
}

<<<<<<< HEAD
=======
export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) return null;
                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (passwordsMatch) return user;
                }

                console.log("Invalid credentials");
                return null
            },
        })
    ],
});
>>>>>>> 7e02d5ce2d1cc05ef92d2318cd13a2a47d2c74c1
