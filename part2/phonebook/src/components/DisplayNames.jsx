const DisplayNames = (props) => {
    const {persons, newFilter, deleteName} = props
    return (
      <div>
        {persons.filter(person => 
          person.name.toLowerCase().includes(newFilter.toLowerCase())
        ).map(person =>
          <p key={person.id}>
            {person.name} {person.number} <button onClick={() => deleteName(person.id)}>delete</button>
          </p>
        )}
      </div>
    )
}
export default DisplayNames