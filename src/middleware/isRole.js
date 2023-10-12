function isRole(req, res, next){
    if(req.session.user.role == 0){
        next()
    }
    else{
        res.redirect("/login")
    }
}
export default isRole