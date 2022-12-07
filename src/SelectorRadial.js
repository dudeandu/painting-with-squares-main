const SelectorRadial = (props) => {
  return (
    <>
      <input 
      type={`radio`} 
      id={`${props.useThisColour}Radial`} 
      name={`colorSelectorRadial`} 
      value={`${props.useThisColour}`} 
      className={`${props.useThisColour}`}
      colourselector={props.useThisColour}
      onClick={props.selectColo}
      />
      <label 
      className="sr-only" 
      htmlFor={`${props.useThisColour}Radial`}>{props.useThisColour}</label>
    </>
  )
}

export default SelectorRadial;