describe('User login funcanality', () => {
  test('User email and password defined', () => {
    const email = () => {
      return 'test@gmail.com';
    };
    const password = () => {
      return 'Test@123';
    };
    expect(email).toBeDefined();
    expect(password).toBeDefined();
  });

  test('login should be function', () => {
    const login = () => {};
    expect(typeof login).toBe('function');
  });
});

describe('User logout funcanality', () => {
  test('Logout defined', () => {
    const login = () => {};
    expect(login).toBeDefined();
  });
});
