import catchAsyncError from "../Middleware/CatchAsyncError.js";
import Product from "../models/product.js";
import ErrorHandler from "../utils/errorHandler.js";
import ApiFilters from "../utils/apiFilters.js"

export const getProducts = async (req, res) => {
  const resPerPage=12;
  console.log("user", req.user);
  let apiFilter = new ApiFilters(Product,req.query).search().filter();

  let products= await apiFilter.query;
  const filteredProductsCount= products.length;

  apiFilter= apiFilter.pagination(resPerPage);
  products= await apiFilter.query.clone();

  res.status(200).json({
    filteredProductsCount,
    resPerPage,
    products,
  });
};

export const newProduct = catchAsyncError(async (req, res) => {
  req.body.user = req.user._id;
  const product = await Product.create(req.body);

  res.status(200).json({
    product,
  });
});

export const getProductDetails = catchAsyncError(async (req, res,next) => {
  const product = await Product.findById(req?.params?.id);

  if (!product) {
    return next(new ErrorHandler(404,"Product not found"));
  }

  res.status(200).json({
    product,
  });
});

export const updateProduct = catchAsyncError(async (req, res) => {
  let product = await Product.findById(req?.params?.id);

  if (!product) {
    return next(new ErrorHandler(404,"Product not found"));
  }

  product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {
    new: true,
  });

  res.status(200).json({
    product,
  });
});

export const deleteProduct = catchAsyncError(async (req, res) => {
  const product = await Product.findById(req?.params?.id);

  if (!product) {
    return next(new ErrorHandler(404,"Product not found"));
  }

  await product.deleteOne();

  res.status(200).json({
    message: "Product Deleted",
  });
});
