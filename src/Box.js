import app from './firebase.js';
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';

const Box = (props) => {
  // state for the box's colour class
  const [boxColor, setBoxColor] = useState('')
  //set the box's colour
  useEffect( () => {
    setBoxColor(props.asignedData === 0 ? `white` : `black`)
    // console.log("box updted");
  }, [boxColor] )
  
  //connect to the database
  const database = getDatabase(app);
  const boxRef = ref(database, `/${props.arrayIndex}`)
  
  
  //set the box's colour
  // useEffect( () => {
  //   setBoxColor(props.asignedData === 0 ? `white` : `black`)
  // }, [] )

  // onValue(boxRef, (response) => {
  //   // here we use Firebase's .val() method to parse our database info the way we want it
  //   setBoxColor(props.asignedData === 0 ? `white` : `black`)
  //   // console.log(response.val())
  // })

    
  return (
    <div 
      className={`box ${boxColor}`}
      id={props.id}
      onClick={props.classToggler}
      arrayindex={props.arrayIndex}
      asigneddata={props.asignedData}
    >
    </div>
  )
}

export default Box;