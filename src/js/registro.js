btnRegistrar.addEventListener('click', e => {
  location.href = '../views/camera.html';
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let personVisit = document.getElementById('personVisit').value;
  let company = document.getElementById('company').value;

  if (name === '') {
    alert('Ingresa el nombre completo');
    return false;
  }
  if (email === '') {
    alert('Ingresa el correo electrónico');
    return false;
  }
  if (personVisit === '') {
    alert('Ingresa tu anfitrion');
    return false;
  }
  if (company === '') {
    alert('Ingresa la empresa a visitar');
    return false;
  } else {
    db.collection('visitors').add({
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      name: name,
      mail: email,
      personVisit: personVisit,
      company: company
    })
      .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id);
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('personVisit').value = '';
        document.getElementById('company').value = '';
      })
      .catch(function (error) {

        console.error('Error adding document: ', error);
      });
  }
});
