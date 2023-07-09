import slugify from "slugify"
import productModel from "../models/productModel.js"
import fs from 'fs'

export const createProductController = async (req,res) => {
    try {
        const { shipping, quantity, price, description, slug, name, category } =
          req.fields;
          const {photo} = req.files;
        //   validation
        switch (true) {
          case !name:
            return res.status(500).send({ error: "Name is required" });
          // case !shipping:
          //   return res.status(500).send({ error: "Name is required" });
          case !category:
            return res.status(500).send({ error: "category is required" });
          case !description:
            return res.status(500).send({ error: "description is required" });
          case !quantity:
            return res.status(500).send({ error: "quantity is required" });
          case !price:
            return res.status(500).send({ error: "price is required" });
          case photo && photo.size>100000:
            return res.status(500).send({ error: "Photo is required should less then 1MB" });
        } 
        const product = new productModel({...req.fields,slug:slugify(name)})
        if(photo){
          console.log(photo.path);
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }
        await product.save()
        return res.status(201).json({
          success: true,
          message: "Product created successfully",
          product
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
          error,
          success: false,
          message: "Error in creating product",
        });
    }
};


export const getAllProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      total: products.length,
      message: "Product fetched successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
      success: false,
      message: "Error in getting product",
    });
  }
};


export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
      success: false,
      message: "Error in getting product",
    });
  }
};


export const productPhotoController = async (req,res) =>{
  try {
    const product = await productModel
      .findById(req.params.pid)
      .select("photo")
    if(product.photo.data){
      res.set('Content-type',product.photo.contentType)
      return res.status(200).send(product.photo.data);
    }
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
      success: false,
      message: "Error in getting product photo",
    });
  }
}


export const deleteProductController = async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.pid)
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
      success: false,
      message: "Error in deleting product",
    });
  }
};


export const updateProductController = async (req, res) => {
  try {
    const { shipping, quantity, price, description, slug, name, category } =
      req.fields;
    const { photo } = req.files;
    //   validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });
      case !category:
        return res.status(500).send({ error: "category is required" });
      case !description:
        return res.status(500).send({ error: "description is required" });
      case !quantity:
        return res.status(500).send({ error: "quantity is required" });
      case !price:
        return res.status(500).send({ error: "price is required" });
      case photo && photo.size > 100000:
        return res
          .status(500)
          .send({ error: "Photo is required should less then 1MB" });
    }
    const product = await productModel.findByIdAndUpdate(req.params.pid,{...req.fields,slug:slugify(name)},{new:true})
    if (photo) {
      console.log(photo.path);
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
      success: false,
      message: "Error in creating product",
    });
  }
};