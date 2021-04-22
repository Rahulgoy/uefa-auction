export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      });
  };
};

export const signUp = (newUser) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((resp) => {
        return firestore.collection("users").doc(resp.user.uid).set({
          teamName: newUser.teamName,
          teamBalance: 2000,
          teamWage: 150,
          initials: newUser.initials,
        });
      })
      .then(() => {
        dispatch({ type: "SIGNUP_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};

export const AddPlayer = (player) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firestore
      .collection("players")
      .doc(player.name)
      .set({
        name: player.name,
        age: player.age,
        baseprice: player.baseprice,
        wage: player.wage,
        club: player.club,
        Image: player.Image,
        nationalTeam: player.nationalTeam,
        position: player.position,
        rating: player.rating,
        category: player.category,
        display: player.display,
        status: player.status,
        maxbid: player.maxbid,
        maxbidBy: player.maxbidBy,
        team: player.team,
        class: player.class,
      })
      .then(() => {
        dispatch({ type: "ADD_PLAYER_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "ADD_PLAYER_ERROR", err });
      });
  };
};
