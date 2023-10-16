import HomeController from "../controllers/HomeController.js";
import UserController from "../controllers/UserController.js";
import isLogin from "../middleware/isLogin.js";
import isRole from "../middleware/isRole.js";
const initRouter = (app) => {
  app.get("/login", UserController.login);
  app.post("/authLogin", UserController.authLogin);
  app.get("/",isLogin, isRole,  HomeController.main);

  app.get("/user",isLogin, isRole, UserController.user);
  app.get("/insert-new-user",isLogin, isRole, UserController.insertUser);
  app.post("/create-user",isLogin, isRole, UserController.create_user);
  app.get("/detail-user/:username",isLogin, isRole, UserController.detailUser);
  app.get("/delete-user/:username",isLogin, isRole, UserController.deleteUser);
  app.get("/edit-user/:username",isLogin, isRole, UserController.editUser);
  app.post("/update-user/:username",isLogin, isRole, UserController.updateUser);
  app.get("/logout",isLogin, isRole, UserController.logout);
  // Định nghĩa tuyến đường cho /list-user và chạy qua controller
  app.get("/list-user", isLogin, isRole,UserController.listUser);
  app.get("/list-danhmuc",isLogin, UserController.danhmuc);
  app.get("/list-sanpham", UserController.sanpham);
  app.get("/chitietsp", UserController.chitietsp);
  app.post("/timkiem", UserController.timkiem)
};
export default initRouter;
