import { useEffect, useState } from "react";
import ErrorOfQty from "../ErrorOfQty";
import ResultCost from "./ResultCost";
import ResultToHost from "./ResultToHost";

const Results = ({articles, people, host, setHost}) => {
    const [sendError, setSendError] = useState([]);
    const [sendPriceOfPerson, setSendPriceOfPerson] = useState([]);
    let isErrorOfQty = [];

    const finalCount = () => {
        isErrorOfQty = [];

        const sumOfTab = (tab) => {
            let sum = 0;   
            for(let i=0; i<tab.length; i++) {
                sum+=tab[i].took;
            }
            return sum;
        }

        const errorOfQty = (article, peoplePerArticle) => {
            isErrorOfQty.push({name: article.name, should: article.qty, is: peoplePerArticle.peoplePerArt})
        }

        const peoplePerArticle = articles
            .map((article) => (
                !article.deleted && 
                    ({id: article.id,
                        peoplePerArt: sumOfTab(article.usedByPeople),
                        articlePrice: article.price,
                        usedByPeople: article.usedByPeople
                    }))).filter(Boolean);

        articles.map((article) => {
            if(!article.deleted) {
                (((peoplePerArticle.find((peopleArticle) => peopleArticle.id == article.id)).peoplePerArt.toFixed(2) != article.qty.toFixed(2) && article.preciseQty) && errorOfQty(article, (peoplePerArticle.find((peopleArticle) => peopleArticle.id == article.id))))}})

        setSendError(...[isErrorOfQty]);

        if(isErrorOfQty.length > 0) return;
        
        let errorOfNonSelecting = [];
        for(let i=0; i<peoplePerArticle.length; i++)
        {
            if(peoplePerArticle[i].peoplePerArt == 0) {
                errorOfNonSelecting.push(articles.find((article) => article.id == peoplePerArticle[i].id).name)
            }
        }
        if(errorOfNonSelecting.length > 0)
        {
          alert(`Te przedmioty nie posiadają żadnego użytkownika:\n${errorOfNonSelecting.map((errArticle) =>  `- ${errArticle}\n`).join('')}`)
          return;
        }



        if(host==0) {
            let paidTheMost = people[0];
            let maxPaid = paidTheMost.paid;
            for(let i=1; i<people.length; i++) {
                if(people[i].paid > maxPaid) {
                    maxPaid = people[i].paid;
                    paidTheMost = people[i]
                }
            }
            setHost(paidTheMost.id);
        }

        const countPriceOf = (personIDOut) => {
            let sum = 0;
            peoplePerArticle.map((article) => sum+=((article.usedByPeople.find((personInArray) => (personInArray.personID == personIDOut))).took)*article.articlePrice/article.peoplePerArt);
            return sum;
        }

        const countCostForHost = (personOut) => {
            return countPriceOf(personOut.id) - personOut.paid;
        }

        const priceOfPerson = people.map((person) => ({id: person.id, priceOf: countPriceOf(person.id), costForHost: countCostForHost(person)}))
        setSendPriceOfPerson([...priceOfPerson])
        // console.log(priceOfPerson)

    }


  return (
    <div className="results">
        <button className="btn" onClick={() => (finalCount())}>Policz</button>

        {sendError.length > 0 ? <ErrorOfQty sendError={sendError}/> :
            <div>
                <br></br>
                <ResultCost sendPriceOfPerson={sendPriceOfPerson} people={people}/>
                <br></br>
                <br></br>
                <ResultToHost sendPriceOfPerson={sendPriceOfPerson} people={people} host={host}/>
            </div>}
    </div>
  )
}

export default Results