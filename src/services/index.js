import { onNavigate } from '../navigate.js';

// export const loginPersistence = () => {
//   firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
// };

export const getNewUserData = (userData, userName) => {
  const usersCollection = firebase.firestore().collection('users');
  const user = {
    id: userData.uid,
    name: userName,
    email: userData.email,
  };
  usersCollection.add(user);
};

export const loginWithGoogleAccount = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  await firebase.auth().signInWithPopup(provider)
    .then((user) => {
      const userName = user.user.displayName;
      firebase.firestore().collection('users')
        .where('id', '==', user.user.uid).get()
        .then((firestoreUser) => {
          if (firestoreUser.docs.length === 0) {
            getNewUserData(user.user, userName);
          }
          onNavigate('/home');
        });
    });
};

export const loginWithEmailAndPassword = (
  userEmail,
  userPassword,
) => firebase.auth()
  .signInWithEmailAndPassword(userEmail, userPassword)
  .then(() => {
    onNavigate('/home');
  });

export const createAccountWithEmailAndPassword = (
  userName,
  userEmail,
  userPassword,
) => firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword)
  .then((userData) => {
    getNewUserData(userData.user, userName);
  })
  .then(() => onNavigate('/'))
  .then(() => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: userName,
    });
  });

export const logOut = () => {
  firebase.auth().signOut();
  onNavigate('/');
};

export const loadPosts = () => {
  const postsCollection = firebase
    .firestore()
    .collection('posts');
  return postsCollection.orderBy('createdAt', 'desc').get();
};

export const createPost = (textPost) => {
  const date = new Date();
  const user = firebase.auth().currentUser;
  const post = {
    text: textPost,
    userId: user.uid,
    userName: user.displayName,
    userEmail: user.email,
    createdAt: date.toLocaleString('pt-BR'),
    likes: [],
    comments: [],
  };

  const postsCollection = firebase
    .firestore()
    .collection('posts');
  return postsCollection.add(post);
};

export const currentUser = () => firebase.auth().currentUser;



    /*export const likedPost = () =>
  firebase
    .firestore()
    .collection('posts').add({
      likes: true,
    })
    .then(() => {
      return Promise.resolve(true);
    })
    .catch((error) => {
      return Promise.reject(error);
    })*/

    export const likesPost = (postId) => {
      const getPostsToLike = firebase
        .firestore()
        .collection('posts').doc(postId);
      if (getUserIdOnLocalStorage()) {
        getPostsToLike.update({
          likes: firebase.firestore.FieldValue.arrayUnion(getUserIdOnLocalStorage()),
        });
      }
      // if (getUserIdOnLocalStorage()) {
      //   getPostsToLike.update({
      //     regions: firebase.firestore.FieldValue.arrayRemove(getUserIdOnLocalStorage()),
      //   });
      // }
    };
  

    export const likedPost = (userId) => {
      const likeArray= firebase.firestore().collection('posts').doc().get().then(() => {
        console.log(likeArray)
        likeArray.update({
          likes: firebase.firestore.FieldValue.arrayUnion(userId),
        })

      })

    }
  


    /*export const likedPost = (userId) => {
      const likeArray= firebase.firestore().collection('posts').doc().get().then((post) => {

     
        //const quantLike = post.data().likes;
         // if (quantLikes.includes () === -1) {
            likeArray.update({
              likes: firebase.firestore.FieldValue.arrayUnion(userId),
            })
     
         /* } else {
            likeArray.update({
              likes: firebase.firestore.FieldValue.arrayRemove(userId)
            })*/
     
          

        
  
  
    


      
       // return likeArray.update({
         // likes: userId

        //
    

     // }))

    

   
    //  })
    // .catch((error) => {
     //   console.error("Error", error);
     // })
 // }