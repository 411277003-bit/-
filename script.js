// 宣告一個全域變數記錄當前語言 (預設為中文)
let currentLang = 'zh'; 

// ==========================================
// 1. 多國語言 (i18n) 系統與文章資料庫
// ==========================================
const translations = {
    zh: {
        title: "Vibe Log",
        welcome: "歡迎來到 Vibe Log",
        latest: "最新消息",
        news1: "新功能上線：多國語言支援！",
        news2: "分享：如何拍出充滿 Vibe 的照片",
        news3: "五月份閱讀書單推薦",
        comment_title: "讀者留言",
        placeholder: "輸入你的想法...",
        submit: "送出留言",
        name_placeholder: "您的暱稱",
        // 文章內容
        news1_content: "<p>我們非常興奮地宣布，Vibe Log 現在正式支援多國語言了！🌍</p><p>你可以透過右上角的下拉選單，輕鬆在「繁體中文」、「English」與「Français」之間切換。這將幫助我們將充滿靈感的故事傳遞給全球更多的讀者。趕快試試看吧！</p>",
        news2_content: "<p>要拍出有氛圍（Vibe）的照片，關鍵在於光線與構圖。以下是我的三個私藏技巧：</p><ul><li><strong>捕捉黃金時刻：</strong> 清晨或傍晚的陽光最柔和。</li><li><strong>適當留白：</strong> 不要把畫面塞滿，給主角一點呼吸的空間。</li><li><strong>降低飽和度：</strong> 在後期調色時，稍微降低對比與飽和度，就能輕鬆營造出高級的「莫蘭迪」質感。</li></ul>",
        news3_content: "<p>這個五月，讓我們用閱讀沉澱心靈。以下是我本月的推薦書單：</p><ul><li><strong>《原子習慣》</strong> - 每天進步 1%，帶來巨大的改變。</li><li><strong>《挪威的森林》</strong> - 村上春樹的經典，適合配著黑咖啡閱讀。</li><li><strong>《設計的心理學》</strong> - 了解日常物品背後的設計思維。</li></ul>"
    },
    en: {
        title: "Vibe Log",
        welcome: "Welcome to Vibe Log",
        latest: "Latest News",
        news1: "New Feature: Multi-language Support!",
        news2: "Share: How to take aesthetic photos",
        news3: "May Reading List Recommendations",
        comment_title: "Comments",
        placeholder: "Share your thoughts...",
        submit: "Submit",
        name_placeholder: "Your Name",
        // 文章內容
        news1_content: "<p>We are thrilled to announce that Vibe Log now supports multiple languages! 🌍</p><p>You can easily switch between Traditional Chinese, English, and French using the dropdown menu. This helps us share inspiring stories with a global audience. Try it out!</p>",
        news2_content: "<p>Capturing the perfect 'vibe' is all about lighting and composition. Here are my top 3 tips:</p><ul><li><strong>Golden Hour:</strong> Shoot during early morning or late afternoon.</li><li><strong>Negative Space:</strong> Don't clutter the frame; let your subject breathe.</li><li><strong>Desaturate:</strong> Lower the contrast and saturation slightly in editing to achieve that premium Morandi look.</li></ul>",
        news3_content: "<p>This May, let's calm our minds with some good reads:</p><ul><li><strong>Atomic Habits</strong> - Get 1% better every day.</li><li><strong>Norwegian Wood</strong> - A Haruki Murakami classic, best paired with black coffee.</li><li><strong>The Design of Everyday Things</strong> - Understand the thinking behind daily objects.</li></ul>"
    },
    fr: {
        title: "Vibe Log",
        welcome: "Bienvenue sur Vibe Log",
        latest: "Dernières Nouvelles",
        news1: "Nouveauté : Support Multilingue !",
        news2: "Partage : Comment prendre des photos esthétiques",
        news3: "Recommandations de lecture pour Mai",
        comment_title: "Commentaires",
        placeholder: "Partagez vos pensées...",
        submit: "Envoyer",
        name_placeholder: "Votre Nom",
        // 文章內容
        news1_content: "<p>Nous sommes ravis d'annoncer que Vibe Log est désormais multilingue ! 🌍</p><p>Vous pouvez facilement basculer entre le Chinois, l'Anglais et le Français via le menu déroulant. Cela nous permet de partager nos histoires avec le monde entier. Essayez-le !</p>",
        news2_content: "<p>Capturer la bonne 'vibe' dépend de la lumière et de la composition. Voici 3 astuces :</p><ul><li><strong>Heure Dorée :</strong> Prenez vos photos tôt le matin ou en fin d'après-midi.</li><li><strong>Espace Négatif :</strong> Laissez respirer votre sujet.</li><li><strong>Désaturation :</strong> Baissez légèrement le contraste pour un look élégant.</li></ul>",
        news3_content: "<p>Ce mois de mai, apaisons nos esprits avec ces lectures :</p><ul><li><strong>Atomic Habits</strong> - Devenez 1% meilleur chaque jour.</li><li><strong>La Ballade de l'impossible</strong> - Un classique de Murakami.</li><li><strong>Le Design des objets du quotidien</strong> - Comprendre la conception des objets de tous les jours.</li></ul>"
    }
};

