import StoreController from './StoreController';

export default function(app) {
    app.use('/stores', StoreController);
};
