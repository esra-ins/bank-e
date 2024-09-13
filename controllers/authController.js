const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserRole = require('../models/userRole');
const Role = require('../models/role');

const registerHandler = async (req, res) => {
    const { username, firstName, lastName, password, email, roleId } = req.body;

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
        return res.status(409).json({ 'message': `username ${username} is already in use!` });
    }

    if (sameEmail) {
        return res.status(409).json({ 'message': `email ${email} is already in use!` });
    }

    const newUser = await User.create({
        username,
        firstName,
        lastName,
        password,
        email
    });

    // console.log('.....new user id in user table........', newUser.id);

    const newUserRole = await UserRole.create({
        userId: newUser.id,
        roleId: roleId
    });

    //console.log('...new user role id in user role table.....', newUserRole.roleId)
    //console.log('...new user id in user role table....', newUserRole.userId)

    res.json({ 'message': `new user ${newUser.username} is registered ` });
};

const loginHandler = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ 'message': 'username and password are required!' })
    }

    const user = await User.findOne({
        where: {
            username: username
        }
    });

    if (!user) {
        return res.status(401).json({ 'message': `username ${username} is not found!` });
    }

    const pwdVerify = await bcrypt.compare(password, user.password);

    if (pwdVerify) {
        const userRole = await UserRole.findOne({
            where: {
                userId: user.id
            }
        });

        const roleId = userRole.roleId;

        const role = await Role.findOne({
            where: {
                id: roleId
            }
        });

        //create JWT
        const accessToken = jwt.sign(
            {
                "username": user.username,
                "role": role.name
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
        );

        console.log('....access token info.....', req.body.username)

        const refreshToken = jwt.sign(
            {
                "username": user.username,
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
        );

        // console.log('....refresh token.....', refreshToken)

        //saving refreshToken with current user
        const updatedUser = await user.update(
            { refreshToken: refreshToken },
            {
                where: {
                    id: user.id
                },
            });

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        return res.status(200).send({
            username: user.username,
            role: role.name,
            accessToken: accessToken
        });
    }
    else {
        return res.status(401).json({ 'message': 'incorrect password!' });
    }
};

const refreshTokenHandler = async (req, res) => {
    //console.log('-------1')
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res.sendStatus(403);
    }

    const refreshToken = cookies.jwt;

    const user = await User.findOne({
        where: {
            refreshToken: refreshToken
        }
    });

    if (!user) { return res.sendStatus(403) }

    //evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err || user.username !== decoded.username) {
                return res.sendStatus(403);
            }
            const userRole = await UserRole.findOne({
                where: {
                    userId: user.id
                }
            });
            const roleId = userRole.roleId;
            console.log('...role id..', roleId);
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.username,
                        "roles": roleId
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
            );
            //console.log('2')
            // console.log(accessToken);
            res.json({ accessToken });
        }
    )
}

const logoutHandler = async (req, res) => {
    //on client, delete access token
    const cookies = req.cookies;
    if (!cookies?.jwt) { return res.sendStatus(204) }
    const refreshToken = cookies.jwt;
    console.log('1.......', refreshToken)

    //is refreshToken in db?
    const user = await User.findOne({
        where: {
            refreshToken: refreshToken
        }
    });
    if (!user) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None' });
        return res.sendStatus(204); //no content
    }

    //delete refreshToken in db
    user.refreshToken = '';
    const result = await user.save();
    console.log('2.....', user.refreshToken)

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None' });
    res.sendStatus(204);
    console.log('.......logged out successfully........')
}

module.exports = {
    registerHandler,
    loginHandler,
    refreshTokenHandler,
    logoutHandler
};
