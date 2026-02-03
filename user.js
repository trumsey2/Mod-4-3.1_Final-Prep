// API 2: "https://jsonplaceholder.typicode.com/posts?userId=:id"
const postListEl = document.querySelector('.post-list');
const id = localStorage.getItem("id")
const idInput = document.querySelector(`.post__search input`); // was missing //

function onSearchChange(event) {
    const newId = event.target.value;
    renderPosts(newId);
}

async function renderPosts(userId) {
    if (!userId) return;
    try {
        const posts = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        const postsData = await posts.json();

        if (postsData.length === 0) {
            postListEl.innerHTML = `<p style="text-align:center;">No posts found for this user ID.</p>`;
            return;
        }

        postListEl.innerHTML = postsData.map(post => postHTML(post)).join('');
    } catch (error) {
        console.error("Error fetching posts:", error);
        postListEl.innerHTML = '<p style="text-align:center;">Error loading posts.</p>';
    }
}

function postHTML(post) {
    return `
    <div class="post">
        <div class="post__title">
            ${post.title}
        </div>
        <p class="post__body">
            ${post.body}
        </p>
    </div>
    `
}

if(id) {
    renderPosts(id);
    if (idInput) {
        idInput.value = id;
    }
}

