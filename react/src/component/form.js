import React from 'react'
import FormInput from './formInput';

class Form extends React.Component {
    constructor() {
    super()
    this.state = {
            passengerId:5,
            pclass:3,
            sexMale:1.0,
            sexFemale:0.0,
            age:35.0,
            sibSp:0,
            parch:0,
            fare:8.0500,
            embarkedS:1.0,
            embarkedC:0.0,
            embarkedQ: 0.0,
            url : "/api/predict?",
            apiPredictionData: {}
    };
    this.predict = this.predict.bind(this)
    this.handleChange = this.handleChange.bind(this)
    }
    
    handleChange(event) {
        console.log(event.target.name)
        this.setState({
            [event.target.name] : event.target.value
        })
    }


    predict() {
        let url = this.state.url
        let i = 1
        for(let key in this.state) {
            if (i < 12){
            url += "v"+ i++ + "=" + this.state[key] + "&"
            }
        }
        url.slice(0,-1)
        console.log("from click: " + url)
        fetch(url)
        .then(response => response.json())
        .then(data => this.setState({
            apiPredictionData: data
        }))

    }


    render() {
        let predicted 
        for (let key in this.state.apiPredictionData) {
            predicted = this.state.apiPredictionData[key]
            
        }
        let gender
        try {
            predicted = parseInt(predicted + "")
            gender = parseInt(this.state.sexMale) ? "He" : "She"
            }
           catch(err) {
            console.log(err)
           }

        let i = 1
        let forms = []
        for(let key in this.state) {
            if (i++ < 12){
                forms.push(<FormInput key={i} name={key} handleChange={this.handleChange}/>)
            }
        }
        return(

            <div className="form-container">
                <form>
                    {forms}
                </form>
                {!predicted ? <h1 style={{color: 'red'}}>Sorry {gender} was not able to make it</h1>: <h1 style={{color: 'green'}}>{gender} survived</h1> }
                <button onClick={this.predict}>Predict</button>
            </div>
        )
    }

}

export default Form;
