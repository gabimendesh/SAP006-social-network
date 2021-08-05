import { loginWithEmailAndPassword, loginWithGoogleAccount } from '../../lib/authentication.js';
import { onNavigate } from '../../navigate.js';

export const login = () => {
  const container = document.createElement('div');
  container.className = 'container';
  const template = `
    <div class="header">
       <h1 class="logo">Pet</h1>
    </div>
    <p class="subtitle">Uma rede para tutores e amantes de animais.</p>
    <form class="form-login">
      <span id="error-message"></span>
      <input type="email" placeholder="Email" class="input-field" id="user-email" autocomplete="off" />
      <input type="password" placeholder="Senha" class="input-field" id="user-password" autocomplete="off" />
      <button class="button" id="login-btn" type="submit">Entrar</button>
      <span class="option">ou</span>
      <button class="button" id="google-btn" type="submit">
        <img src="../img/icongoogle.png" alt="Google icon" width="24px" class="google-icon"/>
        <span class="button-google">Continuar com o Google</span>
      </button>
    </form>
    <p class="sign-up-text">Ainda não é membro?</p>
    <button class="button" id="btn-signUp">Cadastrar-se</button>
`;
  container.innerHTML = template;

  container.querySelector('#login-btn')
    .addEventListener('click', (event) => {
      event.preventDefault();
      const inputEmail = document.getElementById('user-email');
      const inputPassword = document.getElementById('user-password');
      loginWithEmailAndPassword(inputEmail.value, inputPassword.value);
    });

  container.querySelector('#google-btn')
    .addEventListener('click', (event) => {
      event.preventDefault();
      loginWithGoogleAccount();
    });

  container.querySelector('#btn-signUp')
    .addEventListener('click', (event) => {
      event.preventDefault();
      onNavigate('/cadastrar');
    });

  return container;
};
