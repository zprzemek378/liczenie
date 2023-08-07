import { useState } from "react";
import { IoInformationCircle } from "react-icons/io5";

const InformationCircle = ({text}) => {
    const [showInformationState, setShowInformationState] = useState(false);

    const showInformation = () => {
      setShowInformationState(true);
    }
  
    const hideInformation = () => {
      setShowInformationState(false);
    }


  return (
    <div>
        <IoInformationCircle  style={{cursor:'pointer'}} onPointerEnter={showInformation} onPointerLeave={hideInformation}/>
        {showInformationState && <div className="showInfo">
            <p>{text}</p>
        </div>}
    </div>
  )
}

export default InformationCircle