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
            return res.status(200).send(newUser);
        }).catch(error => res.status(200).send({ error }));
    });

    app.post('/adduser/:num/', (req, res) => {

        const data = {
            first_name: 'Afton',
            last_name: 'Straus',
            email: 'email@email.com',
            password: 'Texas1'
        };
        const num = Number(req.params.num);
        let num_created = 0;
        console.log(`Creating ${num} users.`);
        for (var i = 0; i < num; i++) {
            UserModel.create(data).then((newUser) => {
                console.log(`Created new user with id: ${newUser._id}`);
                num_created += 1;
                if (num_created === num) {
                    return res.status(200).send({ message: 'Finished' });
                } else if (i === num - 1) {
                    return res.status(400).send({ err: 'Something went wrong' });
                }
            }).catch(err => res.status(400).send({ err: err }));
        }
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
        const users = UserModel.find({ age: { $ne: null } }).then((users) => {
            return users;
        }).then((users) => {
            let num_completed = 0;
            users.forEach((user, index) => {
                UserModel.findByIdAndUpdate(user._id, { age: user.age + 1 }, { new: true }).exec().then(user => {
                    num_completed += 1;
                    console.log('user updated');
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