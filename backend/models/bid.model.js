const { default: mongoose } = require("mongoose");

const bidSchema = mongoose.Schema(
  {
    userImage: String,
    userName:String,
    createdBy: String,
    bidAmount: Number,
    productId: String,
    productName:String,
  },
  {
    timestamps: true,
  }
);

const BidModel = mongoose.model("bid", bidSchema);
module.exports = BidModel;
