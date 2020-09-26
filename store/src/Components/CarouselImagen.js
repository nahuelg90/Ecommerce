

import React from 'react';
import {Carousel} from 'react-bootstrap'


function CarouselImagen(imagen) {

  return (
    <Carousel.Item>
        <img
        className="d-block w-100"
        src={imagen.data.pathArchivo}
        alt={imagen.data.nombreArchivo}
        />
    </Carousel.Item>
  );
}

export default CarouselImagen;

