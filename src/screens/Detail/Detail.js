import React, { Component } from 'react';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      cargando: true,
      error: null
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=289ceab3aca6a2fae63aa3153d95ab4b&language=es-ES`)
      .then(res => res.json())
      .then(data => this.setState({ item: data, cargando: false }))
      .catch(err => this.setState({ error: err.message, cargando: false }));
  }

  render() {
    if (this.state.cargando) return <p>Cargando detalle...</p>;
    if (this.state.error) return <p>Error: {this.state.error}</p>;

    return (
      <div>
        <h1>{this.state.item.title}</h1>
        <p>{this.state.item.overview}</p>
        <p>Estreno: {this.state.item.release_date}</p>
      </div>
    );
  }
}

export default Detail;
