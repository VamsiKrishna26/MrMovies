import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import './DiscussionsJumbotron.styles.scss';
import { TextField,Button as MaterialButton,InputAdornment } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Picker from 'emoji-picker-react';
import Emoji from './Assets/emoji.png';
import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const styles = {
    input1: {
      width:"500px",
      
    }
  };

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

const DiscussionsJumbotron=(props)=>{
    const classes = useStyles();
    const {comment,deleteComment,currentUser,discussions,replyComment}=props;
    const [showReply,setShowReply]=useState('false');
    const [reply,setReply]=useState('');
    const [emojiPicker,setEmojiPicker]=useState(false);
    const [modalStyle] = useState(getModalStyle);

    const body = (
        <div style={modalStyle} className={classes.paper}>
          <Picker onEmojiClick={(event,emojiObject)=>{setReply(reply+emojiObject.emoji)}}/>
        </div>
      );

      const handleOpen = () => {
        setEmojiPicker(true);
      };
    
      const handleClose = () => {
        setEmojiPicker(false);
      };

    return(
        <div className='discussion'>
            <div className='review-details'>
            <span className="review_text">&#8618; </span>
            <span>
            <span className="review_text">
                <span>{comment.user_name} - </span><span>{comment.comment_date}</span></span>
                <div style={{"marginLeft":'17px'}} >
                <p className="review_text"><span>{comment.comment}</span>
                {currentUser&&currentUser.id===comment.user_id?
                    <span className="delete-comment" onClick={()=>deleteComment(discussions,comment.id)}>&#128465;</span>:
                    <span></span>
                }
                </p>
                </div>
                {
                    showReply?
                    (currentUser?
                      <Button className='reply-button' variant='outline-secondary' onClick={()=>setShowReply(!showReply)}>Reply</Button>:
                      <Button className='login-reply' variant='outline-secondary' disabled>Login to reply</Button>)
                    :
                    <Button className='reply-button' variant='outline-secondary' onClick={()=>setShowReply(!showReply)}>Close</Button>
                }
                {
                    !showReply?
                    <div>
                        <Modal open={emojiPicker} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                            {body}
                        </Modal>
                        <TextField variant="outlined" className='reply' label="Reply" 
                    value={reply} onChange={(event)=>setReply(event.target.value)} size="small"
                    InputProps={{ startAdornment: (
                        <InputAdornment position="start">
                            <img className='emoji-picker' onClick={handleOpen} src={Emoji} alt="Emoji"/>
                        </InputAdornment>
                      ),
                        classes: { input: props.classes.input1 } }}/>
                    <MaterialButton onClick={()=>replyComment(discussions,comment.id,reply)}>&#10148;</MaterialButton>
                    </div>
                    :
                    <div></div>
                }
            </span>
                
            </div>
        </div>
    )
}

export default withStyles(styles)(DiscussionsJumbotron);