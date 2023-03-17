import SocketStatus from './socket_status';

interface SocketListener {
  onMessage: (message: any) => void;
  onStatusChange: (status: SocketStatus) => void;
}
export default SocketListener;
