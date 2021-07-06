import React from 'react'
import Slick from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './styles.css'

const Slider = () => (
  <div className={styles.slider}>
    <Slick
      {...{
        adaptiveHeight: true,
        centerPadding: '10px',
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide: true,
        variableWidth: true,
      }}
    >
      <div>
        <img src='https://picsum.photos/300/200' />
      </div>
      <div>
        <img src='https://picsum.photos/301/200' />
      </div>
      <div>
        <img src='https://picsum.photos/302/200' />
      </div>
      <div>
        <img src='https://picsum.photos/303/200' />
      </div>
      <div>
        <img src='https://picsum.photos/304/200' />
      </div>
      <div>
        <img src='https://picsum.photos/305/200' />
      </div>
      <div>
        <img src='https://picsum.photos/306/200' />
      </div>
      <div>
        <img src='https://picsum.photos/307/200' />
      </div>
      <div>
        <img src='https://picsum.photos/308/200' />
      </div>
      <div>
        <img src='https://picsum.photos/309/200' />
      </div>
    </Slick>
  </div>
)

export default Slider
