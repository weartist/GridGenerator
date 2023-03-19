"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateObjectFitBounds = void 0;
var bounds_1 = require("../css/layout/bounds");
var length_percentage_1 = require("../css/types/length-percentage");
var calculateObjectFitBounds = function (objectFit, objectPosition, naturalWidth, naturalHeight, clientWidth, clientHeight) {
    var naturalRatio = naturalWidth / naturalHeight;
    var clientRatio = clientWidth / clientHeight;
    var objectPositionX = length_percentage_1.getAbsoluteValue(objectPosition[0], 1);
    var objectPositionY = length_percentage_1.getAbsoluteValue(objectPosition[1] || objectPosition[0], 1);
    var srcX, srcY, srcWidth, srcHeight, destX, destY, destWidth, destHeight;
    if (objectFit === "scale-down" /* SCALE_DOWN */) {
        objectFit =
            naturalWidth < clientWidth && naturalHeight < clientHeight
                ? "none" /* NONE */
                : "contain" /* CONTAIN */; // at least one axis is greater or equal in size
    }
    switch (objectFit) {
        case "contain" /* CONTAIN */:
            srcX = 0;
            srcY = 0;
            srcWidth = naturalWidth;
            srcHeight = naturalHeight;
            if (naturalRatio < clientRatio) {
                // snap to top/bottom
                destY = 0;
                destHeight = clientHeight;
                destWidth = destHeight * naturalRatio;
                destX = (clientWidth - destWidth) * objectPositionX;
            }
            else {
                // snap to left/right
                destX = 0;
                destWidth = clientWidth;
                destHeight = destWidth / naturalRatio;
                destY = (clientHeight - destHeight) * objectPositionY;
            }
            break;
        case "cover" /* COVER */:
            destX = 0;
            destY = 0;
            destWidth = clientWidth;
            destHeight = clientHeight;
            if (naturalRatio < clientRatio) {
                // fill left/right
                srcX = 0;
                srcWidth = naturalWidth;
                srcHeight = clientHeight * (naturalWidth / clientWidth);
                srcY = (naturalHeight - srcHeight) * objectPositionY;
            }
            else {
                // fill top/bottom
                srcY = 0;
                srcHeight = naturalHeight;
                srcWidth = clientWidth * (naturalHeight / clientHeight);
                srcX = (naturalWidth - srcWidth) * objectPositionX;
            }
            break;
        case "none" /* NONE */:
            if (naturalWidth < clientWidth) {
                srcX = 0;
                srcWidth = naturalWidth;
                destX = (clientWidth - naturalWidth) * objectPositionX;
                destWidth = naturalWidth;
            }
            else {
                srcX = (naturalWidth - clientWidth) * objectPositionX;
                srcWidth = clientWidth;
                destX = 0;
                destWidth = clientWidth;
            }
            if (naturalHeight < clientHeight) {
                srcY = 0;
                srcHeight = naturalHeight;
                destY = (clientHeight - naturalHeight) * objectPositionY;
                destHeight = naturalHeight;
            }
            else {
                srcY = (naturalHeight - clientHeight) * objectPositionY;
                srcHeight = clientHeight;
                destY = 0;
                destHeight = clientHeight;
            }
            break;
        case "fill" /* FILL */:
        default:
            srcX = 0;
            srcY = 0;
            srcWidth = naturalWidth;
            srcHeight = naturalHeight;
            destX = 0;
            destY = 0;
            destWidth = clientWidth;
            destHeight = clientHeight;
            break;
    }
    return {
        src: new bounds_1.Bounds(srcX, srcY, srcWidth, srcHeight),
        dest: new bounds_1.Bounds(destX, destY, destWidth, destHeight)
    };
};
exports.calculateObjectFitBounds = calculateObjectFitBounds;
//# sourceMappingURL=object-fit.js.map