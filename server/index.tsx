export {}
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 8000;


//or without body-parser (may be built into express depending on version):> app.use(express.json()) does same thing;
app.use(bodyParser.json()); 
app.use(cors());
// may not need following if using cors
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*' );
  res.header('Access-Control-Allow-Methods', 'OPTIONS, HEAD, GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
  }
);

app.get('/', (req, res) => {
  res.send('hello there');
})


app.listen(PORT, ()=>{console.log(`Listening on Port ${PORT}`);});