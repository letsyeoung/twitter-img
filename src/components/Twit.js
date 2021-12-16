import { dbService, storageService } from 'fBase';
import React from 'react';
import { useState } from 'react';

const Twit = ({ twitObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTwit, setNewTwit] = useState(twitObj.twt);

  const onDeleteClick = async() => {
    const ok = window.confirm("지울거얌?");
    console.log(ok);
    if (ok) {
      await dbService.doc(`twitter/${twitObj.id}`).delete();
      await storageService.refFromURL(twitObj.attachmentUrl).delete();
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);  
  const onSubmit = async(event) => {
    event.preventDefault();
    console.log(twitObj, newTwit)
    await dbService.doc(`twitter/${twitObj.id}`).update({
      twt:newTwit
    });
    setEditing(false);
  }
  const onChange = (event) => {
    const {
      target : {value},
    } = event
    setNewTwit(value);
  }

  return (
    <div>
      {
        editing ? (
          <>
            {isOwner && (
              <>
              <form onSubmit={onSubmit}>
              <input 
                type="text" 
                placeholder="수정할끼니.." 
                value={newTwit} 
                required
                onChange={onChange} />
                <input type="submit" value="웅!" />
              </form>
              <button onClick={toggleEditing}>취소</button>
              </>
            )}
          </>
          ) : ( 
          <>
            <h4>{twitObj.text}</h4>
            {twitObj.attachmentUrl && (
                <img src={twitObj.attachmentUrl} width="50px" height="50px" />
            )}
            {isOwner && (
              <>
                <button onClick={onDeleteClick}>삭제</button>
                <button onClick={toggleEditing}>수정</button>
              </>
            )}
          </>)}
      </div>
  )
}
  export default Twit;