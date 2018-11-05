import express from 'express';
import fs from 'fs';

const router = express.Router();

router.get('/list', (req, res) => {
    let stores = fs.readdirSync('C:\\Projects\\iGarcom\\server\\jsons');
    res.send(stores);
});

router.get('/:storeName/meta', (req, res) => {
    res.send(req.params.storeName);
});

export default router;
