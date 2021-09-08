import { loginWithEmailAndPassword, loginWithGoogleAccount, saveUserIdOnLocalStorage } from '../../services/index.js';
import { onNavigate } from '../../navigate.js';

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
      event.preventDefault();
      const inputEmail = document.getElementById('user-email');
      const inputPassword = document.getElementById('user-password');
      loginWithEmailAndPassword(inputEmail.value, inputPassword.value)
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

  container.querySelector('#google-btn')
    .addEventListener('click', (event) => {
      event.preventDefault();
      loginWithGoogleAccount()
        .then((doc) => {
          saveUserIdOnLocalStorage(doc.user.uid);
          onNavigate('/home');
        })
        .catch((error) => {
          const errorField = document.getElementById('error-message');
          let errorMessage = error.message;
          switch (errorMessage) {
            case 'The popup has been closed by the user before finalizing the operation.':
              errorMessage = 'Login com Google cancelado.';
              errorField.innerHTML = errorMessage;
              errorMessage = '';
              break;
            default:
              break;
          }
        });
    });

  container.querySelector('#btn-signUp')
    .addEventListener('click', (event) => {
      event.preventDefault();
      onNavigate('/cadastrar');
    });

  container.querySelector('#eye-login')
    .addEventListener('click', (event) => {
      event.preventDefault();
      const inputPassword = document.querySelector('#user-password');
      if (inputPassword.getAttribute('type') === 'password') {
        inputPassword.setAttribute('type', 'text');
      } else {
        inputPassword.setAttribute('type', 'password');
      }
    });

  return container;
};
