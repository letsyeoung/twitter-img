import Twit from 'components/Twit';
import { dbService } from 'fBase';
import React, { useEffect, useState } from 'react';

const Home = ({userObj}) => {
  const [twt, setTwt] = useState("");
  const [twitter, setTwitter] = useState([]);

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
    await dbService.collection("twitter").add({
      twt,
      createdAt : Date.now(),
      creatorId: userObj.uid,
    });
    setTwt("");
  };
  const onChange = (event) => {
    const {
      target: { value }
    } = event;
     setTwt(value);
  }

return(
  <div>
    <form onSubmit={onSubmit}>
      <input 
        value={twt}
        type="text"
        placeholder="뭔 생각해.." 
        maxLength={140}
        onChange={onChange} />
      <input type="submit" value="enter" />
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