import { dbService } from 'fBase';
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
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);  
  const onSubmit = async(event) => {
    event.preventDefault();
    console.log(twitObj, newTwit)
    await dbService.doc(`twitter/${twitObj.id}`).update({
      text:newTwit
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
          ) : ( 
          <>
            <h4>{twitObj.twt}</h4>
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