import express, { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/user';
import { QueryFindOneAndUpdateOptions } from 'mongoose';
const router = express.Router();

const errorHandler = (func: (req: Request, res: Response, next: NextFunction) => Promise<void>) => (req: Request, res: Response, next: NextFunction) => func(req, res, next).catch(next);


router.get('/test', (req, res, next) => {
    res.send('test!');
});

router.get('/error', (req, res, next) => {
    next('error page.');
});

router.get('/data/error', (req, res, next) => {
    // Fake API
    const getProfile = new Promise((resolve, reject) => {
        setTimeout(() => resolve({ name: 'HAO', age: 22 }), 100);
    });
    const getFriends = new Promise((resolve, reject) => {
        setTimeout(() => resolve([]), 120);
    });
    const errorRequest = new Promise((resolve, reject) => {
        setTimeout(() => reject('Oops!'), 2000);
    });
  
    getProfile
    .then(profile => getFriends)
    .then(friends => errorRequest)
    .then(() => res.send('GoGoGo!'))
    .catch(err => next(err));
});

router.get('/data/error/promise', errorHandler(async (req, res, next) => {
    // Fake API
    const getProfile = new Promise((resolve, reject) => {
        setTimeout(() => resolve({ name: 'HAO', age: 22 }), 100);
      });
      const getFriends = new Promise((resolve, reject) => {
        setTimeout(() => resolve([]), 120);
      });
      const errorRequest = new Promise((resolve, reject) => {
        setTimeout(() => reject('Oops!'), 2000);
      });

      const profile = await getProfile;
      const friends = await getFriends;
      const none = await errorRequest;
      res.send('GoGoGo!');
}));

router.post('/test', express.json(), (req, res, next) => {
    console.log(req.body);
    res.send(JSON.stringify(req.body));
});

router.post('/users', express.json(), errorHandler(async (req, res, next) => {
    const { username, email } = req.body;
    const user = new UserModel({ username, email });
    const data = await user.save();
    res.send(data);
}));

router.get('/users', errorHandler(async (req, res, next) => {
    const documents = await UserModel.findOne({ username: req.query.username });
    res.send(documents);
}));

router.patch('/users/:id', express.json(), errorHandler(async (req, res, next) => {
    const options: QueryFindOneAndUpdateOptions = {
        new: true,
        runValidators: true
    };
    const document = await UserModel.findByIdAndUpdate(req.params.id, { username: req.body.username }, options);
    res.send(document);
}));

router.delete('/users/:id', errorHandler(async (req, res, next) => {
    await UserModel.findByIdAndRemove(req.params.id);
    res.send('刪除成功');
}));

export default router;