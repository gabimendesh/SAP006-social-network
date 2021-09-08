const mockCreatePost = jest.fn();
const mockEditPost = jest.fn();
const mockDeletePost = jest.fn();
const mockLikePost = jest.fn();

jest.mock('../src/services/firebase.js', () => ({
  getFirebase: jest.fn(() => ({
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        add: mockCreatePost,
        doc: jest.fn(() => ({
          update: mockEditPost,
          delete: mockDeletePost,
          get: mockLikePost,
        })),
      })),
    })),
  })),
}));

const text = 'post de exemplo';
const newText = 'post editado';
const postId = 'eSSse6EhuM1Uid5DeExEmpLlooO8';

describe('posts functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should be called once', () => {
    mockCreatePost(text);
    expect(mockCreatePost).toHaveBeenCalledTimes(1);
  });
  it('should be called when the delete button is clicked', () => {
    mockDeletePost(postId);
    expect(mockDeletePost).toHaveBeenCalledTimes(1);
  });
  it('should be called when the like button is clicked', () => {
    mockLikePost(postId);
    expect(mockLikePost).toHaveBeenCalledTimes(1);
  });
  it('should be called when the edit button is clicked', () => {
    mockEditPost(newText, postId);
    expect(mockEditPost).toHaveBeenCalledTimes(1);
  });
});
