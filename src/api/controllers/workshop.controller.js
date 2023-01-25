const httpStatus = require("http-status");
const mongoose = require("mongoose");
const workshopModel = require("../models/workshop.model");
const APIError = require("../utils/APIError");

// GET v1/workshop  Public
exports.getAll = async (req, res, next) => {
  try {
    const workshop = await workshopModel.find();

    if (!workshop) {
      throw new APIError({
        message: "Workshop Not Found",
        isPublic: true,
        status: httpStatus.NOT_FOUND,
      });
    }

    res.status(httpStatus.OK);
    res.json({
      data: workshop,
    });
  } catch (error) {
    next(error);
  }
};

// POST v1/workshop  ADMIN-COACH Perimision
exports.create = async (req, res, next) => {
  try {
    const {
      title,
      description,
      subject,
      date,
      coach_tag,
      duration,
      max_quantity,
      is_free,
      amount,
      image,
    } = req.body;

    const transferBodyData = {
      title,
      description,
      subject,
      date,
      coach_tag: Array.isArray(coach_tag) ? coach_tag : [],
      duration,
      amount: amount ? amount : 0,
      is_free: amount === 0 || !amount || is_free ? true : false,
      max_quantity,
      image,
      coach: req.user && req.user._id,
    };

    const newWorkshop = new workshopModel(transferBodyData);
    const savedWorkshop = await newWorkshop.save();

    if (!savedWorkshop) {
      throw new APIError({
        message: "You can Not create workshop",
        status: httpStatus.BAD_REQUEST,
        isPublic: true,
      });
    }

    res.status(httpStatus.CREATED);
    res.json({
      data: savedWorkshop,
    });
  } catch (error) {
    next(error);
  }
};

// PUT v1/workshop  ADMIN-COACH Perimision
exports.update = async (req, res, next) => {
  try {
    if (!req.params.workshopId.toString()) {
      throw new APIError({
        message: "Please Send Workshop ID for update that",
        isPublic: true,
        status: httpStatus.BAD_REQUEST,
      });
    }

    // Check Valid Merchant ID Params
    if (!mongoose.Types.ObjectId.isValid(req.params.workshopId)) {
      throw new APIError({
        message: "Workshop Not Found",
        isPublic: true,
        status: httpStatus.NOT_FOUND,
      });
    }

    const workshop = await workshopModel.findById(
      req.params.workshopId.toString()
    );
    if (!workshop) {
      throw new APIError({
        message: "Workshop Not Found",
        isPublic: true,
        status: httpStatus.NOT_FOUND,
      });
    }

    const {
      title,
      description,
      subject,
      date,
      coach_tag,
      duration,
      max_quantity,
      is_free,
      amount,
      image,
    } = req.body;

    const coachTag =
      coach_tag && Array.isArray(coach_tag) ? coach_tag : workshop.coach_tag;

    const transferBodyData = {
      title: title ? title : workshop.title,
      description: description ? description : workshop.description,
      subject: subject ? subject : workshop.subject,
      date: date ? date : workshop.date,
      coach_tag: coachTag,
      duration: duration ? duration : workshop.duration,
      amount: amount ? amount : workshop.amount,
      is_free: is_free || workshop.is_free,
      max_quantity: max_quantity || workshop.max_quantity,
      image: image || workshop.image,
      last_edit_by: req.user && req.user._id,
    };

    workshop.set(transferBodyData);
    const updatedWorkshop = await workshop.save();

    if (!updatedWorkshop) {
      throw new APIError({
        message: "Update workshop Failed",
        status: httpStatus.BAD_REQUEST,
        isPublic: true,
      });
    }

    res.status(httpStatus.OK);
    res.json({
      data: updatedWorkshop,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete user
 * @public
 */
exports.delete = async (req, res, next) => {
  try {
    // Check Valid Merchant ID Params
    const workshopId = req.params.workshopId;
    if (!mongoose.Types.ObjectId.isValid(workshopId)) {
      throw new APIError({
        message: "Workshop Not Found",
        isPublic: true,
        status: httpStatus.NOT_FOUND,
      });
    }

    const workshop = await workshopModel.findById(workshopId);

    if (!workshop || typeof workshop !== "object") {
      throw new APIError({
        message: "Workshop Not Found",
        isPublic: true,
        status: httpStatus.NOT_FOUND,
      });
    }

    // -----

    workshop.set({ safe_delete: true });
    const workshopDeleted = await workshop.save();

    if (!workshopDeleted) {
      throw new APIError({
        message: "Workshop Can Not Delete",
        isPublic: true,
        status: httpStatus.BAD_REQUEST,
      });
    }

    res.status(httpStatus.OK);
    res.json({
      data: workshopDeleted || true,
    });
  } catch (error) {
    next(error);
  }
};
