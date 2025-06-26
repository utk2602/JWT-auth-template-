import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
      trim: true,
      lowercase: true,
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [20, "Name cannot be more than 20 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (value: string): boolean {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: [5, "The password length should be at least 5"],
      select: false,
    },
  },
  {
    timestamps: true,
    collection: "users-data",
  }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
export { IUser };
