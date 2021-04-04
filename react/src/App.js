import './App.css';

import React from 'react'
import Img from './component/img.js'
import Form from './component/form'


class App extends React.Component {
    constructor() {
    super()
    this.state = {
        isLoading: true,
        response: {},
    };
}


    componentDidMount() {
        fetch("/api")
        .then(response => response.json())
        .then(data => this.setState({
            response: data
        }))
    }


    render() {
        console.log("from rneder :" + this.state.apiExploraoryData)
        // let mediaurl = ""
        // mediaurl += this.state.apiExploraoryData.figures
        // mediaurl = mediaurl.split(',')
        // const figures = mediaurl.map(url => {
        //     return(
        //     <Img url={url} />
        //     )
        // })
        return(

            <div className="container">
              <h1>Titanic Survival predictor</h1>
              <hr/>
              <h4>fill the below form to predict</h4>
              <Form />
              <hr/>
                <h2 >Exploratory Data Analysis</h2>
                <div className="img-container">
                    {/* {figures} */}
                </div>
                <br/>
            </div>
        )
    }

}

export default App;
