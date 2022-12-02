
import { useState } from 'react';

const Box = (props) => {
  const [boxColor, setBoxColor] = useState( props.asignedData === 0 ? `white` : `black`)
    
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