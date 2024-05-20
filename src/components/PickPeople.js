import { useState } from "react"

const PickPeople = ({ addName }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');


const getData = async () => {
    try {
      const response = await fetch('https://liczenie-express.adaptable.app');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json(); // `await` was missing here
      console.log(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const uploadData = async () => {
    try {
      const data = { name: name };

      const response = await fetch('https://liczenie-express.adaptable.app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };


  

  const onSubmit = (e) => {
    e.preventDefault();
    if(!name) {
      alert("Wpisz imię osoby!");
      return
    }

    addName(name, color);
    setName('');
    setColor('');


    uploadData();
    
  }

  return (
    <div className="pickPeople">
      <form onSubmit={onSubmit}>
        <p onClick={() => getData()} >Dodaj osobę:</p>
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
