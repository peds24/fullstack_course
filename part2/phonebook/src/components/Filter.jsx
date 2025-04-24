const Filter = (props) => {
    const {newFilter, handleNewFilter} = props
    return(
      <div>
        Filter names with <input  value={newFilter} onChange={handleNewFilter}/>
      </div>
    )
}

export default Filter