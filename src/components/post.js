export const addPost = (post) => {
  const postDiv = document.createElement('div');
  postDiv.setAttribute('data-id', post.id);
  const postTemplate = ` 
    <div id="${post.data().createdAt}" class="post">
      <div class="user-perfil">
        <img src="./img/Perfil.png" alt="user-photo" class="user-photo">
        <h4 class="user-name">@${post.data().userName}</h4>
      </div>
      <article class="post-field">
        <p class="user-post">${post.data().text}</p>
      </article>
      <div class="like-post" data-like">
      <button class="btn-like data-like= ${post.id} id="btn-like" >
        <img src="./img/heart.png" alt="like-icon" data-like class="like-icon "width=15px">
        <span id="likes" data-like> ${post.data().likes.length}</span>
      </button>
      </div>
      </div>
  `;
  postDiv.innerHTML = postTemplate;


  return postDiv;
};


