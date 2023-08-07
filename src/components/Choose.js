import PeopleList from "./PeopleList"
import ArticleList from "./ArticleList"
import { useState } from "react"

const Choose = ({ people, articles, removeName, removeArticle, changedCheckbox, setHostMain }) => {
  const [host, setHost] = useState(0);

  const setHostFunc = (val) => {
    setHost(val);
    setHostMain(val);
  }

  return (
    <div className="choose">
      <div style={{display:'grid', justifyItems:'center', marginBottom:'15px'}}>
        <div>Wybierz właściciela imprezy:</div>
        <select className="btn" value={host} onChange={(e) => setHostFunc(e.target.value)}>
              <option selected value={0}>Automatycznie</option>
              {
                people.map((person) => <option value={person.id}>{person.name}</option>)
              }
        </select>
      </div>

        <PeopleList people={people} removeName={removeName}/>
        <ArticleList people={people} articles={articles} removeArticle={removeArticle} changedCheckbox={changedCheckbox}/>
    </div>
  )
}

export default Choose