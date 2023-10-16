import HomeController from "../controllers/HomeController.js";
import UserController from "../controllers/UserController.js";
import isLogin from "../middleware/isLogin.js";
import isRole from "../middleware/isRole.js";
const initRouter = (app) => {
  app.get("/login", UserController.login);
  app.post("/authLogin", UserController.authLogin);
  app.get("/",isLogin, isRole,  HomeController.main);

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


  app.get("/list-product", isLogin, isRole,UserController.listProduct);
  app.get("/detail-product/:idsp",isLogin, isRole, UserController.detailProduct);
  app.get("/delete-product/:idsp",isLogin, isRole, UserController.deleteProduct);
  app.get("/edit-product/:idsp",isLogin, isRole, UserController.editProduct);
  app.post("/update-product/:idsp",isLogin, isRole, UserController.updateProduct);
  app.get("/insert-product",isLogin, isRole, UserController.insertProduct);
  app.post("/create-product",isLogin, isRole, UserController.create_product);


  app.get("/list-category", isLogin, isRole,UserController.listCategogy);
  app.get("/edit-category/:iddm",isLogin, isRole, UserController.editCategory);
  app.post("/update-category/:iddm",isLogin, isRole, UserController.updateCategory);
  app.get("/delete-category/:iddm",isLogin, isRole, UserController.deleteCategory);
  app.get("/insert-category",isLogin, isRole, UserController.insertCategory);
  app.post("/create-category",isLogin, isRole, UserController.create_category);
  app.get("/chitietsp/:id", UserController.chitietsp)
};
export default initRouter;
