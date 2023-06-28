const jwt = require('jsonwebtoken');
const Account = require("../models/Account");
const bcrypt = require("bcrypt");

const JWT_SECRET = 'jwt_secret_key';
const JWT_VALIDITY = '7 days';
const saltRounds = 10;

exports.loginAccount = async (req, res) => {
    try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const { email, password } = req.body;
        await Account.findOne({ email: email }).then(user => {
            if (!user) {
                res.status(400).json({ message: 'Invalid email or password' });
            } else {
                bcrypt.compare(password, user.password).then(result => {
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
                    }).catch(error => console.error('Error comparing passwords:', error));
            }
        }).catch(error => console.log(error));


    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.registerAccount = async (req, res) => {
    try {
        const { name, email, username, password, age, role } = req.body;
        await Account.find({ email: email }).then(user => {
         

            if (user[0] != null) {
                res.status(400).json({ message: 'User already exists!', u: user });
            } else {
                
                bcrypt.hash(password, saltRounds).then(hashedPassword => {
                    let newUser = {
                        role: role === null ? 'GUEST' : role,
                        email :email,
                        username: username,
                        name: name,
                        age: age,
                        password: hashedPassword,
                    };
                    const accessToken = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
                        expiresIn: JWT_VALIDITY,
                    });
                    Account.create(newUser);
                    res.status(200).json({
                        accessToken,
                        newUser,
                        status: "Success"
                    },)
                }).catch(error => console.log(error));
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
        res.json({data: accounts, status: "success"});

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        const account = await Account.findByIdAndDelete(req.params.id);
        res.json({status: "success"});
    }catch(err) {
        res.status(500).json({error: err.message});
    }
}

exports.getAccountByEmail = async (req, res) => {
    try {
        const accounts = await Account.findOne({email: req.params.id});
        res.json({data: accounts, status: "success"});

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}