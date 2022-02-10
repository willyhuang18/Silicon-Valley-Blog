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