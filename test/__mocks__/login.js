import {
  loginWithEmailAndPassword,
  saveUserIdOnLocalStorage,
} from '../../src/services/index';

import { onNavigate } from '../../src/navigate';

export const login = () => {
  const container = document.createElement('div');
  container.className = 'container';
  const template = `
    <div class="header-login">
      <div class="img-ball">
        <img class="ball" src="../img/bolinhas.png" alt="balls" width="100" />
      </div>
      <h1 class="logo">Plush</h1>
    </div>
    <p class="subtitle">Uma rede para tutores e amantes de animais.</p>
    <form class="form-login">
      <p id="error-message" class="error-message"></p>
      <input type="email" placeholder="Email" class="input-field" id="user-email" autocomplete="off" />
      <div class="input-login ">
        <i id="eye-login" class="fa fa-eye" aria-hidden="true" class="hidden"></i>
      </div>
      <input type="password" placeholder="Senha" class="input-field" id="user-password" autocomplete="off" />
      <button class="button" id="login-btn" type="submit">Entrar</button>
      <p class="option">ou</p>
      <button class="button" id="google-btn" type="submit">
        <img src="../img/icongoogle.png" alt="Google icon" width="27px" />
        <p class="button-google">Continuar com o Google</p>
      </button>
    </form>
    <p class="sign-up-text">Ainda não é membro?</p>
    <button class="button" id="btn-signUp">Cadastrar-se</button>
    <div class="footer-img">
      <img class="dog-login" src="../img/dog.png" alt="dog" width="100px" />
      <img class="triangle" src="../img/Triangulos.png" alt="triangle" width="100" />
    </div>
`;
  container.innerHTML = template;

  container.querySelector('#login-btn')
    .addEventListener('click', (event) => {
      const inputEmail = container.querySelector('#user-email').value;
      const inputPassword = container.querySelector('#user-password').value;
      event.preventDefault();
      loginWithEmailAndPassword(inputEmail, inputPassword)
        .then((doc) => {
          saveUserIdOnLocalStorage(doc.user.uid);
          onNavigate('/home');
        })
        .catch((error) => {
          const errorField = document.getElementById('error-message');
          let errorMessage = error.message;
          switch (errorMessage) {
            case 'There is no user record corresponding to this identifier. The user may have been deleted.':
              errorMessage = 'Usuário não encontrado, por favor, verifique seus dados.';
              errorField.innerHTML = errorMessage;
              errorMessage = '';
              break;
            case 'The email address is badly formatted.':
              errorMessage = 'Por favor, insira um email válido.';
              errorField.innerHTML = errorMessage;
              errorMessage = '';
              break;
            case 'The password is invalid or the user does not have a password.':
              errorMessage = 'Senha inválida.';
              errorField.innerHTML = errorMessage;
              errorMessage = '';
              break;
            default:
              break;
          }
        });
    });

  return container;
};
