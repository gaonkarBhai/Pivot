import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        error,
        status: false,
        message: "Name is required",
      });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({
        error,
        status: false,
        message: "Category already exists",
      });
    }
    const category = await categoryModel.create({ name, slug:slugify(name) });
     return res.status(201).json({
       status: true,
       message: "Category created successfully",
       category,
     });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
      status: false,
      message: "Error in creating category",
    });
  }
};


export const updateCategoryController = async (req, res) => {
  try {
    const {name} = req.body
    const {id} = req.params
    const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true}) 
    return res.status(201).json({
       status: true,
       message: "Category updated successfully",
       category,
     });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
      status: false,
      message: "Error in updating category",
    });
  }
};


export const getAllCategoryController = async (req, res) => {
  try {
    
    const category = await categoryModel.find({});
    return res.status(200).json({
      status: true,
      message: "Category fetched successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
      status: false,
      message: "Error in fetching category",
    });
  }
};


export const getSingleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({slug:req.params.slug});
    return res.status(200).json({
      status: true,
      message: "Category fetched successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
      status: false,
      message: "Error in fetching category",
    });
  }
};


export const deleteCategoryController = async (req, res) => {
  try {
    await categoryModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      status: true,
      message: "Category deleted successfully"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
      status: false,
      message: "Error in deteling category",
    });
  }
};
