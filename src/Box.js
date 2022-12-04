import app from './firebase.js';
import { useState } from 'react';
import { getDatabase, ref, set } from 'firebase/database';

const Box = (props) => {

  //connect to the database
  const database = getDatabase(app);
  // const dbRef = ref(database)
  
  // needs a hook for the state assigned to change
  const [theAsignmentState, setTheAsignmentState] = useState(props.asignedData)
  
  // state for the box's colour class
  const [boxColor, setBoxColor] = useState(props.asignedData === 0 ? `box white` : `box black`)


  // STEP 4: this function will be activated on onClick on one the Box components. It needs to get the information from the 'colour' prop to update the firebase database, and also change the colour of the box by assigning the class between white and black and then updating the state on the Box.
  const classToggler = (e) => {

    const arrayIndex = e.target.attributes.arrayindex.value;
    const asignedData = e.target.attributes.asigneddata.value;

    const childRef = ref(database, `/${arrayIndex}`)
    
    const newAssignment = asignedData === 0 || asignedData === '0' ? 1 : 0;
    set(childRef, newAssignment)
    setTheAsignmentState(newAssignment)
    
    setBoxColor(newAssignment === 0 || newAssignment === '0' ? `box white` : `box black`)
    
    // console.log(newAssignment === 0 || newAssignment === '0' ? `box white` : `box black`)
  }

    
  return (
    <div 
      className={boxColor}
      id={props.id}
      onClick={classToggler}
      arrayindex={props.arrayIndex}
      asigneddata={theAsignmentState}
    >
    </div>
  )
}

export default Box;