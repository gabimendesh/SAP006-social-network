import { getUserIdOnLocalStorage } from '../services/index.js';

export const addPost = (post) => {
  const deleteButton = `
    <div id="myModal" class="modal">
      <div class="modal-content">
        <p class="delete-text">Deseja excluir sua publicação?</p>
        <div class="delete-container">
        <button data-deletepost id="delete-post" class="delete-confirm" type="submit">Excluir</button>
        <button class="close-button" id="close-button">Cancelar</button>
        </div>
      </div>
    </div>
    <div class="delete-post">
      <button class="delete-btn" id="delete-btn" type="submit">
      <img src="../img/trash-delete.png" data-delete alt="trash icon" width="27px" />
      </button>
    </div>`;

  const editButton = `
    <div class="edit-post">
      <button id="confirm-edit" class="confirm-edit" style="display:none" data-edit="${post.id}">Confirmar</button>
      <button data-edit="" class="edit-btn" id="edit-btn">
        <img src="./img/pencil-icon.png" data-edit alt="edit-icon" class="edit-icon" width="27px">
      </button>
    </div>
    <div class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <p class="edit-text">Falha ao editar post</p>
      </div>
    </div>
    `;

  const isAuthor = getUserIdOnLocalStorage() === post.data().userId;
  const postDiv = document.createElement('div');
  postDiv.setAttribute('data-id', post.id);

  const postTemplate = `
      <article id="${post.data().createdAt}" class="post">
        <div class="user-perfil" data-user="${post.data().userId}">
          <img src="./img/Perfil.png" alt="user-photo" class="user-photo">
          <h4 class="user-name">@${post.data().userName} - </h4>
          <p class="date-post">${post.data().createdAt}</p>
        </div>
        <div class="post-field" data-post="${post.id}">
          <p class="user-post" data-post="${post.id}">${post.data().text}</p>
        </div>
        <div class="user-interations">
          <div class="like-post" data-like>
            <button class="btn-like" id="btn-like">
              <i class="far fa-heart ${(post.data().likes.includes(getUserIdOnLocalStorage())) ? 'fas' : ''} " data-like id="likeBtn"></i>
              <span id="likes" class="likes" data-like="${post.id}">${post.data().likes.length}</span>
            </button>
          </div>
          ${isAuthor ? editButton : ''}
          ${isAuthor ? deleteButton : ''}
        </div>
      </article>
  `;
  postDiv.innerHTML = postTemplate;

  return postDiv;
};
