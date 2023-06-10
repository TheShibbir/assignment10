const ProductModel = require("./models/ProductModel");
const mongooseErrorHandle = require("../helper/errorHandle");
module.exports.createProduct = async (req, res) => {
  try {
    const { userName } = req.headers;
    const productData = {
      ProductCreatedBy: userName,
      ...req.body,
    };
    const result = await ProductModel.create(productData);
    res.status(201).json({
      status: "successfully create Product",
      data: result,
    });
  } catch (error) {
    mongooseErrorHandle(error, res);
  }
};
module.exports.getProducts = async (req, res) => {
  try {
    const result = await ProductModel.find({}, { name: 1, price: 1 });
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    mongooseErrorHandle(error, res);
  }
};