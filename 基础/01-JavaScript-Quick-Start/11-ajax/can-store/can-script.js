
var products;

function getProduct() {
  var url = 'products.json'
  var request = new XMLHttpRequest()
  request.open("GET", url)
  request.responseType = 'json'
  request.send()
  request.onload = function() {
    if (request.status === 200 || request.readyState === 4) {
      products = request.response
      initialize()
    } else {
      console.log('Network request for products.json failed with response ' + request.status + ': ' + request.statusText);
    }

  }
}
getProduct()

function initialize() {

  var category = document.querySelector('#category');
  var searchTerm = document.querySelector('#searchTerm');
  var searchBtn = document.querySelector('button');
  var main = document.querySelector('main');

  var lastCategory = category.value;

  var lastSearch = '';

  var categoryGroup;
  var finalGroup;


  finalGroup = products;
  updateDisplay();

  categoryGroup = [];
  finalGroup = [];

  searchBtn.onclick = selectCategory;

  function selectCategory(e) {

    e.preventDefault();


    categoryGroup = [];
    finalGroup = [];

    if (category.value === lastCategory && searchTerm.value.trim() === lastSearch) {
      return;
    } else {

      lastCategory = category.value;
      lastSearch = searchTerm.value.trim();

      if (category.value === 'All') {
        categoryGroup = products;
        selectProducts();
      } else {
        var lowerCaseType = category.value.toLowerCase();
        for (var i = 0; i < products.length; i++) {
          if (products[i].type === lowerCaseType) {
            categoryGroup.push(products[i]);
          }
        }
        selectProducts();
      }
    }
  }

  function selectProducts() {
    if (searchTerm.value.trim() === '') {
      finalGroup = categoryGroup;
      updateDisplay();
    } else {
      var lowerCaseSearchTerm = searchTerm.value.trim().toLowerCase();
      for (var i = 0; i < categoryGroup.length; i++) {
        if (categoryGroup[i].name.indexOf(lowerCaseSearchTerm) !== -1) {
          finalGroup.push(categoryGroup[i]);
        }
      }
      updateDisplay();
    }

  }

  function getBlob(product) {
    var url = 'images/' + product.image
    var request = new XMLHttpRequest()
    request.open("GET", url)
    request.responseType = "blob"
    request.send()
    request.onload = function() {
      if (request.status === 200 || request.readyState === 4) {
        var objectURL = URL.createObjectURL(request.response)
        showProduct(objectURL, product)
      } else {
        console.log('Network request for "' + product.name + '" image failed with response ' + request.status + ': ' + request.statusText);
      }
    }

  }

  function updateDisplay() {
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }
    if (finalGroup.length === 0) {
      var para = document.createElement('p');
      para.textContent = 'No results to display!';
      main.appendChild(para);
    } else {
      for (var i = 0; i < finalGroup.length; i++) {
        getBlob(finalGroup[i]);
      }
    }
  }

  function showProduct(objectURL, product) {
    var section = document.createElement('section');
    var heading = document.createElement('h2');
    var para = document.createElement('p');
    var image = document.createElement('img');
    section.setAttribute('class', product.type);
    heading.textContent = product.name.replace(product.name.charAt(0), product.name.charAt(0).toUpperCase());

    para.textContent = '$' + product.price.toFixed(2);

    image.src = objectURL;
    image.alt = product.name;

    main.appendChild(section);
    section.appendChild(heading);
    section.appendChild(para);
    section.appendChild(image);
  }
}
