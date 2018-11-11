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
    let items = req.body;
    const orderId = StoreMetadataService.getNextOrderId(req.params.storeId);

    const order = {
        items,
        id: orderId
    };

    StoreSocket.orderReceived(order);
    res.send(order);
});

export default router;
