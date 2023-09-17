let currentPage = 1;
let loading = false;

async function fetchData() {
    const resultsElement = document.getElementById("results");
    
    if (loading) return;
    
    loading = true;
    
    try {
     
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=10`);

        const data = await response.json();
        data.forEach(post => {
            const postElement = document.createElement("div");
            postElement.classList.add("post");
            postElement.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
            resultsElement.appendChild(postElement);
        });
        
        currentPage++;
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        loading = false;
    }
}

function checkScroll() {
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const bodyHeight = document.body.offsetHeight;
    
    if (windowHeight + scrollY >= bodyHeight - 100) {
        fetchData();
    }
}

window.addEventListener("scroll", checkScroll);

fetchData();
