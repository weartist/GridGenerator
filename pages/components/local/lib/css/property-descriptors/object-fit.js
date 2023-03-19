"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectFit = void 0;
exports.objectFit = {
    name: 'object-fit',
    initialValue: 'fill',
    prefix: false,
    type: 2 /* IDENT_VALUE */,
    parse: function (_context, objectFit) {
        switch (objectFit) {
            case 'contain':
                return "contain" /* CONTAIN */;
            case 'cover':
                return "cover" /* COVER */;
            case 'none':
                return "none" /* NONE */;
            case 'scale-down':
                return "scale-down" /* SCALE_DOWN */;
            case 'fill':
            default:
                return "fill" /* FILL */;
        }
    }
};
//# sourceMappingURL=object-fit.js.map