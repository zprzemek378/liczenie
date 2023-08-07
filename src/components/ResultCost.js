const ResultCost = ({ sendPriceOfPerson, people }) => {
    const sumPeoplePrices = (people) => {
      let sum = 0;
      for(let i=0; i<people.length ; i++) {
        sum += people[i].paid;
      }
      return sum
    }
  return (
    <div>{
        sendPriceOfPerson.map((elem, index) => (<p>Koszt osoby {people.find((person) => elem.id == person.id).name} wynosi {elem.priceOf.toFixed(2)} zł</p>))
        }
        <br></br>
        <p>Całkowity koszt imprezy: {sumPeoplePrices(people)}</p>
    </div>
  )
}

export default ResultCost