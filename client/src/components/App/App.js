"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var GlobalStyles_1 = __importDefault(require("../../GlobalStyles"));
var App = function () {
    return (react_1.default.createElement(Wrapper, null,
        react_1.default.createElement(GlobalStyles_1.default, null),
        react_1.default.createElement("div", null, "AAAAAPPPPPP")));
};
var Wrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  height: 100vw;\n  width: 100vw;\n"], ["\n  height: 100vw;\n  width: 100vw;\n"])));
exports.default = App;
var templateObject_1;
