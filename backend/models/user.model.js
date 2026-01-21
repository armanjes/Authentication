import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIREY } = process.env;

userSchema.methods.accessToken = function () {
  if (!ACCESS_TOKEN_SECRET) throw new Error("Missing ACCESS_TOKEN_SECRET");

  return jwt.sign({ _id: this._id, name: this.name }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIREY || "1m",
  });
};

const userModel = model("User", userSchema);
export default userModel;
