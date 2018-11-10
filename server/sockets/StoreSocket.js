let socket = null;

export default class StoreSocket {

    static setup(io) {
        socket = io.of('/store-socket');
    }

    static orderReceived(order) {
        socket.emit('orderReceived', order);
        
    }
}