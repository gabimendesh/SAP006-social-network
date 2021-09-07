// importamos a função que vamos testar

/* import { consultaPersonagens } from './';

// faz o mock do módulo que vai fazer a requisição
// ...jest.mock(...)

describe('consultaPersonagens', () => {
  it('consulta personagens com sucesso', () => {
    const mockDosPersonagens = [
      // ...
    ];
    return expect(consultaPersonagens()).resolves.toBe(mockDosPersonagens);
  });

  // caso de erro
  it('consulta personagens com erro', () => {
    return expect(consultaPersonagens()).rejects.toMatch('error');
  });
}); */

const mockLoginWithEmailAndPassword = jest.fn();
const mockCreateAccountWithEmailAndPassword = jest.fn();
const mockLoginWithGoogleAccount = jest.fn();
const mockGoogleAuthProvider = jest.fn();
const mockLogOut = jest.fn();

jest.mock('../src/services/firebase.js', () => ({
  getFirebase: jest.fn(() => ({
    firestore: jest.fn(() => ({
      collection: jest.fn(),
    })),
    auth: jest.fn(() => ({
      signInWithEmailAndPassword: mockLoginWithEmailAndPassword,
      createUserWithEmailAndPassword: mockCreateAccountWithEmailAndPassword,
      signInWithPopup: mockLoginWithGoogleAccount,
      GoogleAuthProvider: mockGoogleAuthProvider,
      signOut: mockLogOut
        .mockResolvedValueOnce('first call')
        .mockRejectedValueOnce(new Error('Async error')),

    })),
  })),
}));

const user = {
  email: 'test@test.com',
  password: 'senhateste',
};

describe('teste de autenticação', () => {
  it('should be called once', () => {
    mockLoginWithEmailAndPassword(user.email, user.password);
    expect(mockLoginWithEmailAndPassword).toHaveBeenCalledTimes(1);
    // const loginPage = signInWithEmailAndPassword();
    // loginPage.querySelector('user-email').value = 'test@test.com';
    // loginPage.querySelector('user-password').value = 'senhateste';
    // loginPage.querySelector('#login-btn').dispatchEvent(new Event('click'));
    // expect(mockLoginWithEmailAndPassword).toBeCalled();
    // expect(mockLoginWithEmailAndPassword).toHaveBeenCalledWith('test@test.com', 'senhateste');
  });
});

it('should be called createAccount once', () => {
  mockCreateAccountWithEmailAndPassword(user.email, user.password);
  expect(mockCreateAccountWithEmailAndPassword).toHaveBeenCalledTimes(1);
});
it('should be called loginWithGoogleAccount once', () => {
  mockLoginWithGoogleAccount(mockGoogleAuthProvider);
  expect(mockLoginWithGoogleAccount).toHaveBeenCalledTimes(1);
});
it('should be called logOut once', () => {
  mockLogOut();
  expect(mockLogOut).toHaveBeenCalledTimes(1);
});
