import { useState } from "react";
import Choose from "./components/Choose";
import PickMain from "./components/PickMain";
import Results from "./components/Results";


function App() {
  const [hostMain, setHostMain] = useState(0);
  const [comingPeopleIndex, setComingPeopleIndex] = useState(7);
  const [comingArticleIndex, setComingArticleIndex] = useState(11);
  const [people, setPeople] = useState([
    // {
    //   id: 1,
    //   name: 'Przemo',
    //   color: '#FFFF00',
    //   paid: 9.99
    // },
    // {
    //   id: 2,
    //   name: 'Fabian',
    //   color: '#800080',
    //   paid: 8.98
    // },
    // {
    //   id: 3,
    //   name: 'Kacper',
    //   color: '#FFA500',
    //   paid: 18
    // },
    // {
    //   id: 4,
    //   name: 'Norek',
    //   color: '#00FF00',
    //   paid: 0
    // }
  ]);

  const [articles, setArticles] = useState([
    // {
    //   id: 1,
    //   name: 'Chleb',
    //   price: 5.20,
    //   qty: 1,
    //   owner: 1,
    //   preciseQty: false,
    //   deleted: false,
    //   usedByPeople: [
    //     { personID: 1, took: 0 },
    //     { personID: 2, took: 0 },
    //     { personID: 3, took: 0 },
    //     { personID: 4, took: 0 }
    //   ]
    // },
    // {
    //   id: 2,
    //   name: 'Cola',
    //   price: 18,
    //   qty: 3,
    //   owner: 3,
    //   preciseQty: false,
    //   deleted: false,
    //   usedByPeople: [
    //     { personID: 1, took: 0 },
    //     { personID: 2, took: 0 },
    //     { personID: 3, took: 0 },
    //     { personID: 4, took: 0 }
    //   ]
    // },
    // {
    //   id: 3,
    //   name: 'Energetyk',
    //   price: 4.79,
    //   qty: 1,
    //   owner: 1,
    //   preciseQty: false,
    //   deleted: false,
    //   usedByPeople: [
    //     { personID: 1, took: 0 },
    //     { personID: 2, took: 0 },
    //     { personID: 3, took: 0 },
    //     { personID: 4, took: 0 }
    //   ]
    // },
    // {
    //   id: 4,
    //   name: 'Chipsy',
    //   price: 8.98,
    //   qty: 2,
    //   owner: 2,
    //   preciseQty: false,
    //   deleted: false,
    //   usedByPeople: [
    //     { personID: 1, took: 0 },
    //     { personID: 2, took: 0 },
    //     { personID: 3, took: 0 },
    //     { personID: 4, took: 0 }
    //   ]
    // }
  ]);

  //Add Name
  const addName = (name, color) => {
    setPeople([...people,{id: comingPeopleIndex, name: name, color: color, paid: 0}]);
    const newArticles = articles;
    newArticles.map((article) => (article.usedByPeople = [...article.usedByPeople, { personID: comingPeopleIndex, took: 0 }]));
    setArticles(newArticles);
    setComingPeopleIndex(comingPeopleIndex + 1);
  }
  
  //Remove Name
  const removeName = (nameID) => {
    let errorTab = [];

    articles.map((article) => {
      if(!article.deleted && article.owner == nameID) {
        errorTab.push(article.name);
      }
    })

    if(errorTab.length > 0)
    {
      alert(`Nie można usunąć tej osoby, ponieważ jest ona właścicielem następujących przedmiotów:\n${errorTab.map((errArticle) =>  `- ${errArticle}\n`).join('')}`)
      return;
    }
    
    setPeople(people.filter((name) => name.id !== nameID));
    const newArticles = articles;
    newArticles.map((article) => {
      if(!article.deleted) {
        article.usedByPeople = article.usedByPeople.filter((person) => person.personID != nameID)
      }
    })

    setArticles([...newArticles])
  }

  //Add Article
  const addArticle = (name, price, qty, forOne, owner) => {
    const newArticle = {
      id: comingArticleIndex,
      name: name,
      price:forOne ? qty*price : price,
      qty: qty,
      owner: owner,
      preciseQty: false,
      deleted: false,
      usedByPeople: 
        people.map((person) => ({ personID: person.id, took: 0}))
      };

      const newPeople = people;
      newPeople.find((person) => person.id == owner).paid += forOne ? qty*price : price;
      setPeople([...newPeople]);
      

    setArticles([...articles, newArticle]);
    setComingArticleIndex(comingArticleIndex + 1);
  }

  //Remove Article
  const removeArticle = (articleID) => {
    const newPeople = people;
    const newArticles = articles;

    const owner = newArticles.find((article) => article.id == articleID).owner;
    newPeople.find((person) => person.id == owner).paid -= newArticles.find((article) => article.id == articleID).price;

    newArticles.find((article) => article.id == articleID).deleted = true;

    setPeople([...newPeople]);
    setArticles([...newArticles]);
  }

  //Changed Checkbox
  const changedCheckbox = (state, newPersonID, newArticleID, preciseQty) => {
    const newArticles = articles;
    ((newArticles.find((article) => (article.id == newArticleID))).usedByPeople).find((person) => (person.personID == newPersonID)).took = state;
    newArticles.find((article) => (article.id == newArticleID)).preciseQty = preciseQty;

    setArticles([...newArticles]);
  }

  return (
    <div className="container">
      <div className="header"><h2>Liczenie kosztów imprezy by Przemo v3</h2></div>
      <PickMain
      addName={addName}
      people={people}
      addArticle={addArticle}
      />

      <Choose
      people={people}
      articles={articles}
      removeName={removeName}
      removeArticle={removeArticle}
      changedCheckbox={changedCheckbox}
      setHostMain={setHostMain}
      />

      <Results
      articles={articles}
      people={people}
      host={hostMain}
      setHost={setHostMain}
      />
    </div>
  );
}

export default App;