function changeLanguage(lang) {
    currentLang = lang;
    const dict = translations[lang];
    
    // 替換一般文字
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) el.textContent = dict[key];
    });

    // 替換輸入框的 placeholder
    const textarea = document.getElementById('comment-text');
    if (textarea && dict['placeholder']) {
        textarea.placeholder = dict['placeholder'];
    }
    const nameInput = document.getElementById('comment-name');
    if (nameInput && dict['name_placeholder']) {
        nameInput.placeholder = dict['name_placeholder'];
    }
}

// ==========================================
// 打開與關閉文章彈窗邏輯
// ==========================================
function openArticle(newsId, dateStr) {
    const dict = translations[currentLang];
    
    document.getElementById('modal-title').innerText = dict[newsId];
    document.getElementById('modal-date').innerText = dateStr;
    document.getElementById('modal-body').innerHTML = dict[newsId + '_content'];

    const modal = document.getElementById('article-modal');
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

function closeArticle() {
    const modal = document.getElementById('article-modal');
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300);
}

// 點擊背景關閉
window.onclick = function(event) {
    const modal = document.getElementById('article-modal');
    if (event.target == modal) {
        closeArticle();
    }
}

// ==========================================
// 2. 圖片輪播 (Carousel) 系統
// ==========================================
const images = [
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=1200&q=80"
];

let currentIndex = 0;
const carouselImg = document.getElementById('carousel-img');

function showImage(index) {
    carouselImg.style.opacity = 0;
    setTimeout(() => {
        carouselImg.src = images[index];
        carouselImg.style.opacity = 1;
    }, 200);
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
}

setInterval(nextSlide, 4000);

// ==========================================
// 3. 留言板系統 (使用 LocalStorage)
// ==========================================
const commentForm = document.getElementById('comment-form');
const commentsList = document.getElementById('comments-list');

let comments = JSON.parse(localStorage.getItem('vibe_comments')) || [];

function renderComments() {
    commentsList.innerHTML = '';
    comments.forEach((comment, index) => {
        const div = document.createElement('div');
        div.className = 'comment-card';
        div.innerHTML = `
            <div class="comment-header">
                <strong>${comment.name}</strong>
                <button class="delete-btn" onclick="deleteComment(${index})" title="刪除留言">✕</button>
            </div>
            <p>${comment.text}</p>
        `;
        commentsList.prepend(div);
    });
}

function deleteComment(index) {
    if (confirm("確定要刪除這則留言嗎？")) {
        comments.splice(index, 1);
        localStorage.setItem('vibe_comments', JSON.stringify(comments));
        renderComments();
    }
}

commentForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    
    const nameInput = document.getElementById('comment-name');
    const textInput = document.getElementById('comment-text');

    comments.push({
        name: nameInput.value,
        text: textInput.value,
        date: new Date().toISOString()
    });

    localStorage.setItem('vibe_comments', JSON.stringify(comments));

    nameInput.value = '';
    textInput.value = '';
    renderComments();
});

renderComments();