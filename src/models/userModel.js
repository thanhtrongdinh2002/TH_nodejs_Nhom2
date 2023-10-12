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


export default {getAllUser, createNewUser, detailUser, updateUser, fun_deleteUser}