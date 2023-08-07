import SingleArticle from "./SingleArticle"

const ArticleList = ({ people, articles, removeArticle, changedCheckbox }) => {
  let removedQty = 0;
  const incrementRemoved = () => {
    removedQty++;
  }
  return (
    <div>
      
      {articles.map((article, index) => !article.deleted ? <SingleArticle people={people} article={article} index={index-removedQty} removeArticle={removeArticle} changedCheckbox={changedCheckbox}/> : incrementRemoved())}
    </div>
  )
}

export default ArticleList