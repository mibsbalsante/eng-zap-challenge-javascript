import React from 'react'
import Carousel, {
  Dots,
  slidesToShowPlugin,
  slidesToScrollPlugin,
} from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css'

import styles from './styles.css'

const slides = [
  <img
    key={600}
    onClick={({ target }) => console.info('>>click', target)}
    src='https://picsum.photos/600/400'
  />,
  <img
    key={601}
    onClick={({ target }) => console.info('>>click', target)}
    src='https://picsum.photos/601/400'
  />,
  <img
    key={602}
    onClick={({ target }) => console.info('>>click', target)}
    src='https://picsum.photos/602/400'
  />,
  <img
    key={603}
    onClick={({ target }) => console.info('>>click', target)}
    src='https://picsum.photos/603/400'
  />,
  <img
    key={604}
    onClick={({ target }) => console.info('>>click', target)}
    src='https://picsum.photos/604/400'
  />,
  <img
    key={605}
    onClick={({ target }) => console.info('>>click', target)}
    src='https://picsum.photos/605/400'
  />,
]

const Slider = () => (
  <div className={styles.slider}>
    <Carousel
      animationSpeed={300}
      itemWidth={600}
      plugins={[
        'arrows',
        'infinite',
        'fastSwipe',
        {
          resolve: slidesToShowPlugin,
          options: {
            numberOfSlides: 2,
          },
        },
        {
          resolve: slidesToScrollPlugin,
          options: {
            numberOfSlides: 2,
          },
        },
      ]}
      slides={slides}
    />
    <Dots number={slides.length} thumbnails={slides} value={1} />
  </div>
)

export default Slider
