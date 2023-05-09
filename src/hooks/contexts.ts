import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { SocketContext } from '../contexts/SocketContext';
import { StatisticsContext } from '../contexts/StatisticsContext';

export function useAuthContext() {
  return useContext(AuthContext);
}

export function useSocketContext() {
  return useContext(SocketContext);
}

export function useStatisticsContext() {
  return useContext(StatisticsContext);
}
