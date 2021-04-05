import React from 'react'
import FormInput from './formInput';

class PredictionForm extends React.Component {
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
            staus: "",
            predictedValue: "",
            isembarkedS:true,
            isembarkedQ: false,
            isembarkedC: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    }
    
    handleChange(event) {
        const {name, value, type, checked} = event.target
        if(name == "sexMale") {
            value == "male" ? this.setState({sexMale: 1, sexFemale: 0}) : this.setState({sexMale: 0, sexFemale: 1})
        } else if(type === "checkbox") {
            console.log(name + " " + checked)
            let embarked = name.slice(2,11), value
            checked ? value = 1 : value = 0
           this.setState({name: checked, [embarked]:value })
        } else {
            this.setState({name : value})
        }
    }


    handleSubmit(event) {
        event.preventDefault()
        let url = "/api/predict?v1="+this.state.passengerId+"&v2="+this.state.pclass+"&v3="+this.state.sexMale+"&v4="+this.state.sexFemale+"&v5="+this.state.age+"&v6="+this.state.sibSp+"&v7="+this.state.parch+"&v8="+this.state.fare+"&v9="+this.state.embarkedS+"&v10="+this.state.embarkedC+"&v11="+this.state.embarkedQ
        fetch(url)
        .then(response => response.json())
        .then(data => {
            this.setState({
                status: data.status,
                predictedValue: data.predicted_value
            })
        })

    }


    render() {
        return(
            <div className="form-container">
                <FormInput 
                    passengerId = "passengerId"
                    pclass = "pclass"
                    sexMale = "sexMale"
                    sexFemale = "sexFemale"
                    age = "age"
                    sibSp = "sibSp"
                    parch = "parch"
                    fare = "fare"
                    embarkedS = "isembarkedS"
                    isembarkedC = "isembarkedC"
                    isembarkedQ = "isembarkedQ"
                    handleChange = {this.handleChange}
                    onSubmit = {this.handleSubmit}
                />

                {parseInt(this.state.predictedValue) ?
                <h3 style={{color: "green"}}>survived</h3>:
                <h3 style={{color: "red"}} >not survived</h3>
                    
                }
            </div>
        )
    }

}

export default PredictionForm;
