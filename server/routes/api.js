const mongoose = require('mongoose');
const UserModel = require('../../db/schemas/user');


const appRouter = (app) => {

    app.post('/adduser/', (req, res) => {

        const data = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
        };
        const newUserPromise = UserModel.create(data);
        newUserPromise.then((newUser) => {
            req.session.userId = newUser._id;
            req.session.save();
            return res.status(200).send(newUser);
        }).catch(error => res.status(200).send({ error }));
    });

    app.post('/login/', (req, res) => {
        UserModel.authenticate(req.body.email, req.body.password, (err, user) => {
            if (err) {
                return res.status(200).send({ error: err })
            } else{
                req.session.userId = user._id;
                req.session.save();
                console.log(req.session.userId);
                return res.status(200).send({
                    id: user._id,
                    first_name: user.first_name,
                    email: user.email
                });
            }
        });
    })

    app.post('/logout/', (req, res, next) => {
        console.log(req.session.userId);
        if (req.session) {
            req.session.destroy(err => {
                if (err) {
                    return next(err);
                }
                console.log('Logged out');
            });
        }
    });

    app.get('/checkid/', (req, res) => {
        return console.log(req.session.userId);
        res.end();
    });

    app.post('/getusers/', (req, res) => {
        UserModel.find().then((users) => {
            return res.status(200).send({users});
        }).catch(err => res.status(400).send({ err: err }));
    });

    app.post('/deleteusers/', (req, res) => {
        UserModel.remove().then((users) => {
            return res.status(200).send({ users });
        }).catch(err => res.status(400).send({ err: err }));
    });

    // For each user, I want to change the age to +1
    app.post('/updateuser/', (req, res) => {
        const users = UserModel.find({ first_name: { $ne: null } }).then((users) => {
            return users;
        }).then((users) => {
            let num_completed = 0;            
            users.forEach((user, index) => {
                UserModel.findByIdAndUpdate(user._id, { first_name: user.first_name + '1' }, { new: true }).exec().then(user => {
                    num_completed += 1;
                    console.log('user updated');
                    user.save();
                    if (num_completed === users.length) {
                        return res.status(200).send({ message: 'Finished' });
                    }
                    return user;
                });
            });
        }).catch(err => res.status(400).send({ err: err }));
    });
};

module.exports = appRouter;