const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_ACCESS_KEY,
  api_secret: process.env.SECRET_ACCESS_KEY,
});

const uploadCloud = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("File uploaded successfully", response.url);
    return response;
  } catch (error) {
    console.error("File uploading failed", error);

    try {
      fs.unlinkSync(localFilePath);
      console.log("Local file deleted successfully");
    } catch (unlinkError) {
      console.error("Failed to delete local file", unlinkError);
    }
    return null;
  }
};

module.exports = { cloudinary, uploadCloud };
