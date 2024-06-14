"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = require("../../middleware/multer");
const images_upload_1 = require("./controllers/images_upload");
const othersRouter = (0, express_1.Router)();
othersRouter.post('/upload-image', multer_1.upload, images_upload_1.imagesUpload);
exports.default = othersRouter;
