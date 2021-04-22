import firebase from "firebase";
import { ADD_BID, ADD_BID_ERROR, MAX_BID_UPDATED } from "../types";

export const Bids = ({ playerId, biddingprice }) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const teamId = getState().firebase.auth.uid;
    console.log("Actions----");
    firestore
      .collection("players")
      .doc(playerId)
      .collection("Bids")
      .doc(teamId)
      .add({
        bid: [
          {
            biddingprice: biddingprice,
            timestamp: firebase.firestore.Timestamp.now(),
          },
        ],
      })
      .then(() => {
        dispatch({
          type: ADD_BID,
        });
      })
      .catch((err) => {
        dispatch(
          {
            type: ADD_BID_ERROR,
          },
          err
        );
      });

    const maxi = 0;
    firestore
      .collection("players")
      .where("name", "==", playerId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log("Max:", doc.data().maxbid);
          maxi = doc.data().maxbid;
        });
      });
    if (maxi < biddingprice) {
      firestore
        .collection("players")
        .doc(playerId)
        .update({
          maxbid: biddingprice,
          maxbidBy: teamId,
        })
        .then(() => {
          dispatch({
            type: MAX_BID_UPDATED,
          });
        });
    }
  };
};
