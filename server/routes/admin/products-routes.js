const express = require("express");

const {
  handleImageUpload,
  addProduct,
  editProduct,
  fetchAllProducts,
  deleteProduct,
  getSingleProduct,
} = require("../../controllers/admin/products-controller");

const { authMiddleware, adminMiddleware } = require("../../controllers/auth/auth-controller");

const { upload } = require("../../helpers/cloudinary");

const router = express.Router();

router.post("/upload-image", authMiddleware, adminMiddleware, upload.single("my_file"), handleImageUpload);
router.post("/add", authMiddleware, adminMiddleware, addProduct);
router.put("/edit/:id", authMiddleware, adminMiddleware, editProduct);
router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteProduct);
router.get("/get", authMiddleware, adminMiddleware, fetchAllProducts);
router.get("/get/:id", authMiddleware, adminMiddleware, getSingleProduct);

module.exports = router;
