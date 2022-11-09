// @desc      Get all brands
// @route     GET /api/v1/brands
// @access    Public
exports.getBrands = (req, res, next) => {
    res.status(200).json({ success: true, msg: 'Show all brands' });
  };

  // @desc      Get single brand
  // @route     GET /api/v1/brands/:id
  // @access    Public
  exports.getBrand = (req, res, next) => {
    res
      .status(200)
      .json({ success: true, msg: `Show brand ${req.params.id}` });
  };

  // @desc      Create new brand
  // @route     POST /api/v1/brands
  // @access    Private
  exports.createBrand = (req, res, next) => {
    res.status(200).json({ success: true, msg: 'Create new brand' });
  };

  // @desc      Update brand
  // @route     PUT /api/v1/brands/:id
  // @access    Private
  exports.updateBrand = (req, res, next) => {
    res
      .status(200)
      .json({ success: true, msg: `Update brand ${req.params.id}` });
  };

  // @desc      Delete brand
  // @route     DELETE /api/v1/brands/:id
  // @access    Private
  exports.deleteBrand = (req, res, next) => {
    res
      .status(200)
      .json({ success: true, msg: `Delete brand ${req.params.id}` });
  };