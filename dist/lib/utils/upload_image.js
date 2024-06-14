"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const storage_1 = require("firebase/storage");
const firebase_config_1 = require("./firebase.config");
function uploadImage(file, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        const storageFB = (0, storage_1.getStorage)(firebase_config_1.firebaseApp);
        if (quantity === 'single') {
            const dateTime = Date.now();
            const fileName = `images/${dateTime}`;
            const storageRef = (0, storage_1.ref)(storageFB, fileName);
            const metadata = {
                contentType: file.type,
            };
            yield (0, storage_1.uploadBytesResumable)(storageRef, file.buffer, metadata);
            const downloadURL = yield (0, storage_1.getDownloadURL)(storageRef);
            return downloadURL;
        }
        if (quantity === 'multiple') {
            const downloadURLs = [];
            for (let i = 0; i < file.images.length; i++) {
                const dateTime = Date.now();
                const fileName = `images/${dateTime}`;
                const storageRef = (0, storage_1.ref)(storageFB, fileName);
                const metadata = {
                    contentType: file.images[i].mimetype,
                };
                yield (0, storage_1.uploadBytesResumable)(storageRef, file.images[i].buffer, metadata);
                const downloadURL = yield (0, storage_1.getDownloadURL)(storageRef);
                downloadURLs.push(downloadURL);
            }
            return downloadURLs;
        }
    });
}
exports.default = uploadImage;
