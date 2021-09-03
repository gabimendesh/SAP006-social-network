// importamos a função que vamos testar

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
      signOut: mockLogOut,
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
  });
  it('should be called createAccount once', () => {
    mockCreateAccountWithEmailAndPassword(user.email, user.password);
    expect(mockLoginWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });
  it('should be called loginWithGoogleAccount once', () => {
    mockLoginWithGoogleAccount(mockGoogleAuthProvider);
    expect(mockLoginWithGoogleAccount).toHaveBeenCalledTimes(1);
  });
  it('should be called logOut once', () => {
    mockLogOut();
    expect(mockLogOut).toHaveBeenCalledTimes(1);
  });
});
