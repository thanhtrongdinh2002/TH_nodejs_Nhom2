function isLogin(req, res, next){
    if(req.session.user){
        next()
    }
    else{
        res.redirect("/login")
    }
}
export default isLogin