const jwt = require('jsonwebtoken');
const Account = require("../models/Account");
const bcrypt = require("bcrypt");

const JWT_SECRET = 'jwt_secret_key';
const JWT_VALIDITY = '7 days';

exports.loginAccount = async (req, res) => {
    try {
        //await new Promise((resolve) => setTimeout(resolve, 1000));

        const { email, password } = req.body;
        await Account.find({ email: email }).then(user => {
            if (user) {
                res.status(400).json({ message: 'Invalid email or password' });
            } else {
                bcrypt.compare(password, user.password, (error, result) => {
                    if (error) {
                        console.error('Error comparing passwords:', error);
                    } else {
                        if (result) {
                            const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
                                expiresIn: JWT_VALIDITY,
                            });
                            res.status(200).json(
                                {
                                    accessToken,
                                    user: {
                                        id: user.id,
                                        email: user.email,
                                        name: user.name,
                                        role: user.role,
                                    },
                                },
                            );
                        } else {
                            console.log('Passwords do not match. Authentication failed.');
                            res.status(400).json({ message: 'Invalid email or password' });
                        }
                    }
                });
            }
        }).catch(error => console.log(error));


    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.registerAccount = async (req, res) => {
    let newUser = {
        role: '',
        name: '',
        username: '',
        email: '',
        age: 0,
        password: '',
    }
    try {
        const { name, email, username, password, age } = req.body;
        await Account.find({ email: email }).then(user => {
            const saltRounds = 10;

            if (user[0] != null) {
                res.status(400).json({ message: 'User already exists!', u: user });
            } else {
                newUser.role = 'GUEST';
                newUser.age = age;
                newUser.email = email;
                newUser.username = username;
                newUser.name = name;
                bcrypt.hash(password, saltRounds, (error, hashedPassword) => {
                    if (error) {
                        console.error('Error hashing password:', error);
                    } else {
                        newUser.password = hashedPassword;
                    }
                });
                const accessToken = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
                    expiresIn: JWT_VALIDITY,
                });
                Account.create(newUser);
                res.status(200).json({
                    accessToken,
                    user: {
                        _id: newUser._id,
                        email: newUser.email,
                        name: newUser.name,
                        username: newUser.username,
                        role: newUser.role,
                        age: newUser.age,
                        password: newUser.password
                    },
                },
                );
            }
        }).catch(error => console.log(error));

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getAllAccounts = async (req, res) => {
    try {
        const accounts = await Account.find();
        res.json(accounts);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};