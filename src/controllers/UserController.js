class UserController{
    user(req, res){
        res.send("Lỗi 404, không tìm thấy trang")
    }
    create(req, res){
       res.render("newUser", {data:{title: "Tạo tài khoản"}}) 
    }
    listUser(req, res){
        res.render("listUser", {data:{title: "Danh sách tài khoản"}}) 
     }
    login(req, res){
        res.render("login", {data:{title: "Đăng nhập"}}) 
    }
    headerController(req, res, username){
        res.render("detailUser")
    }
}
export default new UserController
