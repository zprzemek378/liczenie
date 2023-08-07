import PersonName from "./PersonName"

const PeopleList = ({ people, removeName }) => {
  return (
    <div className="peopleList">
        <PersonName person={{id: 0, name: ' ', color: '#000000'}} />
        {
            people.map((person) => <PersonName person={person} removeName={removeName} />)
        }   
    </div>
  )
}

export default PeopleList