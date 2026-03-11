const form = document.getElementById('uploadForm');
const gallery = document.getElementById('gallery');

const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalAuthor = document.getElementById('modalAuthor');
const closeBtn = document.querySelector('.close');

function loadGallery() {
  const images = JSON.parse(localStorage.getItem('images')) || [];
  gallery.innerHTML = '';

  images.forEach((img, index) => {
    const div = document.createElement('div');
    div.className = 'image-card';
    div.innerHTML = `<img src="${img.data}" alt="${img.title}">`;
    div.addEventListener('click', () => openModal(img));
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
    images.push({ data: reader.result, title, description, author });
    localStorage.setItem('images', JSON.stringify(images));
    loadGallery();
    form.reset();
  };
  reader.readAsDataURL(file);
});

function openModal(img) {
  modalImage.src = img.data;
  modalTitle.textContent = img.title || "Untitled";
  modalDescription.textContent = img.description || "";
  modalAuthor.textContent = "By: " + (img.author || "Unknown");
  modal.style.display = 'block';
}

closeBtn.onclick = () => modal.style.display = 'none';
window.onclick = e => { if (e.target === modal) modal.style.display = 'none'; }

window.onload = loadGallery;
