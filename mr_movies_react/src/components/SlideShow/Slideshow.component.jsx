import React from 'react';
import './Slideshow.styles.scss';
import {Carousel} from 'react-bootstrap';
import Interstellar from './assets/interstellar.jpg';
import civil_war from './assets/civil_war.jpg';
import daysoffuturepast from './assets/daysoffuturepast.jpg';
import doctor_strange from './assets/doctor_strange.jpg';
import Dunkirk from './assets/Dunkirk.jpg';
import f8 from './assets/f8.jpg';
import jurassic_world from './assets/jurassic_world.jpg';
import justice_league from './assets/justice_league.jpg';
import madmax from './assets/madmax.jpg';
import thor_ragnarok from './assets/thor_ragnarok.jpg';
import rogue_one from './assets/rogue_one.jpg';
import potc5 from './assets/potc5.jpg';
import spectre from './assets/spectre.jpg';
import jungle_book from './assets/jungle_book.jpg';
import conjuring2 from './assets/conjuring2.jpg';

let posters=[
    {"url":Interstellar,"id":"60d6f98649807a12b1dd6e2b","name":"Interstellar","year":"2014"},
    {"url":civil_war,"id":"60d6f98749807a12b1dd7c93","name":"Captain America: Civil War","year":"2016"},
    {"url":daysoffuturepast,"id":"60d6f98649807a12b1dd700b","name":"X-Men: Days of Future Past","year":"2014"},
    {"url":doctor_strange,"id":"60d6f98749807a12b1dd7c94","name":"Doctor Strange","year":"2016"},
    {"url":Dunkirk,"id":"60d6f98949807a12b1ddc352","name":"Dunkirk","year":"2017"},
    {"url":f8,"id":"60d6f98949807a12b1ddbdc3","name":"The Fate of the Furious","year":"2017"},
    {"url":jurassic_world,"id":"60d6f98749807a12b1dd76c8","name":"Jurassic World","year":"2015"},
    {"url":justice_league,"id":"60d6f98749807a12b1dd7c8d","name":"Justice League","year":"2017"},
    {"url":madmax,"id":"60d6f98749807a12b1dd7c85","name":"Mad Max: Fury Road","year":"2015"},
    {"url":thor_ragnarok,"id":"60d6f98749807a12b1dd7c91","name":"Thor: Ragnarok","year":"2017"},
    {"url":rogue_one,"id":"60d6f98949807a12b1ddb6dd","name":"Rogue One: A Star Wars Story","year":"2016"},
    {"url":potc5,"id":"60d6f98749807a12b1dd7c8c","name":"Pirates of the Caribbean: Dead Men Tell No Tales","year":"2017"},
    {"url":spectre,"id":"60d6f98749807a12b1dd8cf5","name":"Spectre","year":"2015"},
    {"url":jungle_book,"id":"60d6f98749807a12b1dd8f6a","name":"The Jungle Book","year":"2016"},
    {"url":conjuring2,"id":"60d6f98849807a12b1ddad85","name":"The Conjuring 2","year":"2016"}
]

posters=posters.sort(()=>Math.random()-0.5);
const Slideshow=(props)=>{
    
    const {history}=props;
    return(
        <div className='Slideshow'>
            <Carousel fade interval={2000}>
                {
                    posters.slice(0,7).map((poster)=>(
                        <Carousel.Item key={poster.id}
                        onClick={()=>{history.push(`/movies/getMovieWithId/${poster.id}`)}}  >
                            <img
                            className="d-block w-100 image-display"
                            src={poster.url}
                            alt="Slide1"
                            />
                            <Carousel.Caption className="caption">
                            <div className='caption-body'>
                            <h3 className='poster-name'><b>{poster.name}</b></h3>
                            <p className='poster-year'>({poster.year})</p>
                            </div>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))
                }
            </Carousel>
        </div>
    )
}

export default Slideshow;