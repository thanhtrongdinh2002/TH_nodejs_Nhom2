import expres, { query } from "express"
import userModel from '../models/userModel.js'


const getAllUser = async (req, res) => {
    const userList = await userModel.getAllUser()
    res.render('home', { data: { title: 'List User', page: 'listUser', rows: userList } })
}

const insertUser = (req, res) => {
    res.render('newUser', { data: { title: 'Create New User', page: 'createNewUser' } })
}
const create_user = async (req, res) => {
    const username = req.body.username
    const user = await userModel.detailUser(username)
    console.log(username, user)
    if(user.length > 0){
        return res.status(404).json({ message: 'Tên tài khoản đã tồn tại' });
    }else{
        const {username, password, fullname, address, sex, email, groupid} = req.body;
        await userModel.createNewUser(username, password, fullname, address, sex, email, groupid)
        res.redirect("/list-user")
    }
}
const listUser = async (req, res) => {
    const users = await userModel.getAllUser();
    res.render('main', { users: users, data: { page: 'listUser' } });
}


const detailUser = async (req, res) => {
    const username = req.params.username;
    // Thực hiện tìm kiếm người dùng với username
    const user = await userModel.detailUser(username);
    if (!user) {
        return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }
    res.render("main", { username: user, data: { page: 'detailUser' } })
    // Trả về chi tiết người dùng
}
      

const deleteUser = async (req, res) => {
    const username = req.params.username;
    const user = await userModel.fun_deleteUser(username);
    if (!user) {
        return res.status(404).json({ message: 'Người dùng không tồn tại' });
    } else {
        res.redirect('/list-user');
    }
}
const editUser = async (req, res) => {
    const username = req.params.username;
    const users = await userModel.detailUser(username);
    res.render('editUser', {users: users})
}
const login = (req, res) => {
    res.render('login')
}
const updateUser = async (req, res) => {
    const username = req.params.username;
    const { fullname, address, sex, email, groupid } = req.body;
    await userModel.updateUser(fullname, address, sex, email, groupid, username)
    res.redirect("/list-user")
}

const authLogin = async (req, res) => {
    const { username, password } = req.body;
    const user = await userModel.detailUser(username)
    if (!user[0]) {
        return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }
    else if (password != user[0].password) {
        res.send("Sai mật khẩu")
    } else {
        req.session.user = {
            user: username,
            role: user[0].role
        }
        if(user[0].role == 0){
            res.redirect('/list-user')
        }else{
            res.redirect('/list-sanpham')
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

const listProduct = async(req, res) => {
    const id_product = await userModel.getAllProduct();
    res.render('main', { id_product: id_product ,data: {page: 'listProduct'}});
}

const detailProduct = async (req, res) => {
    const idsanpham = req.params.idsp;
    // Thực hiện tìm kiếm người dùng với username
    const idsp = await userModel.detail_Product(idsanpham);
    if (!idsp) {
      return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    }
    res.render("main", {idsp: idsp, data: {page: 'detailProduct'}})
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
const create_product = async (req, res) => {
    const hinhanh = req.files.hinhanh
    if(!hinhanh){
        res.json("Không có hình ảnh")
    }else{
        const newImage = Date.now() + hinhanh.name
        hinhanh.mv("src/public/image/"+newImage)
        const {tensp,chitietsp,giasp,iddanhmuc} = req.body;
        await userModel.createProduct(tensp,chitietsp,giasp,newImage,iddanhmuc)
        res.redirect("/list-product")
    }
}
const insertProduct = async (req, res) => {
    const iddanhmuc = await userModel.getAllcategory()
    res.render('newProduct', {iddanhmuc: iddanhmuc})
}
const editProduct = async (req, res) => {
    const idsanpham = req.params.idsp;
    const idsp = await userModel.detail_Product(idsanpham);
    const iddanhmuc = await userModel.getAllcategory()
    res.render('editProduct', {idsp: idsp, iddanhmuc: iddanhmuc})
    console.log(idsp)
}
const updateProduct = async (req, res) => {
const hinhanh = req.files.hinhanh
    if(!hinhanh){
        res.json("Không có hình ảnh")
    }else{
        const idsanpham = req.params.idsp;
        const newImage = Date.now() + hinhanh.name
        hinhanh.mv("src/public/image/"+newImage)
        const {tensp,chitietsp,giasp,iddanhmuc} = req.body;
        await userModel.update_Product(tensp,chitietsp,giasp,newImage,iddanhmuc, idsanpham)
        res.redirect("/list-product")
    }
    
}

const listCategogy = async (req, res) => {
    const iddanhmuc = await userModel.getAllcategory();
    res.render('main', { iddanhmuc: iddanhmuc ,data: {page: 'listCategory'}});
}
const editCategory = async (req, res) => {
    const iddm = req.params.iddm;
    const iddanhmuc = await userModel.detail_category(iddm);
    res.render('editCategory', {iddanhmuc: iddanhmuc})
}
const updateCategory = async (req, res) => {
    const iddanhmuc = req.params.iddm;
    const {tendanhmuc} = req.body;
    await userModel.update_Category(tendanhmuc,iddanhmuc)
    res.redirect("/list-category")
}
const deleteCategory = async (req, res) => {
    const iddm= req.params.iddm;
    const iddanhmuc = await userModel.fun_deleteCategory(iddm);
    if (!iddanhmuc) {
        return res.status(404).json({ message: 'Danh mục không tồn tại' });
    }else{
        res.redirect('/list-category');
    }
}
const insertCategory = async (req, res) => {
    res.render('newCategory')
}
const create_category = async (req, res) => {
    const {tendanhmuc} = req.body;
    await userModel.createCategory(tendanhmuc)
    res.redirect("/list-category")
}

const danhmuc = async (req, res) => {
    const iddanhmuc = await userModel.list_danhmuc()
    res.render("home", { iddanhmuc: iddanhmuc, data: { page: 'newHome' } })
    console.log(iddanhmuc)
}
const sanpham = async (req, res) => {
    const iddanhmuc = await userModel.list_danhmuc()
    const idsp = await userModel.list_sanpham()
    res.render("home", { iddanhmuc: iddanhmuc, idsp: idsp, data: { page: 'newHome' } })
    console.log(idsp)
}

const chitietsp = async (req, res) => {
    const username = req.params.username;
    const users = await userModel.detailUser(username);
    res.render('editUser', { users: users })
}
const timkiem = async (req, res) => {
    const tensp = req.body.query;
    const sp = await userModel.timkiem(tensp)
    console.log(sp, tensp)

    if (!sp[0]) {
        return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    }
    else {
        res.render("timkiem", {idsp: sp })
    }

}

export default {getAllUser, insertUser, login, listUser, create_user, detailUser, deleteUser, editUser, updateUser, authLogin, logout, listProduct, detailProduct, create_product, deleteProduct, editProduct, updateProduct, listCategogy, editCategory, updateCategory,deleteCategory, insertProduct,insertCategory, create_category, danhmuc, sanpham,chitietsp,timkiem}

