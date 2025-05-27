document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
            if (window.innerWidth <= 900) {
                document.getElementById('menu__toggle').checked = false;
            }
        });
    });

    fetch('./xml/content.xml')
        .then(response => {
            return response.text();
        })
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, 'text/xml');
            const paragraphElement = xmlDoc.querySelector('paragraph');
            const paragraphContent = paragraphElement.textContent.trim();
            console.log('Содержимое абзаца:', paragraphContent.substring(0, 50) + '...');
            const introParagraphDiv = document.getElementById('intro-paragraph');
            if (introParagraphDiv) {
                introParagraphDiv.textContent = paragraphContent;
            }
        });
});