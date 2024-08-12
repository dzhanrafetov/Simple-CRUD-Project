import Product from "../model/productModel";
import { IProduct } from '../model/productModel'; // Import the IProduct interface
import { Request, Response, NextFunction } from "express";

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      message: `Products retrieved successfully`,
      products
    });
  } catch (error) {
    next(error);
  }
}

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, price, image } = req.body as IProduct;

    if (!name || !price || !image) {
      return res.status(400).json({ message: 'Name, price, and image are required' });
    }

    const newProduct = new Product({
      name, price, image
    });
    const savedProduct = await newProduct.save()
    res.status(200).json({
      message: 'Product created successfully',
      product: savedProduct
    })

  } catch (error) {

    next(error);
  }
}
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const { id } = req.params;
    const updates = req.body as IProduct;
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    });

    if (!(updatedProduct)) {
      return res.status(404).json({
        message: "Product not found"
      })
    }
    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct
    })
  } catch (error) {
    next(error)
  }
}

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }
    res.status(200).json({
      message: 'Product Deleted successfully',
      product: deletedProduct
    })
  } catch (error) {
    next(error);
  }

}
