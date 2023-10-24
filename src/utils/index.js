const validator = {
  name: name => {
    if (!name) return 'Tên không được để trống.';
    return null;
  },
  password: password => {
    if (!password) return 'Mật khẩu không được để trống.';
    if (password.length < 8) return 'Mật khẩu chứa ít nhất 8 kí tự.';
    return null;
  },
  email: email => {
    const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!email) return 'Tài khoản không được để trống.';
    if (!re.test(email)) return 'Email không hợp lệ.';
    return null;
  },
};

export {validator};
