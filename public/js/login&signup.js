async function loginFormHandler(event) {
    event.preventDefault();


    // Collect values from the login form
    const email = document.querySelector('#loginEmail').value.trim();
    const password = document.querySelector('#loginPassword').value.trim();
  
    if (email && password) {
    // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
      // If successful, redirect the browser to the profile page
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
}

document.querySelector('.loginForm').addEventListener('submit', loginFormHandler);

//signup form
async function signupFormHandler(event) {
  event.preventDefault();

  const name = document.querySelector('#signUpName').value.trim();
  const email = document.querySelector('#signUpEmail').value.trim();
  const password = document.querySelector('#signUpPassword').value.trim();

  if (name && email && password) {
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          username,
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      }); 
  if (response.ok) {
      console.log('success');
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('.signuPForm').addEventListener('submit', signupFormHandler); 