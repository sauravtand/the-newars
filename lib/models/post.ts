import mongoose, { type Document, Schema } from "mongoose"

export interface MediaFile {
  data: string
  filename: string
  originalName: string
  mimeType: string
  size: number
  uploadedAt: Date
}

export interface IPost extends Document {
  _id: string
  title: string
  description: string
  media: MediaFile[]
  createdAt: Date
  updatedAt: Date
}

const MediaSchema = new Schema<MediaFile>({
  data: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  mimeType: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
})

const PostSchema = new Schema<IPost>({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    maxlength: [200, "Title cannot exceed 200 characters"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
    maxlength: [2000, "Description cannot exceed 2000 characters"],
  },
  media: {
    type: [MediaSchema],
    default: [],
    validate: {
      validator: (v: MediaFile[]) => v.length <= 5,
      message: "Cannot have more than 5 media files",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

PostSchema.pre("save", function (next) {
  this.updatedAt = new Date()
  next()
})

PostSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedAt: new Date() })
  next()
})

export default mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema)
