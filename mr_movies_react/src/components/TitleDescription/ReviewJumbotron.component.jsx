import React from 'react';
import './ReviewJumbotron.styles.scss';
import { Jumbotron } from 'react-bootstrap';
import { Rating } from '@material-ui/lab';
import { useState } from 'react';
const ReviewJumbotron=(props)=>{
    const {review}=props;
    const [showmore,setShowmore]=useState(false);
    return(
        <Jumbotron className='review'>
            <div className='review-details'>
                <h6 className='text_details'>"<b>{review.review_summary}</b>"</h6>
                <Rating className='rating_tmdb' precision={0.2} max={10} value={parseInt(review.rating)} size="small" readOnly />
                <p className="review_text">{review.review_date}</p>
                {
                    showmore?
                    <p className="review_text">
                        <span>{review.review_text.slice(0,)} </span><span className="showmore" onClick={()=>setShowmore(false)}><b>(less...)</b></span>
                    </p>:
                    <p className="review_text">
                    <span>{review.review_text.slice(0,500)} </span><span className="showmore" onClick={()=>setShowmore(true)}><b>(more...)</b></span>
                    </p>
                }
                <p className="review_user">-{review.user_id}</p>
            </div>
        </Jumbotron>
    )
}

export default ReviewJumbotron;