import expres from "express"
import userModel from '../models/userModel.js'



const getAllUser = async (req, res) => {
    const userList = await userModel.getAllUser()
    res.render('home', {data: {title: 'List User', page: 'listUser', rows: userList}})
}
const insertUser = (req, res) => {
    res.render('newUser', {data: {title: 'Create New User', page: 'createNewUser'}})
}
const create_user = async (req, res) => {
    console.log(req.body)
    const {username, password, fullname, address, sex, email, groupid} = req.body;
    await userModel.createNewUser(username, password, fullname, address, sex, email, groupid)
    res.redirect("/list-user")
}
const listUser = async (req, res) => {
    const users = await userModel.getAllUser();
    res.render('main', { users: users ,data: {page: 'listUser'}});
}
const listProduct = async(req, res) => {
    const id_product = await userModel.getAllProduct();
    res.render('main', { id_product: id_product ,data: {page: 'listProduct'}});
}
const detailUser = async (req, res) => {
    const username = req.params.username;
    // Thực hiện tìm kiếm người dùng với username
    const user = await userModel.detailUser(username);
    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }
    res.render("main", {username: user, data: {page: 'detailUser'}})
    // Trả về chi tiết người dùng
}
const detailProduct = async (req, res) => {
    const idsanpham = req.params.idsp;
    // Thực hiện tìm kiếm người dùng với username
    const idsp = await userModel.detail_Product(idsanpham);
    if (!user) {
      return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    }
    res.render("main", {idsp: idsp, data: {page: 'detailProduct'}})
}
const deleteUser = async (req, res) => {
    const username = req.params.username;
    const user = await userModel.fun_deleteUser(username);
    if (!user) {
        return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }else{
        res.redirect('/list-user');
    }
}
const deleteProduct = async (req, res) => {
    const idsanpham = req.params.idsp;
    const idsp = await userModel.fun_deleteProduct(idsanpham);
    if (!idsp) {
        return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }else{
        res.redirect('/list-product');
    }
}
const editUser = async (req, res) => {
    const username = req.params.username;
    const users = await userModel.detailUser(username);
    res.render('editUser', {users: users})
}
const editProduct = async (req, res) => {
    const idsanpham = req.params.idsp;
    const idsp = await userModel.detail_Product(idsanpham);
    res.render('editProduct', {idsp: idsp})
}
const updateProduct = async (req, res) => {
    const idsanpham = req.params.idsp;
    const {tensp, chitietsp, giasp, hinhanh,iddanhmuc} = req.body;
    await userModel.update_Product(tensp, chitietsp, giasp, hinhanh,iddanhmuc, idsanpham)
    res.redirect("/list-product")
}

const updateUser = async (req, res) => {
    const username = req.params.username;
    const {fullname, address, sex, email, groupid} = req.body;
    await userModel.update_User(fullname, address, sex, email, groupid, username)
    res.redirect("/list-user")
}


const user = (req, res) => {
        res.send("Lỗi 404, không tìm thấy trang")
}

const login = (req, res) => {
    res.render('login')
}
const authLogin = async (req, res) => {
    const {username, password} = req.body;
    const user = await userModel.detailUser(username)
    if (!user[0]) {
        return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }
    else if(password != user[0].password){
       res.send("Sai mật khẩu")
    }else{
        req.session.user = {
            user: username,
            role: user[0].role
        }
        if(user[0].role == 0){
            const users = await userModel.getAllUser();
            res.render('main', { users: users ,data: {page: 'listUser'}});
        }
        else{
            res.render('home')
        }
    }
    
}

const logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
          console.log('Error destroying session:', err);
        } else {
          res.redirect('/login');
        }
      });
}


export default {getAllUser, insertUser, login, listUser, user, create_user, detailUser, deleteUser, editUser, updateUser, authLogin, logout, listProduct, detailProduct, deleteProduct, editProduct, updateProduct}
