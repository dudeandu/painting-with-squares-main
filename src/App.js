import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Working</h1>
      </header>
    </div>
  );
}

export default App;

// Create an array that will contain the information as ones and zeros that will be used to fill the squares. Could be a 3D array if that helps locate square components in the drawing board easier.

// As the page loads use useEffect to generate a grid of squares (aka drawing board) using a map function to append(right word?!) components to a container in App.js. Each component will have an id that will be used to track changes 

// Once al components are loaded a call will be made to firebase to get the current status of the array, and the use a map function in combination with useState to draw the squares to the current color

// Each square component in the drawing board will have an onClick function that will pass some props [index: for locating within the array and color: to generate the colour] to an onChange function which will then use the set function from firebse to update the array on the database

// I feel like I'm missing something... 