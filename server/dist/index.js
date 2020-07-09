"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path = __importStar(require("path"));
const cors_1 = __importDefault(require("cors"));
const request_promise_1 = __importDefault(require("request-promise"));
const morgan_1 = __importDefault(require("morgan"));
const typeChart_1 = require("./typeChart");
const app = express_1.default();
const PORT = process.env.PORT || 8000;
;
const sortWeakness = (typearr) => {
    let weaknesses = {};
    typearr.forEach(entry => {
        let order = typeChart_1.TYPE_ORDER[entry];
        typeChart_1.TYPES.forEach(element => {
            if ((typeChart_1.TYPE_CHART[element])[order] === 2) {
                weaknesses[element] = (weaknesses[element] || 1) * 2;
            }
            else if ((typeChart_1.TYPE_CHART[element])[order] === 0.5) {
                weaknesses[element] = (weaknesses[element] || 1) * .5;
            }
            else if ((typeChart_1.TYPE_CHART[element])[order] === 0) {
                weaknesses[element] = (weaknesses[element] || 1) * 0;
            }
            ;
        });
    });
    return weaknesses;
};
const pokemonTypeHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    if (typeChart_1.ALL_NAMES.indexOf(name.toLowerCase()) !== -1) {
        let cleanName = name.replace(/[ ]/g, "-");
        cleanName = cleanName.replace(/[.:]/g, "");
        try {
            let pokeData = yield request_promise_1.default(`https://pokeapi.co/api/v2/pokemon/${cleanName.toLowerCase()}/`);
            pokeData = JSON.parse(pokeData);
            console.log('pokeData', pokeData);
            let typeArr = pokeData.types.map((entry) => {
                return entry.type.name;
            });
            let sortedWeak = sortWeakness(typeArr);
            let returnType = {
                status: 200,
                id: pokeData.id,
                name: pokeData.name,
                types: typeArr,
                weaknesses: sortedWeak,
                sprite: pokeData.sprites.front_default
            };
            res.json(returnType);
        }
        catch (err) {
            () => {
                console.log('type err', err);
                res.json({
                    status: 404,
                });
            };
        }
    }
    else {
        res.json({
            status: 404,
        });
    }
    ;
});
app.use(express_1.default.static(path.join(__dirname, '../../client/build')));
app.use(body_parser_1.default.json());
app.use(cors_1.default());
app.use(morgan_1.default('tiny'));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, HEAD, GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.get('/pokemon/:name', pokemonTypeHandler);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '../../client/build/index.html'));
});
app.listen(PORT, () => { console.log(`Listening on Porto ${PORT}`); });
//# sourceMappingURL=index.js.map