import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.get('/list', (req, res) => {
    const jsonPath = path.join(__dirname, '..', 'jsons');
    const stores = fs.readdirSync(jsonPath);
    res.send(stores);
});

router.get('/:storeName/meta', (req, res) => {

    const storeName = req.params.storeName;
    const jsonPath = path.join(__dirname, '..', 'jsons', `${storeName}.json`);

    res.send(fs.readFileSync(jsonPath).toString());
});

export default router;
