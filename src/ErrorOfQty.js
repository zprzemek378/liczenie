import { BiSolidError } from 'react-icons/bi'

const ErrorOfQty = ({sendError}) => {
  return (
    <div>
        <BiSolidError style={{color:'red', fontSize:'40px'}}/> 
        <br></br>
        
        Ilość produktów nie została rozmieszczona poprawnie:{sendError.map((elem) => <div>
          <span style={{fontWeight:'bold'}}>{elem.name}</span> - zadeklarowano: <span style={{fontWeight:'bold'}}>{elem.should.toFixed(5)}</span> - rozmieszczono: <span style={{fontWeight:'bold'}}>{elem.is.toFixed(5)}</span> </div>)}
    </div>
  )
}

export default ErrorOfQty