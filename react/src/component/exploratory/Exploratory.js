import Img from './ImgComponent'
import ExploratoryComponent from './ExploratoryComponent'
import React from 'react'

class Exploratory extends React.Component {
    constructor() {
    super()
    this.state = {
        isLoading: true,
        resStatus: "",
        nanValue: "",
        nanValueAgeMean: "",
        describe: "",
        shape: "",
        cols: "",
        coldList: "",
        dtypes: "",
        colsWoPassenger: "",
        encoded: "",
        trainingScore: "",
        testingScore: "",
        figuresUrl: []
    };
}


    componentDidMount() {
        fetch("/api")
        .then(response => response.json())
        .then(data => {
            let resStatus = data.status
            data = JSON.parse(data.data)
            let nanValue = data.nan_value
            let nanValueAgeMean = data.nan_value_age_mean
            let describe = data.describe
            let shape = data.shape
            let cols = data.cols
            let coldList = data.cold_list
            let dtypes = data.dtypes
            let colsWoPassenger = data.cols_wo_passenger
            let encoded = data.encoded
            let trainingScore = data.training_score
            let testingScore = data.testing_score
            let figuresUrl = data.figures_url
            this.setState({
                resStatus: resStatus,
                nanValue: nanValue,
                nanValueAgeMean: nanValueAgeMean,
                describe: describe,
                shape: shape,
                cols: cols,
                coldList: coldList,
                dtypes: dtypes,
                colsWoPassenger: colsWoPassenger,
                encoded: encoded,
                trainingScore: trainingScore,
                testingScore: testingScore,
                figuresUrl: figuresUrl
            })
        })
    }


    render() {
        const figures = this.state.figuresUrl.map(url => {
            return(
            <Img url={url} />
            )
        })
        return(

            <div className="container">
                <ExploratoryComponent 
                    resStatus = {this.state.resStatus}
                    nanValue = {this.state.nanValue}
                    nanValueAgeMean = {this.state.nanValueAgeMean}
                    describe = {this.state.describe}
                    shape = {this.state.shape}
                    cols = {this.state.cols}
                    coldList = {this.state.coldList}
                    dtypes = {this.state.dtypes}
                    colsWoPassenger = {this.state.colsWoPassenger}
                    encoded = {this.state.encoded}
                    trainingScore = {JSON.stringify(this.state.trainingScore)}
                    testingScore = {JSON.stringify(this.state.testingScore)}
                />
                <div className="img-container">
                    {figures}
                </div>
                <br/> 
            </div>
        )
    }

}

export default Exploratory