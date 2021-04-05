
function FormInput(props) {
    return (

        <div>
            <form onSubmit={e => props.onSubmit(e)}>
                <label>
                    passengerId: 
                    <input  type="text" name={props.passengerId} placeholder="passenger id" onChange={e => props.handleChange(e)} />    
                </label> 
                <br></br>
                <label>
                    Pclass:     
                    <input type="text" name={props.pclass} placeholder="pclass" onChange={e => props.handleChange(e)} />
                </label> 
                <br></br>
                <label>
                    sex:  <br></br>   
                    Male: <input type="radio" name={props.sexMale} value="male" onChange={e => props.handleChange(e)} />
                    Female: <input type="radio" name={props.sexMale} value="female"  onChange={e => props.handleChange(e)} />
                </label> 
                <br></br>
                <label>
                    age:     
                    <input type="text" name={props.age} placeholder="age" onChange={e => props.handleChange(e)} />
                </label>
                <br></br> 
                <label>
                    sibSp:     
                    <input type="text" name={props.sibSp} placeholder="sibSp" onChange={e => props.handleChange(e)} />
                </label> 
                <br></br>
                <label>
                    parch:     
                    <input type="text" name={props.parch} placeholder="parch" onChange={e => props.handleChange(e)} />
                </label> 
                <br></br>
                <label>
                    fare:     
                    <input type="text" name={props.fare} placeholder="fare" onChange={e => props.handleChange(e)} />
                </label>
                <br></br>
                <label>
                    EmbarkedS:     
                    <input type="checkbox" name={props.isembarkedS} checked= {props.isEmbarkedS} onChange={e => props.handleChange(e)} />
                </label>
                <br></br> 
                <label>
                    EmbarkedC:     
                    <input type="checkbox" name={props.isembarkedC} checked= {props.isEmbarkedC} onChange={e => props.handleChange(e)} />
                </label> 
                <br></br>
                <label>
                    Embarked:     
                    <input type="checkbox" name={props.isembarkedQ} checked= {props.isEmbarkedQ} onChange={e => props.handleChange(e)} />
                </label> 
                <br></br>
                


                <button>Predict</button>
            </form>
        </div>
    )
}


export default FormInput