import pool from '../configs/connectDB.js'

const getAllUser = async () => {
    const[rows, fields] = await pool.execute('SELECT * FROM `users` WHERE role = 0')
    return rows
}
const createNewUser = async(username, password, fullname, address, sex, email, groupid) => {
    const [rows, fields] = await pool.execute("INSERT INTO `users`(`username`, `password`, `fullname`, `address`, `sex`, `email`, `groupid`) VALUES (?,?,?,?,?,?,?)",[username, password, fullname, address, sex, email, groupid])
}
const detailUser = async (username) => {
    const [rows, fields] = await pool.execute('SELECT * FROM `users` WHERE username = ?', [username]);
    return rows; 
};
const updateUser = async(fullname, address, sex, email, groupid, username) => {
    const [rows, fields] = await pool.execute('UPDATE `users` SET `fullname`=?,`address`=?,`sex`=?,`email`=?,`groupid`=? WHERE `username`=?', [fullname, address, sex, email, groupid, username]);
    return rows; 
}
const fun_deleteUser = async (username) => {
    const [rows, fields] = await pool.execute('DELETE FROM `users` WHERE  username =?', [username]);
    return rows; 
}

const list_danhmuc = async () => {
    const [rows, fields] = await pool.execute('SELECT * FROM `danhmuc`');
    return rows; 
};
const list_sanpham = async () => {
    const [rows, fields] = await pool.execute('SELECT * FROM `sp`');
    return rows; 
};

const chitietsp = async () => {
    const [rows, fields] = await pool.execute('SELECT * FROM `sp`');
    return rows; 
};
const timkiem = async (tensp) => {
    const [rows, fields] = await pool.execute('SELECT * FROM `sp` WHERE tensp LIKE ?', [tensp]);
    return rows; 
};

export default {getAllUser, createNewUser, detailUser, updateUser, fun_deleteUser, list_danhmuc, list_sanpham, chitietsp, timkiem}