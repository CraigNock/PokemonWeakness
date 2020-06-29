"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var app = express_1.default();
var PORT = process.env.PORT || 8000;
//or without body-parser (may be built into express depending on version):> app.use(express.json()) does same thing;
app.use(body_parser_1.default.json());
app.use(cors_1.default());
// may not need following if using cors
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, HEAD, GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.get('/', function (req, res) {
    res.send('hello there');
});
app.listen(PORT, function () { console.log("Listening on Port " + PORT); });
