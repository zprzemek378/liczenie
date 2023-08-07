import ArticleCheckbox from "./ArticleCheckbox"
import { useState } from "react";
import { AiFillDelete } from 'react-icons/ai'

const SingleArticle = ({ people, article, index, removeArticle, changedCheckbox }) => {
    const [allInRowState, setAllInRowState] = useState(false);

    const [showInformationState, setShowInformationState] = useState(false);

    const showInformation = () => {
      setShowInformationState(!showInformationState);
    }

    const [preciseQty, setPreciseQty] = useState(false);
    

    const owner = people.find((person) => person.id === article.owner)

  return (
    <div>
      <div style={{position:'relative'}} className={`singleArticle ${index%2 === 0 && "singleArticleEven"}`}>
          <div className="articleOwner flexGrid" style={{cursor:'pointer'}}  onClick={showInformation}>
              <span style={{backgroundColor:owner.color}}>&nbsp;&nbsp;</span>
              &nbsp;{article.name}
          </div>
              {
                  people.map((person) => <ArticleCheckbox personID={person.id} article={article.id} personColor={person.color} preciseQty={preciseQty} allInRowState={allInRowState} changedCheckbox={changedCheckbox}/>)
              }

              {!preciseQty &&
              <div style={{position:'absolute', right:'5px'}}>
                  <input type="checkbox" checked={allInRowState}  onChange={(e) => setAllInRowState(e.currentTarget.checked)}/>
              </div>
              } 

      </div>
              {showInformationState &&
              <div className={`showInformation ${index%2 === 0 && "singleArticleEven"}`}>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                        <table>
                          <tr>
                            <th style={{fontWeight:'bold'}}>Nazwa:</th>
                            <th style={{fontWeight:'normal'}}>{article.name}</th>
                          </tr>
                          <tr>
                            <th style={{fontWeight:'bold'}}>Właściciel:</th>
                            <th style={{fontWeight:'normal'}}>{owner.name}</th>
                          </tr>
                          <tr>
                            <th style={{fontWeight:'bold'}}>Cena całk.:</th>
                            <th style={{fontWeight:'normal'}}>{(article.price).toFixed(2)} zł</th>
                          </tr>
                          <tr>
                            <th style={{fontWeight:'bold'}}>Cena jedn.:</th>
                            <th style={{fontWeight:'normal'}}>{(article.price/article.qty).toFixed(2)} zł</th>
                          </tr>
                          <tr>
                            <th style={{fontWeight:'bold'}}>Ilość:</th>
                            <th style={{fontWeight:'normal'}}>{article.qty}</th>
                          </tr>
                        </table>


                        <div style={{marginTop:'auto', marginBottom:'auto', textAlign:'center'}}>
                            Dokładne rozdzielanie ilości:
                            <br></br>
                            <input style={{transform:'scale(2)'}}  type="checkbox" checked={preciseQty} onChange={(e) => setPreciseQty(e.currentTarget.checked)}/>
                        </div>


                        <div style={{marginTop:'auto', marginBottom:'auto', marginRight:'5px', cursor:'pointer'}} onClick={() => removeArticle(article.id)}>
                            <AiFillDelete style={{fontSize:'70px', padding:'10px'}}/> 
                        </div>
                </div>

              </div>}
    </div>
  )
}

export default SingleArticle