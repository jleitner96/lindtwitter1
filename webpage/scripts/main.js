document.addEventListener('DOMContentLoaded', () => {
    fetch('server/data.json')
        .then(response => response.json())
        .then(data => loadTweets(data.tweets));
});

function loadTweets(tweets) {
    const tweetsContainer = document.getElementById('tweets');
    tweets.forEach(tweet => {
        const tweetElement = document.createElement('div');
        tweetElement.className = 'tweet';
        tweetElement.innerHTML = `
            <img src="images/${tweet.image}" alt="Tweet">
            <button class="like-button" data-id="${tweet.id}">${tweet.likes} Likes</button>
        `;
        tweetsContainer.appendChild(tweetElement);
    });

    document.querySelectorAll('.like-button').forEach(button => {
        button.addEventListener('click', handleLike);
    });
}

function handleLike(event) {
    const button = event.target;
    const tweetId = button.getAttribute('data-id');
    const liked = button.classList.toggle('liked');

    fetch(`/like/${tweetId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ liked })
    }).then(response => response.json())
      .then(data => {
          button.textContent = `${data.likes} Likes`;
      });
}