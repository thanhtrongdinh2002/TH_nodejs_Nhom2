import express from "express";
import APIController from "../controllers/APIController.js";
const route = express.Router()
  route.get("/all-user", APIController.getAllUser);

  route.post("/create-user", APIController.create_user);
  route.get("/detail-user/:username", APIController.detailUser);
  route.get("/delete-user/:username", APIController.deleteUser);
  route.post("/update-user/:username", APIController.updateUser);
  route.get("/list-user",APIController.listUser);

  route.get("/list-danhmuc", APIController.danhmuc);
  route.get("/list-sanpham", APIController.sanpham);
  route.get("/chitietsp", APIController.chitietsp);
  route.post("/timkiem", APIController.timkiem)


  route.get("/list-product",APIController.listProduct);
  route.get("/detail-product/:idsp", APIController.detailProduct);
  route.get("/delete-product/:idsp", APIController.deleteProduct);
  route.post("/update-product/:idsp", APIController.updateProduct);
  route.post("/create-product", APIController.create_product);


  route.get("/list-category",APIController.listCategogy);
  route.post("/update-category/:iddm", APIController.updateCategory);
  route.get("/delete-category/:iddm", APIController.deleteCategory);
  route.post("/create-category", APIController.create_category);
export default route