import {
  createAccountWithEmailAndPassword,
  loginWithGoogleAccount,
  userUpdateProfile,
  saveUserIdOnLocalStorage,
} from '../../services/index.js';
import { onNavigate } from '../../navigate.js';

export const signup = () => {
  const container = document.createElement('div');
  container.className = 'signUp-container';
  const template = `
    <div class="header-singnUp">
      <div class="img-triangle">
        <img class="header-triangle" src="../img/triangulosUp.png" alt="triangle" width="100"/>
      </div>
      <h1 class="logo-signUp">Plush</h1>
    </div>
    <form class="form-register">
      <p class="create-account">Crie sua conta</p>
      <p id="error-sign-up-message" class="error-sign-up-message"></p>
      <input type="text" placeholder="Nome" class="input-field" id="user-name" autocomplete="off">
      <input type="text" placeholder="Email" class="input-field" id="user-email" autocomplete="off">
      <div class="show-password">
        <i id="eye-register" class="fa fa-eye" aria-hidden="true" class="hidden"></i>
      </div>
      <input type="password" placeholder="Senha" class="input-field" id="new-password"  autocomplete="off">
      <div class="show-password">
        <i id="eye-show-register" class="fa fa-eye" aria-hidden="true" class="hidden"></i>
      </div>
      <input type="password" placeholder="Confirmar Senha" class="input-field"  id="confirm-password" autocomplete="off">
      <button id="sign-up-btn" class="button">Cadastrar</button>
    </form>
    <p class="option">ou</p>
    <button class="button" id="google-btn" type="submit">
      <img src="../img/icongoogle.png" alt="Google icon" width="27px" />
      <p class="button-google">Continuar com o Google</p>
    </button>
    <p class="login-text">Já tem uma conta?</p>
    <button class="button" id="btn-login">Entrar</button <div class="footer-img">
    <img class="dog-signUp" src="../img/dog.png" alt="dog" width="100px" />
    </div>
  `;
  container.innerHTML = template;

  container.querySelector('#sign-up-btn')
    .addEventListener('click', (e) => {
      e.preventDefault();
      let errorField = document.getElementById('error-sign-up-message');
      const userName = document.getElementById('user-name').value;
      const userEmail = document.getElementById('user-email').value;
      const userPassword = document.getElementById('new-password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
      if (!userName) {
        errorField.innerHTML = 'Por favor, digite o seu nome.';
      } else if (userPassword !== confirmPassword) {
        errorField.innerHTML = 'As senhas não estão iguais, tente novamente.';
      } else {
        createAccountWithEmailAndPassword(
          userEmail,
          userPassword,
          confirmPassword,
        ).then(() => onNavigate('/'))
          .then(() => {
            userUpdateProfile(userName);
          })
          .catch((error) => {
            errorField = document.getElementById('error-sign-up-message');
            let errorMessage = error.message;
            switch (errorMessage) {
              case 'The email address is badly formatted.':
                errorMessage = 'Por favor, insira um email válido.';
                errorField.innerHTML = errorMessage;
                break;
              case 'The password must be 6 characters long or more.':
                errorMessage = 'A senha deve ter 6 caracteres ou mais.';
                errorField.innerHTML = errorMessage;
                break;
              case 'Password should be at least 6 characters':
                errorMessage = 'A senha deve ter pelo menos 6 caracteres';
                errorField.innerHTML = errorMessage;
                break;
              case 'The email address is already in use by another account.':
                errorMessage = 'O email já está em uso por outra conta.';
                errorField.innerHTML = errorMessage;
                break;
              default:
                break;
            }
          });
      }
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
          const errorField = document.getElementById('error-sign-up-message');
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

  container.querySelector('#btn-login')
    .addEventListener('click', (e) => {
      e.preventDefault();
      onNavigate('/');
    });

  container.querySelector('#eye-register')
    .addEventListener('click', (e) => {
      e.preventDefault();
      const inputPassword = document.querySelector('#new-password');
      if (inputPassword.getAttribute('type') === 'password') {
        inputPassword.setAttribute('type', 'text');
      } else {
        inputPassword.setAttribute('type', 'password');
      }
    });

  container.querySelector('#eye-show-register')
    .addEventListener('click', (e) => {
      e.preventDefault();
      const inputConfirmPassword = document.querySelector('#confirm-password');
      if (inputConfirmPassword.getAttribute('type') === 'password') {
        inputConfirmPassword.setAttribute('type', 'text');
      } else {
        inputConfirmPassword.setAttribute('type', 'password');
      }
    });

  return container;
};
