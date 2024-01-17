import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import orderModel from "../models/orderModel.js";
import Razorpay from "razorpay";
import fs from "fs";
import slugify from "slugify";
import crypto from "crypto";
import dotenv from "dotenv";
import { sendMail } from "../helpers/sendMail.js";

dotenv.config();

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

export const createProductController = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      quantity,
      shipping,
      availableSizes,
      quality,
    } = req.fields;

    let photos = [];
    let index = 1;

    // Loop to get all photos with dynamic keys
    while (req.files[`photo${index}`]) {
      const file = req.files[`photo${index}`];
      photos.push(file);
      index++;
    }

    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !(availableSizes && availableSizes.length):
        return res.status(500).send({ error: "Available Sizes are Required" });
      case !quality:
        return res.status(500).send({ error: "quality is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case !shipping:
        return res.status(500).send({ error: "shipping is Required" });
      case photos:
        if (!Array.isArray(photos)) {
          photos = [photos];
        }
        for (let i = 0; i < photos.length; i++) {
          if (photos[i].size > 1000000) {
            return res
              .status(500)
              .send({ error: "photo is Required and should be less then 1mb" });
          }
        }
    }
    const products = new productModel({ ...req.fields, slug: slugify(name) });

    if (photos.length > 0) {
      const photosArray = [];

      for (const file of photos) {
        const photoData = fs.readFileSync(file.path);
        const photoContentType = file.type;
        photosArray.push({
          data: photoData,
          contentType: photoContentType,
        });
      }

      products.photo = photosArray;
    }

    console.log(products);
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing product",
    });
  }
};

//get all products
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "ALlProducts ",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};

// get single product
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single product",
      error,
    });
  }
};

// get photo
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");

    if (product.photo && product.photo.length > 0) {
      // Set the content type based on the first photo's contentType
      res.set("Content-type", product.photo[0].contentType);

      // Send each photo in the array
      product.photo.forEach((photo) => {
        res.write(photo.data);
      });

      // End the response
      return res.end();
    } else {
      // Handle the case where there are no photos
      return res
        .status(404)
        .send({ success: false, message: "No photos found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting photos",
      error,
    });
  }
};

// get ALL photo
export const getAllproductPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    // console.log("product server photo side", product);
    if (product.photo && product.photo.length > 0) {
      const photosArray = product.photo.map((photo) => ({
        contentType: photo.contentType,
        data: photo.data.toString("base64"), // Convert buffer to base64 string
      }));
      // console.log(photosArray);

      return res.status(200).json({
        success: true,
        photos: photosArray,
      });
    } else {
      console.log("no photo found");
      // Handle the case where there are no photos
      return res
        .status(404)
        .json({ success: false, message: "No photos found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while getting photos",
      error,
    });
  }
};

//delete controller
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//upate producta
export const updateProductController = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      quantity,
      shipping,
      availableSizes,
      quality,
    } = req.fields;
    let photos = [req.files.photos];
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case !shipping:
        return res.status(500).send({ error: "shipping is Required" });
      case !(availableSizes && availableSizes.length):
        return res.status(500).send({ error: "Available Sizes are Required" });
      case !quality:
        return res.status(500).send({ error: "Quality is Required" });
      case photo:
        if (!Array.isArray(photos)) {
          photos = [photos];
        }
        for (let i = 0; i < photos.length; i++) {
          if (photos[i].size > 1000000) {
            return res
              .status(500)
              .send({ error: "photo is Required and should be less then 1mb" });
          }
        }
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );

    if (photos) {
      const photosArray = [];
      for (const file of photos) {
        const photoData = fs.readFileSync(file.path);
        const photoContentType = file.type;
        photosArray.push({ data: photoData, contentType: photoContentType });
      }
      products.photo = photosArray;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};

// filters
export const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};

// product count
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

// product list base on page
export const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

// search product
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};

// similar products
export const realtedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};

// get prdocyst by catgory
export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};

//payment gateway api
export const razorpayPayment = async (req, res) => {
  const { cart } = req.body;
  let total = 0;
  cart.map((i) => {
    total += i.price;
  });
  console.log(cart, total);
  try {
    const options = {
      amount: Number(total) * 100,
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    console.log(order);
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.log(error);
  }
};

export const razorpayPaymentVerification = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;
    const { cart, auth } = req.query;

    const decodedCart = JSON.parse(decodeURIComponent(cart));
    const decodedauth = JSON.parse(decodeURIComponent(auth));
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    console.log("cart >> ", decodedCart);
    console.log("user >> ", decodedauth);

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");
    console.log(expectedSignature, razorpay_signature);
    if (expectedSignature === razorpay_signature) {
      const order = new orderModel({
        products: decodedCart,
        payment: {
          reference: req.body,
          success: true,
        },
        buyer: decodedauth.user._id,
      });
      await order.save();
      const ORDER = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }

    .container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    h1 {
      color: #333333;
    }

    p {
      color: #666666;
    }

    .button {
      display: inline-block;
      padding: 10px 20px;
      text-decoration: none;
      background-color: #4CAF50;
      color: #ffffff;
      border-radius: 5px;
    }

    .footer {
      margin-top: 20px;
      color: #888888;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Thank You for Your Order, ${decodedauth.user.name}!</h1>
    <p>We are thrilled to confirm that your order has been successfully placed at Mars.</p>
     <p>Your order reference:${razorpay_order_id}</p>
     <p>Your payment reference:${razorpay_payment_id}</p>
     <p>Your order will be shipped to the following address:</p>
    <p>${decodedauth.user.address}</p>
    <p>Please note that your order is expected to be shipped within 3-5 business days.</p>
    <a href="[Link to Order Status]" class="button">Track Your Order</a>
    <p>Thank you for choosing Mars. We appreciate your business and hope you enjoy your new items!</p>
    <div class="footer">
      <p>If you have any questions or concerns regarding your order, feel free to reply to this email or visit our [Contact Us] page on the website.</p>
      <p>Best regards,<br>Manav<br>ceo, Mars clothing</p>
    </div>
  </div>
</body>
</html>

`;
      await sendMail(decodedauth.user.email, "Thank You for Ordering", ORDER);
      console.log(order);
      res.redirect("http://localhost:3000/dashboard/user/orders");
    } else {
      res.status(400).json({ success: false });
    }
  } catch (error) {
    console.log(error);
  }
};
