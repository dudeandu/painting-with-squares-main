import './App.css';
import app from './firebase.js';
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, push, remove, set, get } from 'firebase/database';
import Box from './Box';

function App() {

  // STEP 1: On load check if there is an available database, if not run the function that will build an array into firebase. Once the database is set, use get to build an array into a js variable, that will then be used to draw the first boxes

  //Fill up an array with 0 the same size as totalBoxes
  const [boxArray, setBoxArray] = useState([]);

  
  // number of boxes the drawing board will have
  const totalBoxes = 3000;

  //connect to the database
  const database = getDatabase(app);
  const dbRef = ref(database);

  //set the database with the array 
  useEffect( () => {
    
    //function that be called if the database is empty, and then fill the database
    const makeDatabase = () => {
      //fill the database to a random selection boxes 
      let databaseConstructor = [];
      for ( let i = 0; i < totalBoxes; i++ ) {
        databaseConstructor.push(Math.floor(Math.random() * 2))
      }
      set(dbRef, databaseConstructor)
    }
    // get the database
    get(dbRef)
    .then( (snapshot) => {
      // check if there's a database
      if(snapshot.exists()){
        // if ther is a database setup send a nice message to the console, and then use setBoxArray to update boxArray with the contents of the database
        console.log("Here's your data you sexy fuck")
        // turn the function on/off to build a database every time the page loads. It's great for testing
        // makeDatabase();
        setBoxArray(snapshot.val());
      } else {
        // build the database otherwise
        console.log("No data available")
        makeDatabase();
      }
    }).catch((error) => {
      console.log(error)
    })

  },[])


  // STEP 4: this function will be activated on onClick on one oof the Box components.It needs to get the information from the 'colour' prop to update the firebase database, and also change the colour of the box by toggling the class between white and black and then updating the state on the Box.
  const classToggler = (e) => {
    console.log(e.target.attributes.arrayindex.value)

    const arrayIndex = e.target.attributes.arrayindex.value;
    const asignedData = e.target.attributes.asigneddata.value;
    
    const childRef = ref(database, `/${arrayIndex}`)

    console.log(asignedData, asignedData === '0' ? 1 : 0)
    set(childRef, asignedData === '0' ? 1 : 0)
  }

  // STEP 5: Create a function that will monitor changes in the firebase data, and update the boxe's colour state on the user's browser. this will be done by using the onValue function from firebase. I thinkn I have to activate it when the app loads. 
  
  return (
    <div className="App">
      <header>
        <h1>Collective cross stitching</h1>
        <h2>Click on the squares and have fun</h2>
      </header>
      <main>
      {/* STEP 2: Gnerate the same number of squares based on the length of the database's array using components called "squares". Give the squares a function that will be called on click, and will use a class, asigned by the firebase array, to change the colour of the square */}
      <div className="wrapper">
        <div className='drawingBoard'>
          
          { boxArray.map( (singleBox, i) => {
              return (
                    <Box 
                      id={ `box${i}` }
                      arrayIndex={ i }
                      asignedData={ singleBox }
                      classToggler={ classToggler }
                    />
                  )
                }
              ) }
        </div>
      </div>

       
       

      </main>
    
      
    </div>
  );
}

export default App;

// Create an array that will contain the information as ones and zeros that will be used to fill the squares. Could be a 3D array if that helps locate square components in the drawing board easier.

// As the page loads use useEffect to generate a grid of squares (aka drawing board) using a map function to append(right word?!) components to a container in App.js. Each component will have an id that will be used to track changes 

// Once al components are loaded a call will be made to firebase to get the current status of the array, and the use a map function in combination with useState to draw the squares to the current color

// Each square component in the drawing board will have an onClick function that will pass some props [index: for locating within the array and color: to generate the colour] to an onChange function which will then use the set function from firebse to update the array on the database

// I feel like I'm missing something... 