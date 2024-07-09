const User = require('../models/user');
const bcrypt = require('bcryptjs');

const getAllUsers = async (req, res) => {
    const allUsers = await User.findAll();
    res.json(allUsers);
}

const createUserForm = (req, res) => {
    res.render('createUser');
};

const createUser = async (req, res) => {
    const { username, firstName, lastName, password, email } = req.body;

    const sameUsername = await User.findOne({
        where: {
            username: username
        }
    });

    const sameEmail = await User.findOne({
        where: {
            email: email
        }
    });

    //The 409 (Conflict) status code indicates that the request could not be completed due to a conflict with the current state of the target resource.
    if (sameUsername) {
        return res.status(409).json({ 'message': `username ${ username } is already in use!` });
    }
    if (sameEmail) {
        return res.status(409).json({ 'message': `email ${ email } is already in use!` });
    }
    const newUser = await User.create({
        username,
        firstName,
        lastName,
        password,
        email
    });

    res.json({ 'message': `new user ${newUser.username} is created ` });
};

const updateUser = async (req, res) => {
    const user = await User.findOne({
        where: {
            id: req.body.id
        }
    });

    // Load hash from your password DB.
    await bcrypt.compare(req.body.password, user.password, function (err, result) {
        // result == true 
        console.log(result);
        if (err) {
            console.log(err);
        }
    });

    if (!user) {
        return res.status(400).json({ 'message': `user id ${ req.body.id } not found` });
    };

    const updatedUser = await user.update(
        { username: req.body.username },
        {
            where: {
                id: req.body.id
            },
        });
    res.status(200).json(updatedUser);
}

const deleteUser = async (req, res) => {
    //const idReq = req.body.id;
}

const getUser = async (req, res) => {
    const user = await User.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!user) {
        return res.status(400).json({ 'message': `user id ${ req.params.id } not found` });
    }
    res.json(user);
}

module.exports = {
    getAllUsers,
    createUser,
    createUserForm,
    deleteUser,
    getUser,
    updateUser
};
