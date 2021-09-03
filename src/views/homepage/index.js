import {
  createPost,
  currentUser,
  loadPosts,
  logOut,
  deletePost,
  likesPost,
  editPost,
  clearLocalStorage,
} from '../../services/index.js';
import { addPost } from '../../components/post.js';
import { onNavigate } from '../../navigate.js';

export const home = () => {
  const container = document.createElement('div');
  container.className = 'container-timeline';
  const template = `
    <div class="header-homepage">
      <div class= "user-perfil-header">
        <img src="./img/Perfil.png" alt="user-photo" class="user-photo-header" width="60px">
      </div>
      <h2 class="inicial-page">Página inicial</h2>
      <button class="logout" id="logout">
        <img class='logout-img' src='img/logout-icon.png'>
      </button>
    </div>
    <form id="postForm" class="post-form">
      <textarea id="postText" class="post-text" autocomplete="off" maxlength="1000" minlenght ="1" placeholder="O que está acontecendo?" required></textarea>
      <button type="submit" class="send-post ">Postar</button>
    </form>
    <p class="loading-posts"></p>
    <ul id="postsList" data-postsList></ul>
 `;

  container.innerHTML = template;

  loadPosts().then((snap) => {
    container.querySelector('.loading-posts').innerHTML = '';
    snap.forEach((post) => {
      const postElement = addPost(post);
      container.querySelector('#postsList').appendChild(postElement);
    });
  });

  loadPosts();

  container.querySelector('#postForm')
    .addEventListener('submit', (event) => {
      event.preventDefault();
      const user = currentUser();
      const textPost = document.querySelector('#postText').value;
      createPost(textPost).then((result) => {
        const date = new Date();
        const createdPost = {
          id: result.id,
          data: () => ({
            userName: user.displayName,
            userId: user.uid,
            text: textPost,
            createdAt: date.toLocaleString('en-US'),
            likes: [],
          }),
        };
        const newPostElement = addPost(createdPost);
        container.querySelector('#postsList').prepend(newPostElement);
      });
      document.querySelector('#postText').value = '';
    });

  container.querySelector('.loading-posts').innerHTML = 'Carregando...';
  container.querySelector('#logout').addEventListener('click', (e) => {
    e.preventDefault();
    logOut()
      .then(clearLocalStorage())
      .then(onNavigate('/'));
  });

  const postsList = container.querySelector('[data-postsList]');
  postsList.addEventListener('click', (e) => {
    e.preventDefault();
    const target = e.target;

    if (target.dataset.delete === '') {
      const modal = document.getElementById('myModal');
      modal.style.display = 'block';
      const span = document.getElementsByClassName('close-button')[0];
      span.addEventListener('click', () => {
        e.preventDefault();
        modal.style.display = 'none';
      });
    }

    if (target.dataset.deletepost === '') {
      const getPost = target.parentNode
        .parentNode.parentNode.parentNode.parentNode.parentNode;
      const id = getPost.getAttribute('data-id');
      deletePost(id)
        .then(getPost.remove());
    }

    if (target.dataset.like === '' && !target.classList.contains('fas')) {
      const getPost = target.parentNode.parentNode.parentNode.parentNode.parentNode;
      const id = getPost.getAttribute('data-id');
      const numberLikes = container.querySelector(`[data-like="${id}"]`);
      e.target.classList.add('fas');
      likesPost(id);
      const quantLikes = Number(numberLikes.textContent) + 1;
      numberLikes.innerHTML = quantLikes;
    } else if (target.dataset.like === '' && target.classList.contains('fas')) {
      const getPost = target.parentNode.parentNode.parentNode.parentNode.parentNode;
      const id = getPost.getAttribute('data-id');
      const numberLikes = container.querySelector(`[data-like="${id}"]`);
      e.target.classList.remove('fas');
      const quantLikes = Number(numberLikes.textContent) - 1;
      numberLikes.innerHTML = quantLikes;
      likesPost(id);
    }

    if (target.dataset.edit === '') {
      const getPost = target.parentNode.parentNode.parentNode.parentNode.parentNode;
      const id = getPost.getAttribute('data-id');
      const confirmEdit = container.querySelector(`[data-edit="${id}"]`);
      confirmEdit.style.display = 'flex';
      const editArea = container.querySelector(`[data-post="${id}"]`);
      const postField = container.querySelector(`[data-post="${id}"]`);
      postField.setAttribute('id', 'edit-area');
      editArea.setAttribute('contentEditable', 'true');
      const editButton = target;
      editButton.style.display = 'none';

      confirmEdit.addEventListener('click', () => {
        editArea.removeAttribute('contentEditable');
        postField.removeAttribute('id');
        const newText = editArea.textContent;
        editPost(newText, id)
          .then(() => {
            confirmEdit.style.display = 'none';
            editButton.style.display = 'block';
          }).catch(() => {
            const modal = document.querySelector('.modal');
            const close = document.querySelector('.close');
            modal.style.display = 'block';
            close.onclick = () => {
              modal.style.display = 'none';
            };
          });
      });
    }
  });

  return container;
};
