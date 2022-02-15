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
            name,
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
  
  document.querySelector('.signupForm').addEventListener('submit', signupFormHandler); 