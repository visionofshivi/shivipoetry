const showAuthor = function ({userName, displayName}) {
  return `<a class="author" href="../author/${userName}">${displayName}</a>`;
};

const showComments = function (count, url, commentStatus) {
  let htmlString = '';
  if (commentStatus === 'open' && count) {
    htmlString = `<a class="comments" href="../post/${url}">${count} comments</a>`;
  }
  return htmlString;
};

const showAllPost = function (postsData) {
  const $postContent = getElement('#posts');
  const htmlPostData = postsData.map((post) => {
    return `<div class="post">
      <div class="post-card">
        <a class="post-title" href="../post/${post.url}">${post.title}</a>
        <div class="post-date-and-author">
          <div><a class="post-date" href="../post/${post.url}">
          ${moment(post.date).format('MMM DD, YYYY  hh:mm:ss a')}</a></div>
          <div>${showAuthor(post.author)}</div>
          <div>
            ${showComments(post.commentCount, post.url, post.commentStatus)}
          </div>
        </div>
        <div class="post-content">
          <span class="content"> ${post.content.slice(0, 150)} </span>
          <span class="read-more">
            <a href="../post/${post.url}">Read More...</a>
          </span>
        </div>
      </div>
      <div class="post-divider"></div>
    </div>`;
  });
  $postContent.innerHTML = htmlPostData.join('');
};

const showPosts = function (posts) {
  if (!posts.length) {
    getElement('#posts').innerHTML = `<h1>No Post Found</h1>`;
    return;
  }
  showAllPost(posts);
};

const renderPosts = function () {
  const [, , , selector, selectElement] = window.location.href.split('/');
  fetch(`/posts/${selector}/${selectElement}`)
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then(showPosts);
  getElement('.page-title').innerHTML = `${selector} : ${selectElement}`;
};

window.onload = renderPosts;