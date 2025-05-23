import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      index: true,
      unique: true,
      lowercase: true,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    userPosts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  },
  { timestamps: true }
);

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
})
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
