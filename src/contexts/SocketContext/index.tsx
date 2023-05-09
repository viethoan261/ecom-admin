import React, { ReactElement, useRef, useState } from 'react';
import { SocketConfig } from '../../config/socket';
import { Order } from '../../types/models/order';

interface SocketContextProps {
  connectWs: () => void;
  closeWs: () => void;
  wsState: string;
  message: Order | null;
}

const SocketContext = React.createContext<SocketContextProps>({
  connectWs: () => {},
  closeWs: () => {},
  wsState: 'NOT_CONNECTED',
  message: {},
});

const SocketConsumer = SocketContext.Consumer;

interface Props {
  children: ReactElement;
}

const SocketProvider: React.FC<Props> = ({ children }) => {
  const [wsState, setWsState] = useState<string>('NOT_CONNECTED');
  const [message, setMessage] = useState<Order | null>(null);

  const wsRef = useRef<WebSocket>();

  const connectWs = () => {
    setWsState('CONNECTING');

    wsRef.current = new WebSocket(SocketConfig.wsUrl);

    wsRef.current.onopen = () => {
      console.log('socket open');
      setWsState('OPENED');
    };

    wsRef.current.onmessage = (e: MessageEvent) => {
      setMessage(JSON.parse(e.data));
      console.log(e.data);
    };

    wsRef.current.onclose = () => {
      console.log('socket closed by server');
      setWsState('CLOSED');
    };
  };

  const closeWs = () => {
    wsRef.current?.close();
    console.log('socket closed by client');
    setWsState('CLOSED');
  };

  return <SocketContext.Provider value={{ connectWs, closeWs, wsState, message }}>{children}</SocketContext.Provider>;
};

export { SocketContext, SocketConsumer, SocketProvider };
