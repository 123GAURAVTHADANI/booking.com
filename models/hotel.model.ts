const mongoose = require("mongoose");

interface IHotel {
  hotel_name: string;
}

const hotelSchema: IHotel = new mongoose.Schema(
  {
    hotel_name: { type: String, required: true },
    hotel_full_address: { type: String, required: true },
    hotel_contactNo: {
      type: Number,
      required: true,
      unique: true,
      match: [
        "^(+91[-s]?)?[0]?(91)?[789]d{9}$",
        "Please put your valid Phone number",
      ],
    },
    ratings: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    amenties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Amenities",
      },
    ],
    hotel_image: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image",
      },
    ],
    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
      },
    ],
  },
  { timestamps: true }
);

const Hotel = mongoose.models.Hotel || mongoose.model("Hotel", hotelSchema);
export default Hotel;
