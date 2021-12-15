import Twit from 'components/Twit';
import { dbService } from 'fBase';
import React, { useEffect, useState } from 'react';

const Home = ( {userObj }) => {
  console.log(userObj)
  const [twt, setTwt] = useState("");
  const [twitter, setTwitter] = useState([]);
  const getTwitter = async () => {
    const dbTwitter = await dbService.collection("twitter").get();
    dbTwitter.forEach((document) => {
      const twtObject = {
        ...document.data(),
        id: document.id,
      };
      setTwitter((prev) => [twtObject, ...prev]);
    });
  }
  useEffect(() => {
    getTwitter();
    dbService.collection("twitter").onSnapshot(snapshot => {
      const twtArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTwitter(twtArray);
    });
  }, []);

  const onSubmit = async(event) => {
    event.preventDefault();
    await dbService.collection("twitter").add({
      text:twt,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setTwt("");
  };
  const onChange = (event) => {
    const { 
      target:{value},
    } = event;
    setTwt(value);
  };  
  
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={twt} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={140} />
        <input type="submit" value="enter" />
      </form>
      <div>
        {twitter.map((twt) => (
          <Twit key={twt.id} twitObj={twt} isOwner={twt.creatorId === userObj.uid}  />
          ))}
      </div>
    </div>
  )
};
export default Home;