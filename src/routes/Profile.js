import React, { useEffect } from 'react';
import { authService, dbService } from 'fBase';
import { useHistory } from 'react-router-dom';

export default ({ userObj }) => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut()
    history.push("/");
  };

  const getMytwt = async() => {
    const twitter = await dbService
      .collection("twitter")
      .where("creatorId", "==", userObj.uid)
      .get();
    console.log(twitter.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    getMytwt();
  }, []);


  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  )
}