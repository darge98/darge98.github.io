// Funzione per creare un ghost element
function createGhostCard() {
    return `
        <div class="col-md-4 mb-5 mb-md-0">
            <div class="card h-100 ghost-card">
                <div class="ghost-image"></div>
                <div class="card-body">
                    <div class="mb-3">
                        <div class="ghost-text small"></div>
                    </div>
                    <div class="ghost-text large"></div>
                    <div class="ghost-text large"></div>
                </div>
            </div>
        </div>
    `;
}

// Funzione per recuperare e visualizzare gli ultimi 3 post
async function loadPosts() {
    const postsContainer = document.getElementById('posts-container');
    
    // Aggiungi 3 ghost cards
    for (let i = 0; i < 3; i++) {
        postsContainer.innerHTML += createGhostCard();
    }

    try {
        const rssUrl = 'https://medium.com/feed/@mattia.darge';
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`);
        const data = await response.json();
        const xmlData = data.contents;
        
        // Parso il feed RSS XML
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, "text/xml");
        const items = xmlDoc.getElementsByTagName('item');
        
        // Limitiamo a 3 post
        const posts = Array.from(items).slice(0, 3);
        
        // Svuota il container dai ghost elements
        postsContainer.innerHTML = '';
        
        posts.forEach((post, index) => {
            const title = post.querySelector('title').textContent;
            const link = post.querySelector('link').textContent;
            const pubDate = new Date(post.querySelector('pubDate').textContent);
            const tags = extractTags(post);
            
            const content = post.querySelector('encoded').textContent;
            const image = extractImages(content)[0] || 'https://via.placeholder.com/150';

            // Costruzione della card con animazione
            const postCard = `
                <div class="col-lg-4 mb-5 mb-lg-0" data-aos="fade-in" data-aos-delay="${index * 200}" onclick="openPost('${link}')">
                    <div class="card h-100">
                        <img src="${image}" class="card-img-top" alt="Post Image">
                        <div class="card-body">
                            <small class="d-block mb-2">${pubDate.toLocaleDateString()}</small>
                            <span class="badge bg-light text-dark mb-2 text-break text-wrap">${tags[0]}</span>
                            <b class="card-title">${title}</b>
                        </div>
                    </div>
                </div>
            `;
            
            postsContainer.innerHTML += postCard;
        });
    } catch (error) {
        console.error('Errore nel caricamento dei post:', error);
    }
}

function extractTags(post) {
    const tags = [];
    const categoryElements = post.getElementsByTagName('category');
    Array.from(categoryElements).forEach(category => {
        tags.push(category.textContent);
    });
    return tags;
}

function extractImages(content) {
    const regex = /<img[^>]+src="([^">]+)"/g;
    let match;
    const images = [];

    // Estrazione di tutte le immagini
    while (match = regex.exec(content)) {
        images.push(match[1]);
    }

    return images;
}

function openPost(link) {
    window.open(link, "_blank");
}

// Carica i post quando la pagina è pronta
document.addEventListener('DOMContentLoaded', loadPosts);