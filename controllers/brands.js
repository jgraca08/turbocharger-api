const ErrorResponse = require('../utils/errorResponse');
const Brand = require('../models/Brand')
const asyncHandler = require('../middleware/async');


// @desc      Get all brands
// @route     GET /api/v1/brands
// @access    Public
exports.getBrands = asyncHandler( async (req, res, next) => {
  console.log(req.query);

  // Copy req.query
  const reqQuery = { ...req.query };
  console.log(req.query);
  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  let queryStr = JSON.stringify(reqQuery);
  
  //Acrescenta o $ na rota para usar as expressões
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  let query;
  query = Brand.find(JSON.parse(queryStr));

   // Select Fields
   if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');

    query = query.select(fields);
  }

   // Sort
   if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

// Pagination
const page = parseInt(req.query.page, 10) || 1;
const limit = parseInt(req.query.limit, 10) || 30;
const startIndex = (page - 1) * limit;
const endIndex = page * limit;
const total = await Brand.countDocuments();

query = query.skip(startIndex).limit(limit);

  const brands = await query;

   // Pagination result (navegação entre páginas)
   const pagination = {};

   if (endIndex < total) {
     pagination.next = {
       page: page + 1,
       limit
     };
   }

   if (startIndex > 0) {
     pagination.prev = {
       page: page - 1,
       limit
     };
   }

    res
      .status(200)
      .json({ success: true,
      count: brands.length,
      pagination,
      data: brands
    });
  
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