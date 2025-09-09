{/*padre */}
import React from "react";
import Cards from "../Cards/Cards";
import './Card.css';

function Card() {
    let peliculas = [{title:" " ,data:"  ", source:"" },
            {title:" " ,data:"  " ,source:"" },
            { title:" ", data:"  " ,source:"" },
            {title:" " ,data:"  " ,source:"" },
            { title:" " ,data:"  " ,source:"" },
            { title:" " ,data:"  " ,source:"" },
            { title:" " ,data:"  " ,source:"" },
            { title:" " ,data:"  " ,source:"" },
            { title:" " ,data:"  " ,source:"" },
            { title:" " ,data:"  " ,source:"" },
            { title:" " ,data:"  " ,source:"" },
            { title:" " ,data:"  " ,source:"" },
            { title:" " ,data:"  " ,source:"" }]
    return(
        <section className="cards-container">
      {peliculas.map((pers, idx) => (
        <Cards 
          key={idx}
          title={pers.title}
          data={pers.data}
          source={pers.source}
        />
      ))}
    </section>
    )
}


export default Card