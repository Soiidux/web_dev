// In public/js/main.js

const output = document.getElementById('output');
const get_posts_btn = document.getElementById('get-posts-btn');

// Corrected function
async function showPosts() {
    // Move the try...catch block INSIDE the function
    try {
        const res = await fetch('http://localhost:8000/api/posts'); // Using relative URL
        if (!res.ok) {
            throw new Error("Couldn't fetch posts..");
        }

        const posts = await res.json();
        output.innerHTML = '';

        posts.forEach((post) => {
            const postEl = document.createElement('div');
            postEl.textContent = post.title;
            output.appendChild(postEl);
        });
    } catch (error) {
        // This will now correctly catch errors from the fetch call
        console.error("Error fetching posts: ", error);
        output.textContent = 'Failed to load posts.'; // Show an error to the user
    }
}

// This line can now find showPosts and will work correctly
get_posts_btn.addEventListener("click", showPosts);