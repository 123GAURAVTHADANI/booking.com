const mongoose = require("mongoose");

// interface IHotel {
//   hotel_name: string;
// }

const roomSchema = new mongoose.Schema({
  room_name: {
    type: String,
    required: true,
    minLength: 5,
  },
  hotel: {
    type: String,
    required: true,
  },
  amenties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Amenities",
    },
  ],
  room_floor: {
    type: Number,
    required: true,
  },
  room_facing: {
    type: String,
    required: true,
    enum: [
      "North",
      "North-West",
      "North-East",
      "South",
      "South-West",
      "East",
      "West",
    ],
  },
  room_capacity: {
    type: Number,
    required: true,
  },
  room_price: {
    type: Number,
    required: true,
  },
  room_dimension: {
    type: String,
    required: true,
  },
  room_images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },
  ],
  bed_type: { type: String, enum: ["twin", "Queen", "King"], required: true },
  isSmoking: { type: Boolean, default: false },
});

const Room = mongoose.models.Room || mongoose.model("Room", roomSchema);
export default Room;

// - room_name
//     - room_description
//     - room_amenties
//     - room_floor
//     - room_facing
//     - room_capacity
//     - room_pricing
//     - room_dimension
//     - room_images
//     - bed_type :['twin', 'queen', 'king']
//     - isSmoking
