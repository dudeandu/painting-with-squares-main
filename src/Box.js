import app from './firebase.js';
import { useState, useEffect } from 'react';
import { getDatabase, ref, set, onValue } from 'firebase/database';

const Box = (props) => {

  // const dbRef = ref(database)
  
  // needs a hook for the state assigned to change
  const [theAsignmentState, setTheAsignmentState] = useState(props.asignedData)
  
  // state for the box's colour class
  const [boxColor, setBoxColor] = useState(`box ${props.asignedData}`)


  // STEP 4: this function will be activated on onClick on one the Box components. It needs to get the information from the 'colour' prop to update the firebase database, and also change the colour of the box by assigning the class between white and black and then updating the state on the Box.
  const classToggler = (e) => {


    const arrayIndex = e.target.attributes.arrayindex.value;
    const asignedData = props.selectedColour;

    //connect to the database
    const database = getDatabase(app);
    const childRef = ref(database, `/${arrayIndex}`)
    
    const newAssignment = asignedData;
    set(childRef, newAssignment)
    setTheAsignmentState(newAssignment)
    
    setBoxColor(`box ${newAssignment}`)
  }

  const mouseDowntester = (e) => {
    console.log("mouse down")
  }



  // STEP 5: Create a function that will monitor changes in the firebase data, and update the box's colour state on the user's browser. this will be done by using the onValue function from firebase. I thinkn I have to activate it when the app loads. 
  useEffect( () => {
    //connect to the database
    const database = getDatabase(app);
    const childRef = ref(database, `/${props.arrayIndex}`)
    onValue(childRef, (response) => {
      
      // here we use Firebase's .val() method to parse our database info the way we want it
      const newAssignment = response.val();
      setTheAsignmentState(newAssignment)
      
      setBoxColor(`box ${newAssignment}`)
    })

  },[props.arrayIndex])

    
  return (
    <div 
      className={ boxColor }
      id={props.id}
      arrayindex={props.arrayIndex}
      asigneddata={theAsignmentState}
      onClick={classToggler}
      onMouseDown={ mouseDowntester }
    >
    </div>
  )
}

export default Box;