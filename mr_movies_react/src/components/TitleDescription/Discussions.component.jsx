import React from 'react';
import './Discussions.styles.scss';
import DiscussionsJumbotron from './DiscussionsJumbotron.component';
import { TextField,InputAdornment } from '@material-ui/core';
import { useState,useEffect } from 'react';
import dateFormat from 'dateformat';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Picker from 'emoji-picker-react';
import Emoji from './Assets/emoji.png';
import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const getModalStyle=()=> {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 350,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

const Discussions=(props)=>{
    const classes = useStyles();
    const {movieWithId,currentUser}=props;
    let movie_id=movieWithId._id;
    const [comment,setComment]=useState('');
    const [discussions,setDiscussions]=useState([]);
    const [emojiPicker,setEmojiPicker]=useState(false);
    const [modalStyle] = useState(getModalStyle);
    let PORT='';
    // PORT='http://localhost:1020';

    useEffect(()=>{
        if(movieWithId){
            setDiscussions(movieWithId.discussions)
        }
    },[movieWithId,setDiscussions])

    const addComment=async (event)=>{
        event.preventDefault();
        let comment_to_add={comment_date:dateFormat(new Date(),'d mmmm yyyy hh:MM:ss tt'),
        user_id:currentUser.id,user_name:currentUser.displayName,comment:comment,
        id:Math.floor(Math.random() * 10000000),discussions:[]};
        setDiscussions([...discussions,comment_to_add]);
        await axios.post(PORT+'/addComment',
        {
            movie_id:movie_id,
            comment_to_add:comment_to_add
        },{
        headers:{
            'Content-Type': 'application/json'
        }});
        setComment('');
    }

    const deleteComment=async (sliceDiscussions,comment_id)=>{
        for(let i in sliceDiscussions){
            if(sliceDiscussions[i].id===comment_id){
                sliceDiscussions.splice(i,1);
                setDiscussions([...discussions]);
                }
            else{
                deleteComment(sliceDiscussions[i].discussions,comment_id);
            }
        }
        await axios.post(PORT+'/deleteComment',
        {
            movie_id:movie_id,
            comment_id:comment_id
        },{
        headers:{
            'Content-Type': 'application/json'
        }})
    }

    const replyComment=async (sliceDiscussions,comment_id,comment)=>{
        for(let i in sliceDiscussions){
            if(sliceDiscussions[i].id===comment_id){
                let comment_to_add={comment_date:dateFormat(new Date(),'d mmmm yyyy hh:MM:ss tt'),
                user_id:currentUser.id,user_name:currentUser.displayName,comment:comment,
                id:Math.floor(Math.random() * 10000000),discussions:[]};
                sliceDiscussions[i].discussions.push(comment_to_add);
                setDiscussions([...discussions]);
                await axios.post(PORT+'/replyComment',
                {
                    movie_id:movie_id,
                    comment_to_add:comment_to_add,
                    comment_id:comment_id
                },{
                headers:{
                    'Content-Type': 'application/json'
                }})
            }
            else{
                replyComment(sliceDiscussions[i].discussions,comment_id,comment);
            }
        }
    }

    const DisplayDiscussions=(props)=>{
        const {comment}=props;
        const nestedDiscussions=comment.discussions.map((child)=>{
            return <DisplayDiscussions key={child.id} comment={child}/>
        })
        let marginLeft='40px'; 
        if(window.innerWidth<768){
            marginLeft='15px';
        }

        return(
            <div style={{"marginLeft": marginLeft,"marginTop":"10px"}}>
                <DiscussionsJumbotron deleteComment={deleteComment} replyComment={replyComment}
                comment={comment} key={comment.id} 
                currentUser={currentUser} discussions={discussions}/>
                {nestedDiscussions}
            </div>
        )

    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
          <Picker onEmojiClick={(event,emojiObject)=>{setComment(comment+emojiObject.emoji)}}/>
        </div>
      );

      const handleOpen = () => {
        setEmojiPicker(true);
      };
    
      const handleClose = () => {
        setEmojiPicker(false);
      };

    return(
        <div className='discussions'>
            {
                discussions.map((discussion)=>{
                    return(
                        <DisplayDiscussions key={discussion.id} comment={discussion} {...props}/>
                    )
                })
            }
            <Modal open={emojiPicker} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
        {body}
      </Modal>
            <TextField className='comment' id="discussions" label="Add a comment" 
            value={comment} onChange={(event)=>setComment(event.target.value)} 
            multiline rows={3} variant="outlined"
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                      <img className='emoji-picker' onClick={handleOpen} src={Emoji} alt="Emoji"/>
                  </InputAdornment>
                ),
              }}/>
            <div className='row'>
                <div className='col-md-12'>
                {
                    currentUser?
                    <Button className='add-comment' onClick={addComment}>Add a Comment</Button>:
                    <Button className='login' disabled>Login to comment</Button>
                }
                </div>
            </div>
        </div>
    )
}

export default Discussions;