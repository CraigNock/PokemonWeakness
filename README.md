# Pokemon-Weakness-Finder

- Run up against a Gym Leader and don't recognize that pokemon that just chewed through half your team? 

- Looking to add to your team, but don't want to do the mental gymnastics required to figure out the results of type combinations? 

- Wishing there were a quick and easy way to just find out what'll take down this-pokemon-in-particular?

Wish no longer! <em>Pokemon Weakness Finder</em> delivers exactly what it says! Simply enter a Pokemon name and in seconds get the typings it is weak to and resistant to. 

No fuss. No extra screens. No Team Rocket.

No need to even type the whole name! With our predictive algorithms you can narrow down your pokemon in an instant. All colour coded for clear, easy reading. 


---

Simple TypeScript app for users to swiftly lookup Pokemon and view their type weaknesses/resistances.

Built with TypeScript, JavaScript, React, Node & Express.js.

Live Here: https://pokemonweakness.herokuapp.com/

---

## Screenshots
<div display='flex' flexDirection='row' >
<img width='40%' src='.\client\src\assets\screenshots\screen1.png'/>
<img width='40%' src='.\client\src\assets\screenshots\screen2.png'/>
<img width='40%' src='.\client\src\assets\screenshots\screen3.png'/>
<img width='40%' src='.\client\src\assets\screenshots\screen4.png'/>
<img width='40%' src='.\client\src\assets\screenshots\screen5.png'/>
<img width='40%' src='.\client\src\assets\screenshots\screen6.png'/>
</div>

---

## Installing

 Prerequisites:

- Before you begin, ensure you have you have installed the latest version of Node.js and Yarn.

1. Open up your favourite code editor (such as Visual Studio Code) and git clone the repository.
2. Change directory to the project folder and open the terminal there.
3. In the terminal enter $yarn full-install. Concurrently will be installed, then this dependancy will install all the necessary dependancies for both the Server and the React app. (for your convenience!)
4. Open up a terminal in the server directory and enter $tsc . This will compile the TypeScript files to JavaScript so it's ready to go. 
5. Once step #4 is completed; back in the main terminal enter $yarn dev. This will build the client and run the server.
6. In your browser navigate to "http://localhost:8000/". The server should be serving up the built app there!

---

## Features

- Quick and simple pokemon weakness information from the pokemon **API**.

- **Typeahead** to easier find your pokemon name.

- **Dynamic** Background displays the searched for pokemon's type colors.

