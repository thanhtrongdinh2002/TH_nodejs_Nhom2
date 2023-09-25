class HomeController{
    main(req, res) {
        res.render("main")
    }
    home(req, res) {
        res.render("home")
    }
    about(req, res){
        res.render("about")
    }
    
}
export default new HomeController