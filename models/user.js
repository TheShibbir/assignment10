const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Email address is required"],
      unique: true,
    },
    phone: {
      type: String,
      validate: {
        validator: (v) => /^\+?(88)?0?1[3456789][0-9]{8}\b/.test(v),

        message: (props) =>
          `${props.value} please give a bangladeshi number`,
      },
      required: [true, "phone number is required"],
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: [true, "password required"],
      minLength: [8, "please write minimum 8 length password"],
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },
  },
  { timestamps: true, versionKey: false }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;