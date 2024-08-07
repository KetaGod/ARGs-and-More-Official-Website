document.addEventListener('DOMContentLoaded', () => {
    const dropdownBtn = document.querySelector('.dropbtn');
    const dropdownContent = document.querySelector('.dropdown-content');

    dropdownBtn.addEventListener('click', () => {
        dropdownContent.classList.toggle('show');
    });

    window.addEventListener('click', (event) => {
        if (!event.target.matches('.dropbtn')) {
            if (dropdownContent.classList.contains('show')) {
                dropdownContent.classList.remove('show');
            }
        }
    });

    // example of dynamic content loading for my episodes
    const episodesSection = document.getElementById('episodes');

    if (episodesSection) {
        fetch('episodes.json')
            .then(response => response.json())
            .then(data => {
                data.episodes.forEach(episode => {
                    const episodeElement = document.createElement('div');
                    episodeElement.classList.add('episode');
                    episodeElement.innerHTML = `
                        <img src="${episode.thumbnail}" alt="${episode.title}">
                        <div>
                            <h3>${episode.title}</h3>
                            <p>${episode.description}</p>
                            <a href="${episode.link}" target="_blank">Listen Now</a>
                        </div>
                    `;
                    episodesSection.appendChild(episodeElement);
                });
            })
            .catch(error => console.error('Error loading episodes:', error));
    }

    // handle comment submission
    const commentForm = document.getElementById('comment-form');
    const commentSection = document.getElementById('comment-section');

    commentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const commentInput = document.getElementById('comment-input');
        const commentText = commentInput.value.trim();

        if (commentText) {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.textContent = commentText;
            commentSection.appendChild(commentElement);
            commentInput.value = '';
        }
    });
});
