const user = {
  email: 'test@test.com',
  password: 'senhateste',
};

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

describe('user authentication', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be called createAccount once', () => {
    expect.assertions(2);
    mockCreateAccountWithEmailAndPassword(user.email, user.password);
    expect(mockCreateAccountWithEmailAndPassword)
      .toHaveBeenCalledTimes(1);
    expect(mockCreateAccountWithEmailAndPassword)
      .toHaveBeenCalledWith(user.email, user.password);
  });

  it('should be called once', () => {
    expect.assertions(2);
    mockLoginWithEmailAndPassword(user.email, user.password);

    expect(mockLoginWithEmailAndPassword)
      .toHaveBeenCalledTimes(1);
    expect(mockLoginWithEmailAndPassword)
      .toHaveBeenCalledWith(user.email, user.password);
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
