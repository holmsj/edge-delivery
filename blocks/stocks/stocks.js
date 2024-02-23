async function fetchStockPrice(id) {
  const response = await fetch(`https://65d7b32527d9a3bc1d7ba74e.mockapi.io/price?id=${id}`).then((response) => response.json())
  return response;
  }

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
    div.className = 'stock-id';
    fetchStockPrice(div.textContent).then(data => {
      const priceDiv = document.createElement("div");
      priceDiv.className = "stock-price";
      if (data[0].dailyGain) li.classList.add('daily-gain')
      priceDiv.append(data[0].price);
      li.append(priceDiv);
      });;
    });
    ul.append(li);
  });
  block.textContent = '';
  block.append(ul);
  }
