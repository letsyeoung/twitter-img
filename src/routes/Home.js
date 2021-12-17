import Twit from 'components/Twit';
import { v4 as uuidv4 } from 'uuid';
import { dbService, storageService } from 'fBase';
import React, { useEffect, useState } from 'react';


const Home = ({userObj}) => {
  const [twt, setTwt] = useState("");
  const [twitter, setTwitter] = useState([]);
  const [attachment, setAttachment] = useState("");

  useEffect(() => {
    dbService.collection("twitter").onSnapshot((snapshot) => {
      const twtArray = snapshot.docs.map(doc => ({
        id:doc.id, 
        ...doc.data(),
      }));
      setTwitter(twtArray);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const reponse = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await reponse.ref.getDownloadURL();
    }
      const twtObj = {
              text: twt,
              createdAt: Date.now(),
              creatorId: userObj.uid,
              attachmentUrl, 
            };

    await dbService.collection("twitter").add(twtObj);
    setTwt("");
    setAttachment("");
  };

  const onChange = (event) => {
    const {
      target: { value }
    } = event;
     setTwt(value);
  }

  const ofFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent
      setAttachment(result);
    }
    reader.readAsDataURL(theFile); 
  };
  const onClearAttachment = () => {setAttachment("")}

return(
  <div>
    <form onSubmit={onSubmit}>
      <input 
        value={twt}
        type="text"
        placeholder="뭔 생각해.." 
        maxLength={140}
        onChange={onChange} />
      <input type="file" accept="image/*" onChange={ofFileChange} />
      <input type="submit" value="enter" />
      {attachment && 
        <div>
          <img src={attachment} width="50px" height="50px" />
          <button onClick={onClearAttachment}>이미지삭제</button>
        </div>
      }
    </form>
    <div>
      {twitter.map((twitter) => (
        <Twit 
          key={twitter.id} 
          twitObj={twitter}
          isOwner={twitter.creatorId=== userObj.uid} 
        />
        ))} 
    </div>
  </div>
  )
}
export default Home;