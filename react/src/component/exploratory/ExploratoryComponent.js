
function ExploratoryComponent(props) {
  return (
    <div>
      <h1>Exploratory Data Analysis </h1><br/>
      <h3>no of rows and columns present in the datatest</h3>
      <pre>{
            props.shape
          } </pre>
      <hr></hr>
      <h3>Data types of each column</h3>
      <pre>{
            props.dtypes
          } </pre>
          <hr></hr>
      <h3>nan value in each column</h3>
      <pre>{
            props.nanValue
          } </pre>
          <hr></hr>
          <h3>after taking age mean each column</h3>
      <pre>{
            props.nanValueAgeMean
          } </pre>
          <hr></hr>
      <h3></h3>
      <pre>{
            props.describe
          } </pre>
          <hr></hr>
          <h3>no of clumns present in the dataset</h3>
      <pre>{
          props.coldList
          } </pre>
          <hr></hr>
          <h3>after removing passenger id</h3>
      <pre>{
            props.colsWoPassenger
          } </pre>
          <hr></hr>
          <h3></h3>
      <pre>{
            props.encoded
          } </pre>
          <hr></hr>
          <h3>accuracy of training dataset</h3>
      <pre>{
            props.trainingScore
          } </pre>
          <hr></hr>
          <h3>accucracy of testing dataset</h3>
      <pre>{
            props.testingScore
          } </pre>
          <hr></hr>
    </div>
  )
}

export default ExploratoryComponent