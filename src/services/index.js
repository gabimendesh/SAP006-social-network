import { onNavigate } from '../navigate.js';
import { getFirebase } from './firebase.js';

export const saveUserIdOnLocalStorage = (uid) => {
  localStorage.uid = uid;
};

export const getUserIdOnLocalStorage = () => localStorage.uid;

export const clearLocalStorage = () => localStorage.clear();

export const loginWithGoogleAccount = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return getFirebase().auth().signInWithPopup(provider);
};

export const loginWithEmailAndPassword = (
  userEmail,
  userPassword,
) => getFirebase().auth()
  .signInWithEmailAndPassword(userEmail, userPassword);

export const createAccountWithEmailAndPassword = (
  userEmail,
  userPassword,
) => getFirebase().auth().createUserWithEmailAndPassword(userEmail, userPassword);

export const userUpdateProfile = (userName) => getFirebase().auth().currentUser
  .updateProfile({
    displayName: userName,
  });

export const logOut = () => getFirebase().auth().signOut();

export const loadPosts = () => {
  const postsCollection = getFirebase()
    .firestore()
    .collection('posts');
  return postsCollection.orderBy('createdAt', 'desc').get();
};

export const createPost = (textPost) => {
  const date = new Date();
  const user = getFirebase().auth().currentUser;
  const post = {
    text: textPost,
    userId: user.uid,
    userName: user.displayName,
    userEmail: user.email,
    createdAt: date.toLocaleString('en-US'),
    likes: [],
    comments: [],
  };

  const postsCollection = getFirebase()
    .firestore()
    .collection('posts');
  return postsCollection.add(post);
};

export const currentUser = () => getFirebase().auth().currentUser;

export const editPost = (newText, postId) => getFirebase()
  .firestore().collection('posts').doc(postId)
  .update({
    text: newText,
  });

getFirebase().auth().onAuthStateChanged(() => {
  if (!getFirebase().auth().currentUser) {
    onNavigate('/');
  }
});

export const deletePost = (id) => getFirebase()
  .firestore()
  .collection('posts').doc(id)
  .delete();

export const likesPost = (postId) => {
  getFirebase()
    .firestore()
    .collection('posts').doc(postId)
    .get()
    .then((post) => {
      const arrayLikes = post.data().likes;
      const likesInPost = getFirebase()
        .firestore()
        .collection('posts').doc(postId);
      if (getUserIdOnLocalStorage()) {
        likesInPost.update({

          likes: getFirebase().firestore.FieldValue.arrayUnion(getUserIdOnLocalStorage()),
        });
      }
      if (arrayLikes.includes(getUserIdOnLocalStorage())) {
        likesInPost.update({
          likes: getFirebase().firestore.FieldValue.arrayRemove(getUserIdOnLocalStorage()),
        });
      }
    });
};
