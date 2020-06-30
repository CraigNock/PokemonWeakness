export {}
import express, { RequestHandler } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import request from 'request-promise';


const app: express.Application = express();
const PORT = process.env.PORT || 8000;


const random = (min: number, max: number): number => {
  let rand = Math.floor(Math.random()*(max-min) + min);
  // console.log('rand', rand);
  return rand;
};

const pokemonHandler: RequestHandler = async (req, res) => {
  console.log('beef');
  let pokeData = await request('https://pokeapi.co/api/v2/gender/1/');
  pokeData = JSON.parse(pokeData);
  let randomPoke = random(0, 683);
  // console.log('pokeData', pokeData);
  let colorPath = pokeData.pokemon_species_details[randomPoke].pokemon_species.url;
  console.log('pokemon_species_details', pokeData.pokemon_species_details.length);
  let pokeColor = await request(`${colorPath}`);
  pokeColor = JSON.parse(pokeColor);
  console.log('pokeColor', pokeColor.color.name);
  let returnPoke = {
    name: pokeData.pokemon_species_details[randomPoke].pokemon_species.name,
    color: pokeColor.color.name,
    eggGroup: pokeColor.egg_groups[0].name
  };
  res.json(returnPoke);

}




//or without body-parser (may be built into express depending on version):> app.use(express.json()) does same thing;
app.use(bodyParser.json()); 
app.use(cors());
// may not need following if using cors
app.use(function(req : express.Request , res : express.Response, next : express.NextFunction) {
  res.header('Access-Control-Allow-Origin', '*' );
  res.header('Access-Control-Allow-Methods', 'OPTIONS, HEAD, GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
  }
);

app.get('/', (req, res) => {
  res.send('hello there');
});
app.get('/pokemon', pokemonHandler);


app.listen(PORT, ()=>{console.log(`Listening on Porto ${PORT}`);});