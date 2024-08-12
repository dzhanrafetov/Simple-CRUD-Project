"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProducts = void 0;
const product_1 = __importDefault(require("../model/product"));
const getProducts = async (req, res) => {
    try {
        const products = await product_1.default.find({});
        res.status(200).json({ success: true, data: products });
    }
    catch (error) {
        console.log("Error in fetching");
        return res.status(500).json({ success: false, message: "Server error!" });
    }
};
exports.getProducts = getProducts;
const createProduct = async (req, res) => {
    const product = req.body;
    if (!(product.name || !product.price || !product.image)) {
        return res.status(400).json({ success: false, message: "Provide all fields!" });
    }
    const newProduct = new product_1.default(product);
    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    }
    catch (error) {
        console.log("Error in Create Product: ", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    try {
        const updatedProduct = await product_1.default.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: updatedProduct });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await product_1.default.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product Deleted" });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.deleteProduct = deleteProduct;
