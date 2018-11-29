const timeout = () => {
  window.setTimeout('redirect()', 2500);
};

window.onload = timeout;

const redirect = () => {
  window.location = 'views/registro.html';
  return
};
