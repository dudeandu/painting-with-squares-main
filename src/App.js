import './App.css';
import app from './firebase.js';
import { useState, useEffect } from 'react';
import { getDatabase, ref, set, get } from 'firebase/database';
import Box from './Box';
import SelectorRadial from './SelectorRadial';

function App() {

  // STEP 1: On load check if there is an available database, if not run the function that will build an array into firebase. Once the database is set, use get to build an array into a js variable, that will then be used to draw the first boxes

  //Fill up an array with 0 the same size as totalBoxes
  const [boxArray, setBoxArray] = useState([]);
  
  // number of boxes the drawing board will have
  const totalBoxes = 3000;

  // STEP 6: build components that will serve as the colour selectors. every time the user clicks on one of them , a state will change that will then update colours of the clocked Box classes to that colour, and update the DB
  
  // array with all the colours
  const colArray = ['blue','green','yellow','orange','red','purple','black','white']
  // asign a state the value of the selected colour starting with black
  const [selectedColour, setSelectedColour] = useState('black')
  
  //set the database with the array 
  useEffect( () => {
    //connect to the database
    const database = getDatabase(app);
    const dbRef = ref(database);
    
    //function that be called if the database is empty, and then fill the database
    const makeDatabase = () => {
      //fill the database to a random selection boxes 
      let databaseConstructor = [];
      for ( let i = 0; i < totalBoxes; i++ ) {
        databaseConstructor.push('white')
      }
      set(dbRef, databaseConstructor)
    }
    // get the database
    get(dbRef)
    .then( (snapshot) => {
      // check if there's a database
      if(snapshot.exists()){
        // if ther is a database setup use setBoxArray to update boxArray with the contents of the database
        // turn the function on/off to build a database every time the page loads. It's great for testing
        // makeDatabase();
        setBoxArray(snapshot.val());
      } else {
        // build the database otherwise
        makeDatabase();
      }
    }).catch((error) => {
      alert("No data available. Try reloading the page, or come back tomorrow because too many people are using this supper super fun app")
      console.log(error)
    })

  },[]);


  // function that assigns a colour to the selectedColour state when user clicks on one of the ColourSelector buttons. This function also adds the class 'selected' to the button
  const selectColo = (e) => {
    const colour = e.target.attributes.colourselector.value;
    setSelectedColour(colour)

  };

  
  return (
    <div className="App">
      <header>
        <h1>Collective cross stitching</h1>
        <h2>Click on the squares and have fun</h2>
      </header>
      <main>
      {/* STEP 2: Gnerate the same number of squares based on the length of the database's array using components called "squares". Give the squares a function that will be called on click, and will use a class, asigned by the firebase array, to change the colour of the square */}
      <div className="wrapper">
        <div className="colourSelectorContainer">
          <form>
            { colArray.map( (singleColour,i) => {
              return (
                <SelectorRadial 
                key={`colourSelector${i}`}
                useThisColour={singleColour}
                selectColo={selectColo}              
                />
                )
                
              })
            }
          </form>
        </div>

        <div className='drawingBoard'>
          
          { boxArray.map( (singleBox, i) => {
              return (
                    <Box 
                      key= {`reactkey${i}`}
                      id={ `box${i}` }
                      arrayIndex={ i }
                      asignedData={ singleBox }
                      selectedColour={ selectedColour }
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