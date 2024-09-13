const verifyRole = (role) => {
    return (req, res, next) => {
        /*  console.log('.....1')
        console.log(req.user);
        console.log(req.user.role);
        console.log(role); */

        if (req.user.role !== role) {
            res.status(401);
            return res.send('...not authorized....')
        }
        console.log('....authorized....')
        next();
    }
}

module.exports = verifyRole;
