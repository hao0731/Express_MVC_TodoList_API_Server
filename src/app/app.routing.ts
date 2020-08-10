import express from 'express';
const router = express.Router();

router.get('/test', (req, res, next) => {
    res.send('test!');
});

router.post('/test', express.json(), (req, res, next) => {
    res.send(JSON.stringify(req.body));
});

export default router;