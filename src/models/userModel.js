import pool from "../configs/connectDB.js";

const getAllUser = async () => {
  const [rows, fields] = await pool.execute(
    "SELECT * FROM `users` WHERE role = 0"
  );
  return rows;
};

const createNewUser = async (
  username,
  password,
  fullname,
  address,
  sex,
  email,
  groupid
) => {
  const [rows, fields] = await pool.execute(
    "INSERT INTO `users`(`username`, `password`, `fullname`, `address`, `sex`, `email`, `groupid`) VALUES (?,?,?,?,?,?,?)",
    [username, password, fullname, address, sex, email, groupid]
  );
};
const detailUser = async (username) => {
  const [rows, fields] = await pool.execute(
    "SELECT * FROM `users` WHERE username = ?",
    [username]
  );
  return rows;
};
const updateUser = async (fullname, address, sex, email, groupid, username) => {
  const [rows, fields] = await pool.execute(
    "UPDATE `users` SET `fullname`=?,`address`=?,`sex`=?,`email`=?,`groupid`=? WHERE `username`=?",
    [fullname, address, sex, email, groupid, username]
  );
  return rows;
};
const fun_deleteUser = async (username) => {
  const [rows, fields] = await pool.execute(
    "DELETE FROM `users` WHERE  username =?",
    [username]
  );
  return rows;
};
const list_danhmuc = async () => {
  const [rows, fields] = await pool.execute("SELECT * FROM `danhmuc`");
  return rows;
};
const list_sanpham = async () => {
  const [rows, fields] = await pool.execute("SELECT * FROM `sp`");
  return rows;
};

const chitietsp = async () => {
  const [rows, fields] = await pool.execute("SELECT * FROM `sp`");
  return rows;
};
const timkiem = async (tensp) => {
  const [rows, fields] = await pool.execute(
    "SELECT * FROM `sp` WHERE `tensp` LIKE ?",
    ["%" + tensp + "%"]
  );
  return rows;
};

const getAllProduct = async () => {
  const [rows, fields] = await pool.execute("SELECT * FROM `sp`");
  return rows;
};
const detail_Product = async (idsanpham) => {
  const [rows, fields] = await pool.execute(
    "SELECT * FROM `sp` WHERE idsp = ?",
    [idsanpham]
  );
  return rows;
};
const fun_deleteProduct = async (idsanpham) => {
  const [rows, fields] = await pool.execute("DELETE FROM `sp` WHERE  idsp =?", [
    idsanpham,
  ]);
  return rows;
};
const update_Product = async (
  tensp,
  chitietsp,
  giasp,
  newImage,
  iddanhmuc,
  idsanpham
) => {
  const [rows, fields] = await pool.execute(
    "UPDATE `sp` SET `tensp`=?,`chitietsp`=?,`giasp`=?,`hinhanh`=?,`iddanhmuc`=? WHERE `idsp`=?",
    [tensp, chitietsp, giasp, newImage, iddanhmuc, idsanpham]
  );
  return rows;
};
const createProduct = async (tensp, chitietsp, giasp, newImage, iddanhmuc) => {
  const [rows, fields] = await pool.execute(
    "INSERT INTO `sp`( `tensp`, `chitietsp`, `giasp`, `hinhanh`, `iddanhmuc`) VALUES (?,?,?,?,?)",
    [tensp, chitietsp, giasp, newImage, iddanhmuc]
  );
  return rows;
};

const getAllcategory = async () => {
  const [rows, fields] = await pool.execute("SELECT * FROM `danhmuc`");
  return rows;
};
const detail_category = async (iddanhmuc) => {
  const [rows, fields] = await pool.execute(
    "SELECT * FROM `danhmuc` WHERE iddanhmuc = ?",
    [iddanhmuc]
  );
  return rows;
};
const fun_deleteCategory = async (iddanhmuc) => {
  const [rows, fields] = await pool.execute(
    "DELETE FROM `danhmuc` WHERE  iddanhmuc=?",
    [iddanhmuc]
  );
  return rows;
};
const update_Category = async (tendanhmuc, iddanhmuc) => {
  const [rows, fields] = await pool.execute(
    "UPDATE `danhmuc` SET `tendanhmuc`=? WHERE `iddanhmuc` = ?",
    [tendanhmuc, iddanhmuc]
  );
  return rows;
};
const createCategory = async (tendanhmuc) => {
  const [rows, fields] = await pool.execute(
    "INSERT INTO `danhmuc`( `tendanhmuc`) VALUES (?)",
    [tendanhmuc]
  );
};
const getproductbycateory = async (tendanhmuc) => {
  const [rows, fields] = await pool.execute(
    "SELECT * FROM `sp` WHERE iddanhmuc=? ",
    [tendanhmuc]
  );
  return rows;
}
export default {
  getAllUser,
  createNewUser,
  detailUser,
  updateUser,
  fun_deleteUser,
  getAllProduct,
  createProduct,
  detail_Product,
  fun_deleteProduct,
  update_Product,
  getAllcategory,
  detail_category,
  fun_deleteCategory,
  update_Category,
  createCategory,
  list_danhmuc,
  list_sanpham,
  chitietsp,
  timkiem,
  getproductbycateory,
};
