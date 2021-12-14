import { dbService } from 'fBase';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [twt, setTwt] = useState("");
  const [twitter, setTwitter] = useState([]);
  const getTwts = async () => {
    const dbTwitter = await dbService.collection("twitter").get();
    dbTwitter.forEach((document) => {
      const twtObject = {
        ...document.data(),
        id: document.id,
      };
      setTwitter((prev) => [twtObject, ...prev]);
    });
  };
  useEffect(() => {
    getTwts();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("twitter").add({
      twt,
      createdAt : Date.now(),
    });
    setTwt("");
  };
  const onChange = (event) => {
    const {
      target: { value }
    } = event;
     setTwt(value);
  }
  console.log(twitter)

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
      {twitter.map((twt) => (
        <div>
          <h4>{twt.twt}</h4>
        </div>
        ))}
    </div>
  </div>
  )
}
export default Home;