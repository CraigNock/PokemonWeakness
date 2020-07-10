export {}
import express, { RequestHandler } from 'express';
import bodyParser from 'body-parser';
import * as path from 'path';
import cors from 'cors';
import request from 'request-promise';
import morgan from 'morgan';
import { TYPES, TYPE_ORDER, TYPE_CHART, ALL_NAMES } from './typeChart';

const app: express.Application = express();
const PORT: string | number = process.env.PORT || 8000;


interface numberObject {
  [key: string]: number
};

const sortWeakness = (typearr: string[]) => {
  let weaknesses: numberObject = {};
  typearr.forEach(entry => {
    let order = TYPE_ORDER[entry];
    TYPES.forEach(element => {
      if ((TYPE_CHART[element])[order] === 2) {
        weaknesses[element] = (weaknesses[element] || 1) *2;
      } else if ((TYPE_CHART[element])[order] === 0.5) {
        weaknesses[element] = (weaknesses[element] || 1) *.5;
      } else if ((TYPE_CHART[element])[order] === 0) {
        weaknesses[element] = (weaknesses[element] || 1) *0;
      };
    });
  });
  return weaknesses;
}

const processAbilities = () => {
  //requires hard data of abilities that affect attack types
};

interface typeEntry {
  slot: number,
  type: {
    name: string,
    url: string,
  },
}
const pokemonTypeHandler: RequestHandler = async (req, res) => {
  const { name } = req.params;
  // console.log('name', name);
  if (ALL_NAMES.indexOf(name.toLowerCase()) !== -1) {
    let cleanName = name.replace(/[ ]/g, "-"); //for api readability
    cleanName = cleanName.replace(/[.:]/g, "");
    // console.log('cleanName', cleanName);
    try {
      let pokeData = await request(`https://pokeapi.co/api/v2/pokemon/${cleanName.toLowerCase()}/`);
      pokeData = JSON.parse(pokeData);
      // console.log('pokeData', pokeData);
      let typeArr: string[] = pokeData.types.map((entry: typeEntry) => {
        return entry.type.name;
      })
      // console.log('name, types', pokeData.name, typeArr);
      let sortedWeak = sortWeakness(typeArr);
      // console.log('sortedWeak', sortedWeak);
      let returnType = {
        status: 200,
        id: pokeData.id,
        name: pokeData.name,
        types: typeArr,
        weaknesses: sortedWeak,
        sprite: pokeData.sprites.front_default
        //add ability modifiers separate or add to sortedweak.
      };
      res.json(returnType);
    } catch (err){()=>{
      console.log('type err', err);
      res.json({
        status: 404,
      });
  }}
  } else {
    res.json({
      status: 404,
    });
  };
};


app.use(express.static(path.join(__dirname, '../../client/build')));
//or without body-parser (may be built into express depending on version):> app.use(express.json()) does same thing;
app.use(bodyParser.json()); 
app.use(cors());
app.use(morgan('tiny'));
// may not need following if using cors
app.use(function(req : express.Request , res : express.Response, next : express.NextFunction) {
  res.header('Access-Control-Allow-Origin', '*' );
  res.header('Access-Control-Allow-Methods', 'OPTIONS, HEAD, GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
  }
);

app.get('/pokemon/:name', pokemonTypeHandler);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'../../client/build/index.html'));
});

app.listen(PORT, ()=>{console.log(`Listening on Porto ${PORT}`);});