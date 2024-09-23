// Ejemplo de servidor WebSocket con socket.io
import { Server } from 'socket.io';

const io = new Server(3000, {
  cors: {
    origin: '*',
  },
});

const dishes = [
  {
    id: 1,
    name: "Bandeja Paisa",
    price: 20000,
    promotion: false,
    typeOfDishes: "AFTERNOON",
    ingredients: [
      { id: 1, name: "chicharron", price: 6000, measure: "lb" },
    ],
  },
  // ... más platos
];

io.on('connection', (socket) => {
  console.log('Client connected');

  // Enviar platos al cliente
  socket.emit('message', dishes);

  socket.on('addToCart', (data) => {
    console.log('Dish added to cart:', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
