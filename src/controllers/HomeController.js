import userModel from '../models/userModel.js'

class HomeController{
    async main(req, res) {
        res.render("main", { data: {page: 'home'}})
    }
}
export default new HomeController