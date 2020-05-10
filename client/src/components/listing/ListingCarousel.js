import React from 'react';
import PropTypes from 'prop-types';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Image,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import arrowLeft from '../../img/arrow-left.png';
import arrowRight from '../../img/arrow-right.png';

const ListingCarousel = ({ images }) => {
  const mobile = window.matchMedia('(max-width: 767px)');

  return (
    <CarouselProvider
      naturalSlideWidth={125}
      naturalSlideHeight={mobile.matches ? 80 : 65}
      totalSlides={images.length}
      className='relative'
      style={{ marginLeft: '-2rem', marginRight: '-2rem' }}
    >
      <Slider>
        {images.map((image, index) => (
          <Slide key={index} index={index}>
            <Image className='object-cover' src={image} />
          </Slide>
        ))}
      </Slider>
      <ButtonBack
        style={{
          position: 'absolute',
          top: '45%',
          left: '15px',
          width: '34px',
          height: '34px',
          borderRadius: '100%',
          overflow: 'hidden',
          cursor: 'pointer',
          backgroundSize: '16px auto',
          backgroundPosition: '56% 50%',
          backgroundImage: `url(${arrowLeft})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'rgb(230, 230, 230, .6)',
          transition: 'transform .1s linear',
        }}
        className='focus:outline-none focus:shadow-outline hidden md:inline-block opacity-50 hover:opacity-100'
      />
      <ButtonNext
        style={{
          position: 'absolute',
          top: '45%',
          right: '15px',
          width: '34px',
          height: '34px',
          borderRadius: '100%',
          overflow: 'hidden',
          cursor: 'pointer',
          backgroundSize: '16px auto',
          backgroundPosition: '56% 50%',
          backgroundImage: `url(${arrowRight})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'rgba(230, 230, 230, .6)',
          transition: 'transform .1s linear',
        }}
        className='focus:outline-none focus:shadow-outline hidden md:inline-block opacity-50 hover:opacity-100'
      />
    </CarouselProvider>
  );
};

ListingCarousel.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ListingCarousel;
