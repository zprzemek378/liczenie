import { useState } from "react"

const PickPeople = ({ addName }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    if(!name) {
      alert("Wpisz imię osoby!");
      return
    }

    addName(name, color);
    setName('');
    setColor('');
  }

  return (
    <div className="pickPeople">
      <form onSubmit={onSubmit}>
        <p>Dodaj osobę:</p>
        <br></br>
        <br></br>
        <div style={{display:'flex', justifyContent:'center'}}>
            <input type="text" placeholder="Imię osoby" value={name} onChange={(e) => setName(e.target.value)}></input>
            &nbsp;&nbsp;&nbsp;
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)}></input>
        </div>
        <br></br>
        <br></br>
        <button className="btn" >Dodaj</button>
      </form>
    </div>
  )
}

export default PickPeople