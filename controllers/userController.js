const User = require('../models/user');

const getAllUsers = async (request, response) => {
    const allUsers = await User.findAll();

    response.json(allUsers);
}

const createUserForm = (request, response) => {
    response.render('createUser');
};

const createUser = async (request, response) => {
    const { username, firstName, lastName, password, email } = request.body;

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

    //The 409 (Conflict) status code indicates that the request could not be completed due to a conflict with the current state of the target responseource.
    if (sameUsername) {
        return response.status(409).json({ 'message': `username ${username} is already in use!` });
    }

    if (sameEmail) {
        return response.status(409).json({ 'message': `email ${email} is already in use!` });
    }

    const newUser = await User.create({
        username,
        firstName,
        lastName,
        password,
        email
    });

    response.json({ 'message': `new user ${ newUser.username } is created ` });
};

const getUser = async (request, response) => {
    const user = await User.findOne({
        where: {
            id: request.params.id
        }
    });

    if (!user) {
        return response.status(400).json({ 'message': `user id ${ request.params.id } not found` });
    }

    response.json(user);
}

module.exports = {
    getAllUsers,
    createUser,
    createUserForm,
    getUser
};