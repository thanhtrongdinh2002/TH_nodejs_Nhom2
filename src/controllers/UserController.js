import expres from "express"
import userModel from '../models/userModel.js'



const getAllUser = async (req, res) => {
    const userList = await userModel.getAllUser()
    res.render('home', { data: { title: 'List User', page: 'listUser', rows: userList } })
}

const insertUser = (req, res) => {
    res.render('newUser', { data: { title: 'Create New User', page: 'createNewUser' } })
}
const create_user = async (req, res) => {
    console.log(req.body)
    const { username, password, fullname, address, sex, email, groupid } = req.body;
    await userModel.createNewUser(username, password, fullname, address, sex, email, groupid)
    res.redirect("/list-user")
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
    res.render('editUser', { users: users })
}

const updateUser = async (req, res) => {
    const username = req.params.username;
    const { fullname, address, sex, email, groupid } = req.body;
    await userModel.updateUser(fullname, address, sex, email, groupid, username)
    res.redirect("/list-user")
}


const user = (req, res) => {
    res.send("Lỗi 404, không tìm thấy trang")
}

const login = (req, res) => {
    res.render('login')
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
        res.redirect('/list-sanpham')
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

const headerController = (req, res) => {
    res.render("detailUser")
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
    console.log(sp)
    if (!sp[0]) {
        return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    }
    else {
        res.render("timkiem", {idsp: sp })
    }

}

export default { getAllUser, insertUser, login, listUser, user, create_user, detailUser, deleteUser, editUser, updateUser, authLogin, logout, danhmuc, sanpham, chitietsp, timkiem }
