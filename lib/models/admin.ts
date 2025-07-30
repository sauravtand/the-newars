import mongoose, { type Document, Schema } from "mongoose"

export interface IAdmin extends Document {
  _id: string
  username: string
  passwordHash: string
  createdAt: Date
}

const AdminSchema = new Schema<IAdmin>({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true,
    minlength: [3, "Username must be at least 3 characters"],
    maxlength: [50, "Username cannot exceed 50 characters"],
  },
  passwordHash: {
    type: String,
    required: [true, "Password hash is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema)
