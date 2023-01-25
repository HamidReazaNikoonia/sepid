const mongoose = require("mongoose");
// const moment = require("moment-timezone");

/**
 * User Schema
 * @private
 */
const workshopSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlength: 6,
      maxlength: 128,
    },
    description: {
      type: String,
      trim: true,
      minlength: 5,
      maxlength: 1500,
    },
    subject: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 128,
    },
    date: {
      type: Date,
      required: true,
    },
    coach_tag: {
      type: [String],
      minlength: 6,
      maxlength: 128,
    },
    feedback: {
      type: [
        {
          user: mongoose.Types.ObjectId,
          message: String,
        },
      ],
    },
    is_free: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      required: true,
      minlength: 15,
      maxlength: 300,
    },
    amount: {
      type: Number,
      required: true,
      minlength: 1000,
    },
    max_quantity: {
      type: Number,
      minlength: 1,
      maxlength: 99,
    },
    users: [
      {
        user: mongoose.Types.ObjectId,
        payment_status: Boolean,
      },
    ],
    image: {
      type: mongoose.Types.ObjectId,
      ref: "Upload",
      autopopulate: true,
    },
    coach: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      autopopulate: true,
    },
    last_edit_by: {
      type: mongoose.Types.ObjectId,
    },
    safe_delete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

workshopSchema.plugin(require("mongoose-autopopulate"));

/**
 * @typedef User
 */
module.exports = mongoose.model("Workshop", workshopSchema);
