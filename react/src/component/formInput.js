
function FormInput(props) {
    return (

        <div>
            <form>
                <input type="text" name={props.name} placeholder={props.name} onChange={ e => props.handleChange(e)}/>
            </form>
        </div>
    )
}


export default FormInput