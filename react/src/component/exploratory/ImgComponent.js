function Img(props  ) {

    const styles =  {
        height: props.url.includes('scatter_matrix') ? 1080:"",
        width: props.url.includes('scatter_matrix') ? 1400: "",
        marginLeft: 10,
        marginBottom: 10,
    }



    return (
      <div className="img">
          <img style={styles} src={props.url}></img>
      </div>
    );
  }
  
  export default Img;