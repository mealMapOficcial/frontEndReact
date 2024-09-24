import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const useSocket = (url: string) => {
  const [data, setData] = useState<any>(null);
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const newSocket = io(url);
  
    newSocket.on('connect', () => {
      console.log('Conectado al socket');
      // Enviar un mensaje al servidor
      const clientMessage = { name: "jhonatna", apellido: "campiño" };
      newSocket.emit("message", clientMessage);
    });
  
    newSocket.on('response', (data) => {
      console.log('Respuesta recibida:', data);
      setData(data);
    });
  
    return () => {
      newSocket.disconnect();
    };
  }, [url]);
  
  return { data, socket };
};

export default useSocket;
