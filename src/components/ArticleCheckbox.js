import { useEffect, useState } from "react"

const ArticleCheckbox = ({ personID, article, personColor, preciseQty, allInRowState, changedCheckbox }) => {
  const [checkboxState, setCheckboxState] = useState(false);
  const [numberState, setNumberState] = useState(0);

  const changedState = (newState) => {
    isNaN(newState) ? changedCheckbox(0, personID, article, preciseQty) :
    changedCheckbox(newState, personID, article, preciseQty);
  }

  const changedCheckboxState = (newCheckboxState) => {
    setCheckboxState(newCheckboxState);
    newCheckboxState == true ? changedState(1) : changedState(0);
  }


  const changedNumberState = (newNumberState) => {
    if(newNumberState==0 || isNaN(newNumberState)) {
      setNumberState() 
    }
    else {
      setNumberState(Number(newNumberState));
    }

    changedState(Number(newNumberState));
  }

  const changedRowState = (inRowState) => {
    setCheckboxState(inRowState);
    changedCheckboxState(inRowState);
  }


  useEffect((() => changedRowState(allInRowState)),[allInRowState]);
  useEffect(preciseQty==true ? ()=>{changedNumberState(numberState); (isNaN(numberState) || numberState==0) && setNumberState(0)} : ()=>changedCheckboxState(checkboxState),[preciseQty])
  return (
        <div className="articleCheckbox flexGrid" style={{backgroundColor:personColor}}>
          {preciseQty ? <input type="number" style={{width:'50px'}} min={0} value={numberState} onChange={(e) => changedNumberState(e.target.value)}/> : <input type="checkbox" checked={checkboxState} onChange={(e) => changedCheckboxState(e.currentTarget.checked)}/>}
        </div>
  )
}

export default ArticleCheckbox