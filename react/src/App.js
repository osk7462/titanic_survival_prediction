import './App.css';

import React from 'react'
import Exploratory from './component/exploratory/Exploratory.js'
import PredictionForm from './component/form/form'
// import Form from './component/form/form'

function App() {
    return(
        <div className="container">
            <h1>Titanic Survival predictor</h1>
              <hr/>
              <h4>fill the below form to predict</h4>
            <PredictionForm />
            <hr></hr>
            <Exploratory />
        </div>
    )
}

export default App;
