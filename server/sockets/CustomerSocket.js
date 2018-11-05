let socket = null;

export default class CustomerSocket {

    static setup(io) {
        socket = io.of('/customer-socket');

        socket.on('connection', function() {
            console.log('CustomerSocket connected')
        });

    }
}