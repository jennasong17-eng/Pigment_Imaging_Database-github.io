const form = document.getElementById('uploadForm');
const gallery = document.getElementById('gallery');

function loadGallery() {
  const images = JSON.parse(localStorage.getItem('images')) || [];
  gallery.innerHTML = '';

  images.forEach(img => {
    const div = document.createElement('div');
    div.className = 'image-card';
    div.innerHTML = `
      <img src="${img.data}" alt="${img.title}">
      <h3>${img.title || 'Untitled'}</h3>
      <p>${img.description || ''}</p>
      <small>By: ${img.author || 'Unknown'}</small>
    `;
    gallery.appendChild(div);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const file = document.getElementById('imageInput').files[0];
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const author = document.getElementById('author').value;

  const reader = new FileReader();
  reader.onload = () => {
    const images = JSON.parse(localStorage.getItem('images')) || [];
    images.push({
      data: reader.result,
      title,
      description,
      author
    });
    localStorage.setItem('images', JSON.stringify(images));
    loadGallery();
    form.reset();
  };
  reader.readAsDataURL(file);
});

window.onload = loadGallery;
