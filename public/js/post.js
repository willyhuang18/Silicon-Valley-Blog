//create new post function
async function newPostHandler(event) {
    event.preventDefault();

    const title = document.querySelector('#postTitle').value.trim();
    const text = document.querySelector('#blogContent').value.trim();

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
        title,
        text
        }),
        headers: {
        'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.newPostForm').addEventListener('submit', newPostHandler);

//update post function
async function updateFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('#updateTitle').value.trim();
    const text = document.querySelector('#updateText').value.trim();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            text
        }),
        headers: {
            'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.replace('/dashboard/');
      } else {
        alert(response.statusText);
      }
  
}

document.querySelector('.updateForm').addEventListener('submit', updateFormHandler);