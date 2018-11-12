import express from 'express';
import StoreMetadataService from '../services/StoreMetadataService';
import StoreSocket from '../sockets/StoreSocket';

const router = express.Router();

router.get('/list', (req, res) => {
    res.send(StoreMetadataService.getStoresList());
});

router.get('/:storeId/meta', (req, res) => {
    const storeId = req.params.storeId;
    res.send(StoreMetadataService.getMetadata(storeId));
});

router.post('/:storeId/order', (req, res) => {
    const items = req.body.items;
    const customer = req.body.customer;
    const table = req.body.table;
    const orderId = StoreMetadataService.getNextOrderId(req.params.storeId);

    const order = {
        items,
        customer,
        table,
        id: orderId
    };

    StoreSocket.orderReceived(order);
    res.send(order);
});

router.post('/:storeId/confirm', (req, res) => {
    const storeId = req.params.storeId;
    const orderId = req.body.id;

    res.send(orderId);

});

export default router;
