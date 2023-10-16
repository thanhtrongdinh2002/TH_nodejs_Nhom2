import expres, { query } from "express"
import userModel from '../models/userModel.js'


const getAllUser = async (req, res) => {
    const userList = await userModel.getAllUser()
    res.status(200).json({
        status:"Thành công",
        data: userList
    })
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
        res.status(200).json({
            status:"Thành công",
            message:"Tạo thông tin người dùng thành công"
        })
    }
}
const listUser = async (req, res) => {
    const users = await userModel.getAllUser();
    res.status(200).json({
        status:"Thành công",
        data: users
    })
}


const detailUser = async (req, res) => {
    const username = req.params.username;
    // Thực hiện tìm kiếm người dùng với username
    const user = await userModel.detailUser(username);
    if (!user) {
        return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }
    res.status(200).json({
        status:"Thành công",
        data: user
    })
    // Trả về chi tiết người dùng
}
      

const deleteUser = async (req, res) => {
    const username = req.params.username;
    const user = await userModel.fun_deleteUser(username);
    if (!user) {
        return res.status(404).json({ message: 'Người dùng không tồn tại' });
    } else {
        res.status(200).json({
            status:"Thành công",
        })
    }
}

const updateUser = async (req, res) => {
    const username = req.params.username;
    const { fullname, address, sex, email, groupid } = req.body;
    await userModel.updateUser(fullname, address, sex, email, groupid, username)
    res.status(200).json({
        status:"Thành công",
    })
}

const listProduct = async(req, res) => {
    const id_product = await userModel.getAllProduct();
    res.status(200).json({
        status:"Thành công",
        data: id_product
    })
}

const detailProduct = async (req, res) => {
    const idsanpham = req.params.idsp;
    // Thực hiện tìm kiếm người dùng với username
    const idsp = await userModel.detail_Product(idsanpham);
    if (!idsp) {
      return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    }
    res.status(200).json({
        status:"Thành công",
        data: idsp
    })
}

const deleteProduct = async (req, res) => {
    const idsanpham = req.params.idsp;
    const idsp = await userModel.fun_deleteProduct(idsanpham);
    if (!idsp) {
        return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }else{
        res.status(200).json({
            status: "Xóa sản phẩm thành công",
        })
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
        res.status(200).json({
            status:"Tạo sản phẩm thành công",
        })
    }
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
        res.status(200).json({
            status:"Cập nhật sản phẩm thành công",
        })
    }
    
}

const listCategogy = async (req, res) => {
    const iddanhmuc = await userModel.getAllcategory();
    res.status(200).json({
        status:"Thành công",
        data: iddanhmuc
    })
}
const updateCategory = async (req, res) => {
    const iddanhmuc = req.params.iddm;
    const {tendanhmuc} = req.body;
    await userModel.update_Category(tendanhmuc,iddanhmuc)
    res.status(200).json({
        status:"Cập nhật danh mục thành công",
    })
}
const deleteCategory = async (req, res) => {
    const iddm= req.params.iddm;
    const iddanhmuc = await userModel.fun_deleteCategory(iddm);
    if (!iddanhmuc) {
        return res.status(404).json({ message: 'Danh mục không tồn tại' });
    }else{
        res.status(200).json({
            status:"Xóa danh mục thành công",
        })
    }
}
const create_category = async (req, res) => {
    const {tendanhmuc} = req.body;
    await userModel.createCategory(tendanhmuc)
    res.status(200).json({
        status:"Tạo danh mục thành công",
    })
}

const danhmuc = async (req, res) => {
    const iddanhmuc = await userModel.list_danhmuc()
    res.status(200).json({
        status:"Thành công",
        data: iddanhmuc
    })
}
const sanpham = async (req, res) => {
    const idsp = await userModel.list_sanpham()
    res.status(200).json({
        status:"Thành công",
        data: idsp
    })
}

const chitietsp = async (req, res) => {
    const username = req.params.username;
    const users = await userModel.detailUser(username);
    res.status(200).json({
        status:"Thành công",
        data: users
    })
}

const timkiem = async (req, res) => {
    const tensp = req.body.query;
    const sp = await userModel.timkiem(tensp)
    console.log(sp, tensp)

    if (!sp[0]) {
        return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    }
    else {
        res.status(200).json({
            status:"Tìm thấy sản phẩm",
            data: sp
        })
    }

}

export default {getAllUser,listUser, create_user, detailUser, deleteUser,  updateUser,listProduct, detailProduct, create_product, deleteProduct, updateProduct, listCategogy, updateCategory,deleteCategory, create_category, danhmuc, sanpham,chitietsp,timkiem}

