const posts = document.querySelector('.blog-posts');
const blogForm = document.querySelector('#blog-form');
const blogTitle = document.querySelector('#blog-name');
const blogPost = document.querySelector('#blog-post');

let postsArray = [];

// Refactored - created function to create blog html and store in variable
const renderPosts = (arr) => {
  let html = '';
  for(let elem of arr) {
    html +=
    `
    <h1 class=blog-title> ${elem.title} </h1>
    <p class=blog-body> ${elem.body} </p>
    <hr />
    `
  }
  console.log(html)
  return html;
}

fetch('https://apis.scrimba.com/jsonplaceholder/posts', {method: 'GET'})
.then(res => res.json())
.then(data => {
  postsArray = data.slice(0, 5);
  // localStorage.setItem('blogArray', )
  posts.innerHTML = renderPosts(postsArray);
  })
  
  
  const submit = (e) => {
    e.preventDefault();
    let blogName = blogTitle.value;
    let blogText = blogPost.value;
    const blogObj = {
      title: blogName,
      body: blogText
    }
    const options = {
      // default action of fetch() is GET. Need to pass second param of an object detailing type of request
      method: 'POST',
      body: JSON.stringify(blogObj),
      headers: {
        // tells db that the content of this msg is in json format. Now it knows to parse JS obj out of it and return that to us. Headers are just metadata.
        'Content-Type': 'application/json'
      }
    }

    fetch('https://apis.scrimba.com/jsonplaceholder/posts', options)
    .then(res => res.json())
    .then(post => {
      // data is in array so just use unshift() to store new entry in beginning instead of laying out mark up structure.
      postsArray.unshift(post);
      posts.innerHTML = renderPosts(postsArray);
      // clears input fields - 2 ways
      // blogTitle.value = '';
      // blogPost.value = '';
      blogForm.reset();
    })
   }

  //  forms act as one block and default action of buttons assoc with forms is submit
  blogForm.addEventListener('submit', submit);