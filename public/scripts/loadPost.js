const getOptions = function (body, method = 'GET') {
  return {
    method,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body),
  };
};

const getAuthor = function (authorId, divId) {
  fetch('/postAuthor', getOptions({authorId}, 'POST'))
    .then((res) => res.json())
    .then((data) => {
      const $author = getElement(`#${divId}`);
      $author.innerHTML = `<a class="author" href="../author/${data.userName}">${data.displayName}</a>`;
    });
};

const getComments = function (count, commentStatus) {
  let htmlString = '';
  if (commentStatus === 'open' && count) {
    htmlString = `<a class="comments" href="#comments">${count} comments</a>`;
  }
  return htmlString;
};

const getCategory = function () {
  // <a href="/" class="category">Subcategory</a>
  // <a href="/" class="category">Romantic</a>
  return '';
};

const showContent = function (post) {
  let htmlData = `<div class="post-title"><h1>No Data Found</h1></div>`;
  if (post.content !== '') {
    htmlData = `<div class="post-title"><h1>${post.title}</h1></div>
    <div class="categories">${getCategory(post.categories)}</div>
    <div class="post-date-and-author">
      <div><a class="post-date">
      ${moment(post.date).format('MMM DD, YYYY  hh:mm:ss A')}</a></div>
      <div id="${post.url}">
        ${getAuthor(post.author, post.url)}
      </div>
      <div>${getComments(post.commentCount, post.url)}</div>
    </div>
    <div class="content">${post.content}</div>
    <div class="tags">
      <span class="tag-title">Tagged</span>
      <a href="/" class="tag-item">HTML</a>
      <a href="/" class="tag-item">Romantic</a>
      <a href="/" class="tag-item">Love</a>
    </div>
    <div class="nav-links">
      <a class="nav-pre" href="/">Links</a>
      <a class="nav-next" href="/">Romantic Poem</a>
    </div>
    <div class="divider"></div>`;
  }
  getElement('#content').innerHTML = htmlData;
};

const loadPost = function () {
  const [, , , ...url] = window.location.href.split('/');
  const postUrl = url.join('/');
  fetch('/post/content', getOptions({postUrl}, 'POST'))
    .then((res) => res.json())
    .then((data) => showContent(data));
};

window.onload = loadPost;
