import fs from 'fs';
import path from 'path';

export default class StoreMetadataService {

    static getMetadata(storeId) {
        const jsonPath = path.join(__dirname, '..', 'jsons', `${storeId}.json`);
        return fs.readFileSync(jsonPath).toString();
    }

    static getNextOrderId(storeId) {
        let storeJson = JSON.parse(this.getMetadata(storeId));

        if (!storeJson.hasOwnProperty('lastOrderId'))
            storeJson.lastOrderId = -1;
        const nextOrderId = `${storeId}${++storeJson.lastOrderId}`;

        this.updateStoreMetadata(storeJson);

        return nextOrderId;
    }

    static updateStoreMetadata(storeMetadata) {
        const storeId = storeMetadata.storeId;
        const jsonPath = path.join(__dirname, '..', 'jsons', `${storeId}.json`);
        fs.writeFileSync(jsonPath, JSON.stringify(storeMetadata));
    }
}