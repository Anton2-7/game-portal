function Game(props) {
  const { name, released, background_image, rating} = props;
  return (
    <>

  <div className="card">
    <div className="card-image waves-effect waves-block waves-light">
      <img className="activator" src={background_image}/>
    </div>
    <div className="card-content">
      <span className="card-title activator grey-text text-darken-4">{name}<i className="material-icons right"></i></span>
              <p>{rating} | {released}</p>

    </div>
   
  </div>

    </>
  );
}
export { Game };
