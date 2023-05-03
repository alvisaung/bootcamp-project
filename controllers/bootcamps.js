const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");

// @desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public

exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res.json({ success: true, data: bootcamps });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc Get single bootcamps
// @route GET /api/v1/bootcamps/:id
// @access Public

exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.findById(req.params.id);
    res.json({ success: true, data: bootcamps });
  } catch (err) {
    next(err);
  }
};

// @desc Create new bootcamp
// @route POST /api/v1/bootcamps/:id
// @access Private

exports.createBootcamp = async (req, res, next) => {
  try {
    let bootcamp = await Bootcamp.create(req.body);
    return res.status(201).json({ success: true, data: bootcamp });
  } catch (err) {
    return next(err);
  }
};

// @desc Update bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access Private
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!bootcamp) {
      return res.status(400).json({ success: false, message: bootcamp });
    }
    res.json({ success: true, data: bootcamp });
  } catch (err) {
    return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
  }
};

// @desc Delete bootcamp
// @route DELETE /api/v1/bootcamps/:id
// @access Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      return res.status(400).json({ success: false, message: bootcamp });
    }
    res.json({ success: true, data: {} });
  } catch (err) {
    return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
  }
};
