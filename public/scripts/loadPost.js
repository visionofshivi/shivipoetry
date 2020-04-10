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

const getAuthor = function (authorId) {
  const renderAuthor = function ({userName, displayName}) {
    const $author = getElement(`#author`);
    $author.innerHTML = `<a class="author" href="../author/${userName}">${displayName}</a>`;
  };
  postFetchAndRender('/postAuthor', {authorId}, renderAuthor);
};

const showComments = function (count, commentStatus) {
  let htmlString = '';
  if (commentStatus === 'open' && count) {
    htmlString = `<a class="comments">${count} comments</a>`;
  }
  return htmlString;
};

const getCategory = function (categories) {
  const renderCategory = function ({name, url}) {
    const htmlData = `<a href="../category/${url}" class="category">${name}</a>`;
    getElement('.categories').innerHTML += htmlData;
  };
  categories.forEach((category) => {
    postFetchAndRender('/post/category', {category}, renderCategory);
  });
};

const getTag = function (tags) {
  const renderTag = function ({name, url}) {
    const htmlData = `<a href="../tag/${url}" class="tag-item">${name}</a>`;
    getElement('.tags').innerHTML += htmlData;
  };
  tags.forEach((tag) => postFetchAndRender('/post/tag', {tag}, renderTag));
};

const renderLink = function (className) {
  return ({name, url}) => {
    const $nav = getElement(`#${className}`);
    $nav.classList.add(className);
    $nav.href = url;
    $nav.innerText = name;
  };
};

const getNavLinks = function (preLink, nextLink) {
  const url = '/post/nameAndUrl';
  postFetchAndRender(url, {id: preLink}, renderLink('nav-pre'));
  postFetchAndRender(url, {id: nextLink}, renderLink('nav-next'));
};

const showContent = function (post) {
  let htmlData = `<div class="post-title"><h1>No Data Found</h1></div>`;
  if (post.content !== '') {
    htmlData = `<div class="post-title"><h1>${post.title}</h1></div>
    <div class="categories"></div>
    <div class="post-date-and-author">
      <div><a class="post-date">
      ${moment(post.date).format('MMM DD, YYYY  hh:mm:ss a')}</a></div>
      <div id="author"></div>
      <div>${showComments(post.commentCount, post.commentStatus)}</div>
    </div>
    <div class="content">${post.content}</div>
    <div class="tags"><span class="tag-title">Tagged</span></div>
    <div class="nav-links"><a id="nav-pre"></a><a id="nav-next"></a></div>
    <div class="divider"></div>`;
    getAuthor(post.author);
    getCategory(post.categories);
    getTag(post.tags);
    getNavLinks(post.preLink, post.nextLink);
  }
  getElement('#content').innerHTML = htmlData;
};

const loadPost = function () {
  const [, , , ...url] = window.location.href.split('/');
  const postUrl = url.join('/');
  postFetchAndRender('/post/content', {postUrl}, showContent);
};

window.onload = loadPost;
