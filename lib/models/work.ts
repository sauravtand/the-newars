import mongoose, { type Document, Schema } from "mongoose"

export interface MediaFile {
  data: string
  filename: string
  originalName: string
  mimeType: string
  size: number
  uploadedAt: Date
}

export type WorkStatus = "completed" | "ongoing" | "planned"

export interface IWork extends Document {
  _id: string
  title: string
  description: string
  category: string
  status: WorkStatus
  completedDate: Date
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

const WorkSchema = new Schema<IWork>({
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
  category: {
    type: String,
    required: [true, "Category is required"],
    trim: true,
    enum: {
      values: [
        "Cultural Events",
        "Community Service",
        "Educational Programs",
        "Heritage Preservation",
        "Festival Organization",
        "Youth Programs",
        "Social Initiatives",
        "Documentation",
        "Other",
      ],
      message: "Invalid category selected",
    },
  },
  status: {
    type: String,
    enum: {
      values: ["completed", "ongoing", "planned"],
      message: "Status must be completed, ongoing, or planned",
    },
    default: "completed",
  },
  completedDate: {
    type: Date,
    required: [true, "Completed date is required"],
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

WorkSchema.pre("save", function (next) {
  this.updatedAt = new Date()
  next()
})

WorkSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedAt: new Date() })
  next()
})

export default mongoose.models.Work || mongoose.model<IWork>("Work", WorkSchema)
