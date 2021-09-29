let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

const toyURL = 'http://localhost:3000/toys'

function increaseLikes(toy) {
  let a = toy.likes
  let b = toy.id
  fetch(toyURL+'/'+b, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      likes: a+1
    })
  }).then(resp=>resp.json()).then(console.log)
}


const toyContainer = document.querySelector('#toy-collection')
function showToy(toy) {
  let div = document.createElement('div')
  div.className = 'card'
  let h2 = document.createElement('h2')
  h2.textContent = toy.name
  let img = document.createElement('img')
  img.src = toy.image
  img.className = 'toy-avatar'
  let p = document.createElement('p')
  if (toy.likes>1) {
    p.textContent = toy.likes.toString() + ' likes'
  } else {
    p.textContent = toy.likes.toString() + ' like'
  }
  let button = document.createElement('button')
  button.className = 'like-btn'
  button.id = toy.id
  button.textContent = 'Like'
  button.addEventListener('click', increaseLikes(toy))
  div.append(h2)
  div.append(img)
  div.append(p)
  div.append(button)
  toyContainer.append(div)
}

document.addEventListener("DOMContentLoaded", () => {
  fetch(toyURL).then(resp=>resp.json()).then(toys=>toys.forEach(element=>showToy(element)))
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector('form').addEventListener('submit', e=>{
    e.preventDefault()
    fetch(toyURL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: e.target.name.value,
        image: e.target.image.value,
        likes: 0
      })
    }).then(r=>r.json()).then(console.log)
    
  })
})