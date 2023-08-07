import { HiUserRemove } from "react-icons/hi"

const PersonName = ({person, removeName}) => {
  return (
    <div className="personName" style={{backgroundColor:person.color}}>
        {person.name}

        {person.id !== 0 && <div style={{position:'relative', cursor:'pointer', transform:'scale(1.2)'}} onClick={() => removeName(person.id)}>
            <HiUserRemove />
        </div>}

    </div>
  )
}

export default PersonName