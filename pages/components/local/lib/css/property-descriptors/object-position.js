"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectPosition = void 0;
var parser_1 = require("../syntax/parser");
var length_percentage_1 = require("../types/length-percentage");
exports.objectPosition = {
    name: 'object-position',
    initialValue: '50% 50%',
    type: 1 /* LIST */,
    prefix: false,
    parse: function (_context, tokens) {
        return parser_1.parseFunctionArgs(tokens)
            .map(function (values) { return values.filter(length_percentage_1.isLengthPercentage); })
            .map(length_percentage_1.parseLengthPercentageTuple)[0];
    }
};
//# sourceMappingURL=object-position.js.map