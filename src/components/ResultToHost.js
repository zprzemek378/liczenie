const ResultToHost = ({ sendPriceOfPerson, people, host }) => {
  return (
    <div>{
        sendPriceOfPerson.map((elem) => (elem.id != host && (elem.costForHost > 0 ?
            <p>{people.find((person) => elem.id == person.id).name} przekazuje {people.find((person) => host == person.id).name} {elem.costForHost.toFixed(2)} zł</p>
            :
            <p>{people.find((person) => host == person.id).name} przekazuje {people.find((person) => elem.id == person.id).name} {-1 * elem.costForHost.toFixed(2)} zł</p>
            )))
    }</div>
  )
}

export default ResultToHost