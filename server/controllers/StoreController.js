import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.get('/list', (req, res) => {
    const jsonPath = path.join(__dirname, '..', 'jsons');
    const stores = fs.readdirSync(jsonPath);
    res.send(stores);
});

router.get('/:storeId/meta', (req, res) => {

    const storeId = req.params.storeId;
    const jsonPath = path.join(__dirname, '..', 'jsons', `${storeId}.json`);

    res.send(fs.readFileSync(jsonPath).toString());
});

router.post('/:storeId/order', (req, res) => {
    res.send(req.body);
});

export default router;
