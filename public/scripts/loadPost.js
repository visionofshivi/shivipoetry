const getOptions = function (body, method = 'GET') {
  return {
    method,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body),
  };
};

const getAuthor = function (authorId) {
  fetch('/postAuthor', getOptions({authorId}, 'POST'))
    .then((res) => res.json())
    .then((author) => {
      const $author = getElement(`#author`);
      $author.innerHTML = `<a class="author" href="../author/${author.userName}">${author.displayName}</a>`;
    });
};

const showComments = function (count, commentStatus) {
  let htmlString = '';
  if (commentStatus === 'open' && count) {
    htmlString = `<a class="comments">${count} comments</a>`;
  }
  return htmlString;
};

const getCategory = function (categories) {
  if (categories.length) {
    categories.forEach((category) => {
      fetch('/post/category', getOptions({category}, 'POST'))
        .then((res) => res.json())
        .then(({name, url}) => {
          const htmlData = `<a href="../category/${url}" class="category">${name}</a>`;
          getElement('.categories').innerHTML += htmlData;
        });
    });
  }
};

const getNavLinks = function (links) {
  links.forEach((link, index) => {
    fetch('/post/nameAndUrl', getOptions({id: link}, 'POST'))
      .then((res) => res.json())
      .then(({name, url}) => {
        const $nav = getElement('.nav-links');
        const className = index ? 'nav-next' : 'nav-pre';
        if (name && url)
          $nav.innerHTML += `<a class="${className}" href="${url}">${name}</a>`;
      });
  });
};

const showContent = function (post) {
  let htmlData = `<div class="post-title"><h1>No Data Found</h1></div>`;
  if (post.content !== '') {
    htmlData = `<div class="post-title"><h1>${post.title}</h1></div>
    <div class="categories"></div>
    <div class="post-date-and-author">
      <div><a class="post-date">
      ${moment(post.date).format('MMM DD, YYYY  hh:mm:ss A')}</a></div>
      <div id="author"></div>
      <div>${showComments(post.commentCount, post.commentStatus)}</div>
    </div>
    <div class="content">${post.content}</div>
    <div class="tags">
      <span class="tag-title">Tagged</span>
      <a href="/" class="tag-item">HTML</a>
      <a href="/" class="tag-item">Romantic</a>
      <a href="/" class="tag-item">Love</a>
    </div>
    <div class="nav-links"></div>
    <div class="divider"></div>`;
    getAuthor(post.author);
    getCategory(post.categories);
    getNavLinks([post.preLink, post.nextLink]);
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
