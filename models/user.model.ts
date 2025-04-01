const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      minLength: 3,
    },
    last_name: {
      type: String,
      required: true,
      minLength: 3,
    },
    age: {
      type: Number,
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
      match: [
        "^(+91[-s]?)?[0]?(91)?[789]d{9}$",
        "Please put your valid phoen number",
      ],
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "Kindly give a strong password"],
    },
    adhaarCard: {
      type: String,
      required: false,
      unique: true,
      match: [
        "^[0-9]{4}[ -]?[0-9]{4}[ -]?[0-9]{4}$",
        "Please put your valid adhaar card",
      ],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please Provide the valid email address",
      ],
    },
    address: {
      type: String,
      required: true,
      minLength: 5,
    },
    zip_code: {
      type: Number,
      match: ["^[1-9][0-9]{5}$", "Please input the correct zipcode"],
    },
    role: {
      type: String,
      enum: ["SUPER ADMIN", "ADMIN", "USER"],
      default: "USER",
    },
    booking: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
  },
  { timestamps: true }
);

// userSchema.pre("save", function (next) {});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
