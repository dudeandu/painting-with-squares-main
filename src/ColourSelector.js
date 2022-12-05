const ColourSelector = (props) => {
  return (
    <button
      className={`boxSelector ${props.useThisColour}`}
      colourselector={props.useThisColour}
      onClick={props.selectColo}
    >
    </button>
  )
}

export default ColourSelector;