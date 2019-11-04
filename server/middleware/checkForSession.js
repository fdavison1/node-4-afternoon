module.exports = {
    sessionCheck: (req, res, next) => {
        if (!req.session.user){
            req.session.user = {
                username: '', 
                cart: [],
                total: 0
            }
        }
        next()
    }
}