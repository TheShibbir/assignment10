const express = require("express");
const status = require("../controllers/statusController");
const userController = require("../controllers/userController");
const productController = require("../controllers/productController");
const { tokenVerify } = require("../middleware/tokenVerify");

const router = express.Router();

router.get("/status", status);

router.post("/register", userController.register);
router.post("/login", userController.login);


router.get("/products", tokenVerify, productController.getProducts);
router.post("/products", tokenVerify, productController.createProduct);

module.exports = router;