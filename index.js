const posts = document.querySelector('.blog-posts');

fetch('https://apis.scrimba.com/jsonplaceholder/posts', {method: 'GET'})
  .then(res => res.json())
  .then(data => {
   const post = data.slice(0, 5);
   console.log(post)
   let html = '';
   for(let i = 0; i < post.length; i++){
    html += `
      <h1 class=blog-title> ${post[i].title} </h1>
      <p class=blog-body> ${post[i].body} </p>
      <hr />
    `
    console.log('yo');
   } 
   posts.innerHTML = html;
  })