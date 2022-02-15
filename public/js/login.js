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

async function signUpBtn(){
    document.querySelector('.signUp').innerHTML = document.location.replace('/signup')
  }
  document.querySelector('.signUp').addEventListener('click', signUpBtn);