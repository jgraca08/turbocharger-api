const ErrorResponse = require('../utils/errorResponse');
const Brand = require('../models/Brand')
const asyncHandler = require('../middleware/async');


// @desc      Get all brands
// @route     GET /api/v1/brands
// @access    Public
exports.getBrands = asyncHandler( async (req, res, next) => {
  console.log(req.query);

  let queryStr = JSON.stringify(req.query);
  console.log(queryStr);
  //Acrescenta o $ na rota para usar as expressões
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
  console.log(queryStr);
  let query;
  query = Brand.find(JSON.parse(queryStr));
  const brands = await query;

    res
      .status(200)
      .json({ success: true, count: brands.length, data: brands });
  
  });

  // @desc      Get single brand
  // @route     GET /api/v1/brands/:id
  // @access    Public
  exports.getBrand = asyncHandler( async (req, res, next) => {
    
   
      const brand = await Brand.findById(req.params.id);

      if (!brand) {
        return next(new ErrorResponse(`Brand not found with id of ${req.params.id}`, 404));
      }

      res.status(200).json({ success: true, data: brand });
  });

  // @desc      Create new brand
  // @route     POST /api/v1/brands
  // @access    Private
  exports.createBrand = asyncHandler( async (req, res, next) => {
    //console.log(req.body); //Retorna na consola o que enviamos no Postman
  
      const brand = await Brand.create(req.body);

      res.status(201).json({
        success: true,
        data: brand
      });
  });

  // @desc      Update brand
  // @route     PUT /api/v1/brands/:id
  // @access    Private
  exports.updateBrand = asyncHandler( async (req, res, next) => {
  
      const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });

      if (!brand) {
        // return res.status(400).json({ success: false });
        return next(new ErrorResponse(`Brand not found with id of ${req.params.id}`, 404));
      }

      res.status(200).json({ success: true, data: brand });
  });

  // @desc      Delete brand
  // @route     DELETE /api/v1/brands/:id
  // @access    Private
  exports.deleteBrand = asyncHandler( async (req, res, next) => {
    
      const brand = await Brand.findByIdAndDelete(req.params.id);

      if (!brand) {
        // return res.status(400).json({ success: false });
        return next(new ErrorResponse(`Brand not found with id of ${req.params.id}`, 404));
      }

      res.status(200).json({ success: true, data: {} });
  });