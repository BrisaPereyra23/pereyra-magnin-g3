{/*hijo */}
import React, { Component } from "react";
import './Cards.css';

{/*si lo tenemos que hacer a mano */}
class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verMas: false,
      textoBoton: "Ver más"
    };
  }

  toggleVerMas = () => {
    this.setState((prevState) => ({
      verMas: !prevState.verMas,
      textoBoton: prevState.verMas ? "Ver más" : "Ver menos"
    }));
  };

  render() {
    return (
      <div className="character-card">
        <img src={this.props.source} alt={this.props.title} />
        <h4>{this.props.title}</h4>
        <p>{this.props.data}</p>

        {this.state.verMas && <p>{this.props.extra}</p>}

        <button className="link-button" onClick={this.toggleVerMas}>
          {this.state.textoBoton}
        </button>
      </div>
    );
  }
}

{/*si lo tenemos que hacer con un data */}
function Cards() {
  return(
    <div className="characters-list">
        {rickAndMorty.map((peliculas) => (
          <Link  className= "key" key={peliculas.id} to={`/rickandmorty/id/${peliculas.id}`}>
            <Cards 
              source={peliculas.image}
              title={peliculas.name}
              data={peliculas.species}
            />
          </Link>
        ))}
      </div>
  )
} {/*pasar a class */}

export default Cards;
