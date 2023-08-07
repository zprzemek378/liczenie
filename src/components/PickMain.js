import PickArticle from "./PickArticle"
import PickPeople from "./PickPeople"


const PickMain = ({ addName, people, addArticle }) => {
  return (
    <div className="pickMain">
        <PickPeople addName={addName}/>
        <PickArticle people={people} addArticle={addArticle}/>
    </div>
  )
}

export default PickMain