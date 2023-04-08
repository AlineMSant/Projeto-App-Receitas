export const saveEmail = (email) => {
  localStorage.setItem('user', JSON.stringify({ email }));
};

export const getEmail = () => {
  const email = JSON.parse(localStorage.getItem('user'));
  return email;
};

export default {
  saveEmail,
  getEmail };
