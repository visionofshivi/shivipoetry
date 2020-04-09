const getAuthor = function (authorId, divId) {
  fetch('/postAuthor', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({authorId}),
  })
    .then((res) => res.json())
    .then((data) => {
      const $author = getElement(`#${divId}`);
      $author.innerHTML = `<a class="author" href="author/${data.userName}">${data.displayName}</a>`;
    });
};

const getComments = function (count, url, commentStatus) {
  let htmlString = '';
  if (commentStatus === 'open' && count) {
    htmlString = `<a class="comments" href="post/${url}#comments">${count} comments</a>`;
  }
  return htmlString;
};

const showPosts = function (postsData) {
  const $postContent = getElement('#posts');
  const htmlPostData = postsData.map((post) => {
    return `<div class="post">
      <div class="post-card">
        <a class="post-title" href="post/${post.url}">${post.title}</a>
        <div class="post-date-and-author">
          <div><a class="post-date" href="post/${post.url}">
          ${moment(post.date).format('MMM DD, YYYY  hh:mm:ss A')}</a></div>
          <div id="${post.url}"">
            ${getAuthor(post.author, post.url)}
          </div>
          <div>
            ${getComments(post.commentCount, post.url, post.commentStatus)}
          </div>
        </div>
        <div class="post-content">
          <span class="content">
          ${post.content.slice(0, 150).split('<br>').join('')}
          </span>
          <span class="read-more">
            <a href="post/${post.url}">Read More...</a>
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
