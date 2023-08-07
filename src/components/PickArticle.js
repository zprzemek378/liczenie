import { useState } from "react";
import InformationCircle from "./InformationCircle";


const PickArticle = ({ people, addArticle }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(null);
  const [qty, setQty] = useState('1');
  const [forOne, setForOne] = useState(false);
  const [owner, setOwner] = useState(0);

  const onSubmit = (e) => {
    e.preventDefault();
    if(!name) {
      alert('Wpisz nazwę przedmiotu!');
      return;
    }
    if(!price) {
      alert('Wpisz cenę przedmiotu!');
      return;
    }
    if(!qty) {
      alert('Wpisz ilość!');
      return;
    }
    if(owner == 0) {
      alert('Wybierz własciciela przedmiotu!');
      return;
    }

    addArticle(name, Number(price), Number(qty), forOne, Number(owner));

    setName('');
    setPrice('');
    setQty('1');
    setForOne(false);
  }


  return (
    <div className="pickArticle">
      <form>
        <p>Dodaj przedmiot:</p>


        <br></br>

        <div style={{display:'flex', justifyContent:'center'}}>
            <input type="text" placeholder="Nazwa produktu" value={name} onChange={(e) => setName(e.target.value)}></input>
            &nbsp;&nbsp;&nbsp;
            <input type="number" placeholder="Cena produktu" min={0} value={price} onChange={(e) => setPrice(e.target.value)} ></input>
        </div>

        <br></br>

        <div style={{display:'flex', justifyContent:'center'}}>
          <input type="number" placeholder="Ilość" min={0} value={qty} onChange={(e) => setQty(e.target.value)}></input>
          <InformationCircle text={'Ilość przedmiotów, np. "6", jeśli zakupiono sześciopak.'}/>
          &nbsp;&nbsp;&nbsp;
          <input type="checkbox" checked={forOne} onChange={(e) => setForOne(e.currentTarget.checked)}></input> <p style={{fontSize:'12px'}}>&nbsp;Cena za sztukę?</p>


        <InformationCircle text={'Zaznacz, jeśli podana cena jest za jeden przedmiot, odznacz jeśli jest to cena za całość.'}/>
          
        </div>

        <br></br>

        <select value={owner} onChange={(e) => setOwner(e.target.value)}>
              <option disasbled selected hidden value={0}>Właściciel produktu</option>
              {
                people.map((person) => <option value={person.id}>{person.name}</option>)
              }
        </select>

        <br></br>


        <button className="btn" onClick={onSubmit}>Dodaj</button>
      </form>
    </div>
  )
}

export default PickArticle