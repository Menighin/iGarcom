let socket = null;

export default class StoreSocket {

    static setup(io) {
        socket = io.of('/storeSocket');
    }

    static orderReceived(order) {
        socket.emit('orderReceived', order);
        
    }
}