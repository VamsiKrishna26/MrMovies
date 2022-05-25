import React from 'react';
import './CelebritySpotlight.styles.scss';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import {Link} from 'react-router-dom';
import { FaArrowCircleRight,FaArrowCircleLeft } from "react-icons/fa";
const Arrow = ({ text, className }) => {
    return (
      <div
        className={className}
      >{text}</div>
    );
  };
  
  
  const ArrowLeft = Arrow({ text: <div><FaArrowCircleLeft/></div>, className: 'arrow-prev' });
  const ArrowRight = Arrow({ text: <div><FaArrowCircleRight/></div>, className: 'arrow-next' });

export const CelebritySpotlight=(props)=>{

    let Actors=['Brad Pitt','Tom Cruise','Bradley Cooper','Harrison Ford','Christian Bale','Johnny Depp','Tom Hanks','Robert Downey Jr','Robert De Niro','Leonardo DiCaprio']
    let Actress=['Emma Stone','Kate Winslet','Scarlett Johansson','Nicole Kidman','Natalie Portman','Meryl Streep','Jennifer Lawrence','Cate Blanchett','Eva Green','Saoirse Ronan']
    let Directors=['Christopher Nolan','M. Night Shyamalan','Quentin Tarantino','Steven Spielberg','David Fincher','James Cameron','Martin Scorsese','Sam Raimi','Ridley Scott','Jon Favreau']
    
    Actors=Actors.sort(()=>Math.random()-0.5);
    Actress=Actress.sort(()=>Math.random()-0.5);
    Directors=Directors.sort(()=>Math.random()-0.5);
    const getImage = (image,folder) => {
        return require(`./assets/${folder}/${image}.jpg`).default
     }

    return(
        <div className='celebrity-spotlight'>
            <h1 className="text-display"><b>Celebrity Spotlight</b></h1>
            <h3 className="text-display">Actors</h3>
            <ScrollMenu
            data=
            {
                Actors.map((img,index) => {
                    return (
                        <Link to={`/searchPage/${img}`} key={index}>
                            <div className="image-container">
                                    <img className="celebrity-image" key={index} src={getImage(img,'Actors')} alt="Coming Soon"/>
                                    <div className="after">
                                        <p className="after-text"><b>{img}</b></p>
                                    </div>
                            </div>
                        </Link>
                    )
                 })
            }
            arrowLeft={ArrowLeft}
            arrowRight={ArrowRight}
            wheel={false}
            alignCenter={false}
            hideSingleArrow={true}
          />
          <ScrollMenu
            data=
            {
                Actress.map((img,index) => {
                    return (
                        <Link to={`/searchPage/${img}`} key={index}>
                            <div className="image-container">
                                    <img className="celebrity-image" key={index} src={getImage(img,'Actress')} alt="Coming Soon"/>
                                    <div className="after">
                                        <p className="after-text"><b>{img}</b></p>
                                    </div>
                            </div>
                        </Link>
                    )
                 })
            }
            arrowLeft={ArrowLeft}
            arrowRight={ArrowRight}
            wheel={false}
            alignCenter={false}
            hideSingleArrow={true}
          />
          <h3 className="text-display">Directors</h3>
          <ScrollMenu
            data=
            {
                Directors.map((img,index) => {
                    return (
                        <Link to={`/searchPage/${img}`} key={index}>
                            <div className="image-container">
                                    <img className="celebrity-image" key={index} src={getImage(img,'Directors')} alt="Coming Soon"/>
                                    <div className="after">
                                    <p className="after-text"><b>{img}</b></p>
                                    </div>
                            </div>
                        </Link>
                    )
                 })
            }
            arrowLeft={ArrowLeft}
            arrowRight={ArrowRight}
            wheel={false}
            alignCenter={false}
            hideSingleArrow={true}
          />
        </div>
        
    )
}

export default CelebritySpotlight;