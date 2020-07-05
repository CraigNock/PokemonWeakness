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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
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
    console.log('name', name);
    let cleanName = name.replace(/[ ]/g, "-");
    cleanName = cleanName.replace(/[.:]/g, "");
    console.log('cleanName', cleanName);
    if (typeChart_1.ALL_NAMES.indexOf(name.toLowerCase()) !== -1) {
        try {
            let pokeData = yield request_promise_1.default(`https://pokeapi.co/api/v2/pokemon/${cleanName.toLowerCase()}/`);
            pokeData = JSON.parse(pokeData);
            let typeArr = pokeData.types.map((entry) => {
                return entry.type.name;
            });
            let sortedWeak = sortWeakness(typeArr);
            let returnType = {
                status: 200,
                id: pokeData.id,
                name: pokeData.name,
                types: typeArr,
                weaknesses: sortedWeak
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
app.use(body_parser_1.default.json());
app.use(cors_1.default());
app.use(morgan_1.default('tiny'));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, HEAD, GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.get('/', (req, res) => {
    res.send('hi');
});
app.get('/pokemon/:name', pokemonTypeHandler);
app.listen(PORT, () => { console.log(`Listening on Porto ${PORT}`); });
//# sourceMappingURL=index.js.map