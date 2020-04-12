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

const showAuthor = function ({userName, displayName}) {
  return `<a class="author" href="../author/${userName}">${displayName}</a>`;
};

const showComments = function (count, commentStatus) {
  let htmlString = '';
  if (commentStatus === 'open' && count) {
    htmlString = `<a class="comments">${count} comments</a>`;
  }
  return htmlString;
};

const showCategory = function (categories) {
  const categoriesHtml = categories.map(({name, url}) => {
    return `<a href="../category/${url}" class="category">${name}</a>`;
  });
  return categoriesHtml.join('');
};

const showTag = function (tags) {
  const tagsHtml = tags.map(({name, url}) => {
    return `<a href="../tag/${url}" class="tag-item">${name}</a>`;
  });
  return tagsHtml.join('');
};

const getLink = function (link, className) {
  let linkHtml = '<a></a>';
  if (link) {
    linkHtml = `<a href="${link.url}" class="${className}">${link.title}</a>`;
  }
  return linkHtml;
};

const showNavLinks = function (preLink, nextLink) {
  const preLinkHtml = getLink(preLink, 'nav-pre');
  return preLinkHtml + getLink(nextLink, 'nav-next');
};

const showContent = function (post) {
  let htmlData = `<div class="post-title"><h1>No Data Found</h1></div>`;
  if (post.content !== '') {
    htmlData = `<div class="post-title"><h1>${post.title}</h1></div>
    <div class="categories">${showCategory(post.categories)}</div>
    <div class="post-date-and-author">
      <div><a class="post-date">
      ${moment(post.date).format('MMM DD, YYYY  hh:mm:ss a')}</a></div>
      <div>${showAuthor(post.author)}</div>
      <div>${showComments(post.commentCount, post.commentStatus)}</div>
    </div>
    <div class="content">${post.content}</div>
    <div class="tags"><span class="tag-title">Tagged</span>
      <span>${showTag(post.tags)}</span>
    </div>
    <div class="nav-links">${showNavLinks(post.preLink, post.nextLink)}</div>
    <div class="divider"></div>`;
  }
  getElement('#content').innerHTML = htmlData;
};

const main = function () {
  const [, , , ...url] = window.location.href.split('/');
  const postUrl = url.join('/');
  postFetchAndRender('/post/content', {postUrl}, showContent);
};

window.onload = main;
