let modal = document.getElementById('modal');
let floating_button = document.getElementsByClassName('floating_button')[0];
let modal_bg = document.getElementById('modal_bg');
let addlist_form = document.getElementById('addlist_form');
let root = document.getElementById('root');

let list_belanja = [];

floating_button.addEventListener('click', () => {
  if (modal.style.display == 'none') {
    showModal();
    return;
  }

  hideModal();
});

modal_bg.addEventListener('click', () => {
  hideModal();
});

addlist_form.addEventListener('submit', (event) => {
  event.preventDefault();

  let barang = event.target.barang.value;
  let harga = event.target.harga.value;

  list_belanja.push({
    nama_barang: barang,
    harga_barang: harga,
    tanggal: new Date().toLocaleDateString(),
  });

  console.info(list_belanja);

  event.target.barang.value = '';
  event.target.harga.value = '';

  hideModal();
  renderHtml();
});

function showModal() {
  modal.style.display = 'flex';
  floating_button.style.backgroundColor = 'rgb(161, 85, 76)';
  floating_button.style.transform = 'rotate(45deg)';
}

function hideModal() {
  modal.style.display = 'none';
  floating_button.style.backgroundColor = 'salmon';
  floating_button.style.transform = 'rotate(0deg)';
}

function renderHtml() {
  root.innerHTML = '';
  let rupiah = new Intl.NumberFormat('id', {
    style: 'currency',
    currency: 'IDR',
  });

  list_belanja.forEach((e, i) => {
    root.innerHTML += `
        <div class='card'>
        <small> ${e.tanggal} </small>
        <div>
            ${e.nama_barang} <span> ${rupiah.format(e.harga_barang)} </span>
        </div>
        <button onclick="handleDelete(${i})">Selesai</button>
        </div>
        `;
  });
}

function handleDelete(i) {
  list_belanja.splice(i, 1);
  renderHtml();
}
