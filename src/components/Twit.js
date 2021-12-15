import { useState } from 'react';
import { dbService } from 'fBase';
import React from 'react';

const Twit = ({ twitObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTwit, setNewTwit] = useState(twitObj.text)  

  const onDeleteClick = async () => {
    const ok = window.confirm("지울거니..후회안하니..");
    console.log(ok);
    if (ok) {
      await dbService.doc(`twitter/${twitObj.id}`).delete();
    }
  }

  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async(event) => {
    event.preventDefault();
    console.log(twitObj, newTwit);
    await dbService.doc(`twitter/${twitObj.id}`).update({
      text: newTwit,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target : { value },
    } = event;
    setNewTwit(value);
  };


  return (
  <div>
    {editing ? (
      <>
        {isOwner && 
          <>
            <form onSubmit={onSubmit}>
              <input type="text" placeholder="수정할끼니.." onChange={onChange} value={newTwit} required /> 
              <input type="submit" value="수정완" /> 
            </form>
            <button onClick={toggleEditing}>Cancel</button>
          </>
        }
      </>
    ) : (
    <>
      <h4>{twitObj.text}</h4>
      {isOwner && (
        <>
          <button onClick={onDeleteClick}>Delete</button>
          <button onClick={toggleEditing}>Edit</button>
        </>
      )}
    </>
    )}
  </div>
  )
};

export default Twit;