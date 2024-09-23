// hooks/useSocket.ts
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const useSocket = (url: string) => {

  const [data, setData] = useState<any>(null);
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {

    const newSocket = io(url);

    console.log(newSocket);
    setSocket(newSocket);

    newSocket.on('message', (dishes: any) => {
      setData(dishes);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [url]);

  return { data, socket };
};

export default useSocket;
