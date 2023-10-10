import HomeController from "../controllers/HomeController.js"
import UserController from "../controllers/UserController.js"
import userModel from "../models/userModel.js"
const initRouter = (app) => {
    app.get('/', HomeController.main)
    app.get('/about', HomeController.about)
    app.get('/home', HomeController.home)

    app.get('/user', UserController.user)
    app.get('/insert-new-user', UserController.insertUser)
    app.post('/create-user', UserController.create_user)
    app.get('/detail-user/:username',UserController.detailUser)
    app.post('/delete-user/:username', UserController.deleteUser)
    app.get('/edit-user/:username', UserController.editUser)
    app.post('/update-user/:username', UserController.updateUser)
    app.get('/login', UserController.login)
    app.post('/authLogin', UserController.authLogin)
    app.get('/logout', UserController.logout)
      // Định nghĩa tuyến đường cho /list-user và chạy qua controller
    app.get('/list-user', UserController.listUser);
    
}
export default initRouter
