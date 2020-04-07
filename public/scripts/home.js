const showPosts = function (postsData) {
  const $postContent = getElement('#posts');
  const htmlPostData = postsData.map((post) => {
    return `<div class="post">
      <div class="post-card">
        <a class="post-title" href="${post.postName}">
          ${post.postTitle}
        </a>
        <div class="post-date-and-author">
          <div class="post-date">${post.postDate}</div>
          <div class="author">${post.postAuthor}</div>
        </div>
        <div class="post-content">
          <span class="content">
          ${post.postContent.slice(0, 150)}
          </span>
          <span class="read-more">
            <a href="posts/${post.postName}" target="_blank">Read More...</a>
          </span>
        </div>
      </div>
      <div class="post-divider"></div>
    </div>`;
  });
  $postContent.innerHTML = htmlPostData.join('');
};

const renderPosts = function () {
  fetch('/posts')
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then(showPosts);
};

const renderData = function () {
  renderPosts();
};

window.onload = renderData;
