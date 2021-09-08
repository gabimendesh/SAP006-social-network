/**
 * @jest-environment jsdom
 */

import { login } from './__mocks__/login';

const user = {
  email: 'test@test.com',
  password: 'senhateste',
};
const mockLoginWithEmailAndPassword = jest.fn();

jest.mock('../src/services/firebase.js', () => ({
  getFirebase: jest.fn(() => ({
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        orderBy: jest.fn(() => ({
          get: jest.fn(() => true),
        })),
      })),
    })),
    auth: jest.fn(() => ({
      signInWithEmailAndPassword: mockLoginWithEmailAndPassword,
    })),
  })),
}));

describe('Login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render a login button', () => {
    const page = login();
    const loginButton = page.querySelector('#login-btn');

    expect(loginButton.innerHTML).toEqual('Entrar');
  });

  it('should call the login function after a click', async () => {
    const page = login();
    const button = page.querySelector('#login-btn');
    mockLoginWithEmailAndPassword.mockResolvedValue(user.email, user.password);

    button.click();
    await mockLoginWithEmailAndPassword(user.email, user.password);

    expect(mockLoginWithEmailAndPassword)
      .toHaveBeenCalledWith(user.email, user.password);
    expect(mockLoginWithEmailAndPassword).toHaveBeenCalledTimes(2);
  });
});
