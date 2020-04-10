const getOptions = function (body, method = 'GET') {
  return {
    method,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body),
  };
};

const postFetchAndRender = function (url, body, callback) {
  fetch(url, getOptions(body, 'POST'))
    .then((res) => res.json())
    .then(callback);
};

const getAuthor = function (authorId, divId) {
  const renderAuthor = function (data) {
    const $author = getElement(`#${divId}`);
    $author.innerHTML = `<a class="author" href="../../author/${data.userName}">${data.displayName}</a>`;
  };
  postFetchAndRender('/selector/postAuthor', {authorId}, renderAuthor);
};

const getComments = function (count, url, commentStatus) {
  let htmlString = '';
  if (commentStatus === 'open' && count) {
    htmlString = `<a class="comments" href="../../post/${url}">${count} comments</a>`;
  }
  return htmlString;
};

const showPost = function (post) {
  const htmlPostData = `
  <div class="post">
    <div class="post-card">
      <a class="post-title" href="../../post/${post.url}">
      ${post.title}</a>
      <div class="post-date-and-author">
        <div><a class="post-date" href="../../post/${post.url}">
        ${moment(post.date).format('MMM DD, YYYY  hh:mm:ss a')}</a></div>
        <div id="${post.url}"">${getAuthor(post.author, post.url)}</div>
        <div>
          ${getComments(post.commentCount, post.url, post.commentStatus)}
        </div>
      </div>
      <div class="post-content">
        <span class="content"> ${post.content.slice(0, 150)} </span>
        <span class="read-more">
          <a href="../../post/${post.url}">Read More...</a>
        </span>
      </div>
    </div>
    <div class="post-divider"></div>
  </div>`;
  getElement('#posts').innerHTML += htmlPostData;
};

const getPosts = function ({name, posts}, selector) {
  getElement('.page-title').innerHTML = `${selector} : ${name}`;
  if (!posts.length) {
    getElement('#posts').innerHTML = `<h1>No Post Found</h1>`;
    return;
  }
  posts.forEach((postId) => {
    postFetchAndRender('/selector/postContent', {id: postId}, showPost);
  });
};

const renderPosts = function () {
  const [, , , selector, selectElement] = window.location.href.split('/');
  fetch(`/${selector}/posts/${selectElement}`)
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((data) => getPosts(data, selector));
};

window.onload = renderPosts;
