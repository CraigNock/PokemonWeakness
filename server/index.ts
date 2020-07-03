export {}
import express, { RequestHandler } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import request from 'request-promise';
import morgan from 'morgan';
import { TYPES, TYPE_ORDER, TYPE_CHART, ALL_NAMES } from './typeChart';

const app: express.Application = express();
const PORT = process.env.PORT || 8000;


// const random = (min: number, max: number): number => {
//   let rand = Math.floor(Math.random()*(max-min) + min);
//   // console.log('rand', rand);
//   return rand;
// };

// const pokemonHandler: RequestHandler = async (req, res) => {
//   let pokeData = await request('https://pokeapi.co/api/v2/gender/1/');
//   pokeData = JSON.parse(pokeData);
//   let randomPoke = random(0, 683);
//   // console.log('pokeData', pokeData);
//   let colorPath = pokeData.pokemon_species_details[randomPoke].pokemon_species.url;
//   console.log('pokemon_species_details', pokeData.pokemon_species_details.length);
//   let pokeColor = await request(`${colorPath}`);
//   pokeColor = JSON.parse(pokeColor);
//   console.log('pokeColor', pokeColor.color.name);
//   let returnPoke = {
//     name: pokeData.pokemon_species_details[randomPoke].pokemon_species.name,
//     color: pokeColor.color.name,
//     eggGroup: pokeColor.egg_groups[0].name
//   };
//   res.json(returnPoke);
// };

interface objectThing {
  [key: string]: number
};

const sortWeakness = (typearr: string[]) => {
  let weaknesses: objectThing = {};
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

interface typeEntry {
  slot: number,
  type: {
    name: string,
    url: string,
  },
}
const pokemonTypeHandler: RequestHandler = async (req, res) => {
  const { name } = req.params;
  if (ALL_NAMES.indexOf(name.toLowerCase()) !== -1) {
    try {
      let pokeData = await request(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}/`);
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
        weaknesses: sortedWeak
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

app.get('/', (req, res) => {
  res.send('hi');
});
// app.get('/pokemon', pokemonHandler);
app.get('/pokemon/:name', pokemonTypeHandler);


app.listen(PORT, ()=>{console.log(`Listening on Porto ${PORT}`);});