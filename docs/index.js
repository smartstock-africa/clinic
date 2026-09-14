export function sortTable(sort_key, parsed_products, sort_type) {
  $('.sortVisible').addClass('activated');
  if (sort_type === 'ascending') {
    parsed_products.sort((a, b) => {
      const x = a[sort_key];
      const y = b[sort_key];

      if (typeof x === 'number' && typeof y === 'number') {
        return x - y;
      }

      return String(x).localeCompare(String(y));
    });
  } else {
    parsed_products.sort((a, b) => {
      const x = a[sort_key];
      const y = b[sort_key];

      if (typeof x === 'number' && typeof y === 'number') {
        return y - x;
      }

      return String(y).localeCompare(String(x));
    });
  }
  populateProductTable(parsed_products);
  $('.sortInvisible')
    .removeClass('animate__fadeInDown')
    .addClass('animate__fadeOutUp');
}

function showSuccessMessage(notification, notificationMessage) {
  let notificationHtml = `
            <div class='notificationContainer'>
              <div class='notificationHolder'>
                <div class='notification success_notification animated__animated animate__fadeInUp'>
                  <div class='notificationIconHolder'>
                    <svg width='30px' height='30px' viewBox='0 0 24 24' role='img' xmlns='http://www.w3.org/2000/svg' aria-labelledby='circleOkIconTitle' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' fill='none' color='#000000'> 
                    <title id='circleOkIconTitle'>OK</title> 
                    <polyline points='7 13 10 16 17 9'/> 
                    <circle cx='12' cy='12' r='10'/> </svg>
                  </div>
                  <div class='notificationTitleHolder'>
                    <span id='notifTitle'></span>
                  </div>
                  <div class='notificationTextHolder'>
                    <span id='notifContent'></span>
                  </div>
                </div>
              </div>
            </div>
          `;

  $('.mainContent').prepend(notificationHtml);
  $('#notifTitle').text(notification);
  $('#notifContent').text(notificationMessage);
  let $el = $('.notification');
  setTimeout(() => {
    $el
      .removeClass('animate__fadeInUp')
      .addClass('animate__fadeOutDown')
      .one('animationend', function () {
        $(this).parent().parent().remove();
      });
  }, 3000);
}

function showErrorMessage(notification, notificationMessage) {
  let notificationHtml = `
            <div class='notificationContainer'>
              <div class='notificationHolder'>
                <div class='notification error_notification animated__animated animate__fadeInUp'>
                  <div class='notificationIconHolder'>
                    <svg width='30px' height='30px' viewBox='0 0 24 24' role='img' xmlns='http://www.w3.org/2000/svg' aria-labelledby='errorIconTitle' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' fill='none' color='#000000'> 
                    <title id='errorIconTitle'>Error</title> 
                    <path d='M12 8L12 13'/> 
                    <line x1='12' y1='16' x2='12' y2='16'/> 
                    <circle cx='12' cy='12' r='10'/> 
                    </svg>
                  </div>
                  <div class='notificationTitleHolder'>
                    <span id='notifTitle'></span>
                  </div>
                  <div class='notificationTextHolder'>
                    <span id='notifContent'></span>
                  </div>
                </div>
              </div>
            </div>
          `;

  $('.mainContent').prepend(notificationHtml);
  $('#notifTitle').text(notification);
  $('#notifContent').text(notificationMessage);
  let $el = $('.notification');
  setTimeout(() => {
    $el
      .removeClass('animate__fadeInUp')
      .addClass('animate__fadeOutDown')
      .one('animationend', function () {
        $(this).parent().parent().remove();
      });
  }, 3000);
}

function returnSearchedProducts(searched_value, parsed_products) {
  let keys = ['title', 'category'];
  return parsed_products.filter((product) =>
    keys.some((value) =>
      String(product[value]).toLowerCase().includes(searched_value)
    )
  );
}

function placeProductsInTable(products) {
  let saved_sort_data = localStorage.getItem('sort_data');
  let saved_search_data = localStorage.getItem('search_term');
  $('#start_index').text(products[0].id);
  $('#end_index').text(products[products.length - 1].id);
  let changed_stocks = JSON.parse(localStorage.getItem('changed_stocks')) || [];

  if (changed_stocks.length) {
    changed_stocks.forEach((ch_stock) => {
      const match = products.find((product) => product.id === ch_stock.id);

      if (match) {
        match.stock = ch_stock.stock;
      }
    });
  }
  localStorage.setItem('clinic_products', JSON.stringify(products));
  if (saved_sort_data && !saved_search_data) {
    saved_sort_data = JSON.parse(saved_sort_data);
    sortTable(saved_sort_data.sort_key, products, saved_sort_data.sort_type);
  } else if (saved_search_data && !saved_sort_data) {
    $('#productSearcher').val(saved_search_data);
    let searched_products = returnSearchedProducts(saved_search_data, products);
    populateProductTable(searched_products);
  } else if (saved_search_data && saved_sort_data) {
    $('#productSearcher').val(saved_search_data);
    let searched_products = returnSearchedProducts(saved_search_data, products);
    populateProductTable(searched_products);
    saved_sort_data = JSON.parse(saved_sort_data);
    sortTable(
      saved_sort_data.sort_key,
      searched_products,
      saved_sort_data.sort_type
    );
  } else {
    populateProductTable(products);
  }
}

// chatgpt heree
let capitalized = (str) => (str ? str[0].toUpperCase() + str.slice(1) : '');
function populateProductTable(products) {
  let tableRow = '';
  let sort_key_html = '';

  let sort_keys = [
    'id',
    'title',
    'description',
    'category',
    'price',
    'sku',
    'brand',
    'stock',
  ];

  sort_keys.forEach((sort) => {
    sort_key_html += `
                  <div class='sort ' data-sort='${sort}'>
                      <div class='sortId'>
                          <span>${capitalized(sort)}</span>
                      </div>
                      <div class='sortOrderContainer'>
                          <div class='sortOrder enter_clickable' data-sort-type='descending' tabindex='-1'>
                            <svg version='1.2' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 800' width='20px' height='20px'>
                            	<style>
                            		.s0 { fill: none;stroke: var(--stroke);stroke-linecap: round;stroke-width: 50 } 
                            		.s1 { fill: none;stroke: var(--stroke);stroke-linecap: round;stroke-linejoin: round;stroke-width: 50 } 
                            	</style>
                            	<path class='s0' d='m133.33 266.67h300'/>
                            	<path class='s0' d='m200 433.33h233.33'/>
                            	<path class='s1' d='m576.67 133.33v533.34l100-133.34'/>
                            	<path class='s0' d='m266.67 600h166.66'/>
                            </svg>
                          </div>
                          <div class='sortOrder enter_clickable' data-sort-type='ascending' tabindex='0'>
                            <svg
                              width='20px'
                              height='20px'
                              viewBox='0 0 24 24'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M4 16L13 16'
                                stroke='var(--stroke)'
                                stroke-width='1.5'
                                stroke-linecap='round'
                              />
                              <path
                                d='M6 11H13'
                                stroke='var(--stroke)'
                                stroke-width='1.5'
                                stroke-linecap='round'
                              />
                              <path
                                d='M8 6L13 6'
                                stroke='var(--stroke)'
                                stroke-width='1.5'
                                stroke-linecap='round'
                              />
                              <path
                                d='M17 4L17 20L20 16'
                                stroke='var(--stroke)'
                                stroke-width='1.5'
                                stroke-linecap='round'
                                stroke-linejoin='round'
                              />
                            </svg>
                          </div>
                        </div>
                  </div>
              `;
  });

  products.forEach((product) => {
    tableRow += `
                <tr tabindex='0' class='enter_clickable animate__animated animate__fadeInUp' data-product-id='${product.id}'>
                    <td class='align-center numerical'>${product.id}</td>
                    <td style='width: 35px'>
                        <div class='tableImage'>
                            <div class='tableImageHolder'>
                                <img src='${product.thumbnail}' alt='Product Image for ${product.title}' loading='lazy'>
                            </div>
                        </div>
                    </td>
                    <td>${product.title}</td>
                    <td class='align-center'>${capitalized(product.category)}</td>
                    <td class='align-right numerical'>${product.price.toLocaleString(
                      'en-US',
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}</td>
                    <td class='align-right numerical'>${product.stock}</td>
                </tr>
            `;
  });

  $('#products').empty().append(tableRow);
  $('.sortBoxHolder').empty().append(sort_key_html);
}

let params = new URLSearchParams(window.location.search);

function updateLink(url) {
  history.pushState({}, '', url);
  params = new URLSearchParams(window.location.search);
}
document.addEventListener('DOMContentLoaded', function () {
  let tokens = localStorage.getItem('clinic_login');
  let searched_products;

  if (tokens) {
    tokens = JSON.parse(tokens);
    $.ajax({
      type: 'GET',
      headers: {
        Authorization: `Bearer ${tokens.access}`,
      },
      url: 'https://dummyjson.com/user/me',
      success: function (response) {
        provideDetails(response.firstName, response.image);
        const category = params.get('category');
        if (category) {
          fetchProducts(0, category);
        } else {
          let index = localStorage.getItem('skip_amount');

          if (index) {
            fetchProducts(index);
          } else {
            fetchProducts();
          }
        }
      },
    });
  }

  const sort = params.get('sort');
  if (sort) {
    localStorage.setItem('sort_data', decodeURIComponent(sort));
  }
  const search = params.get('search');
  if (search) {
    localStorage.setItem('search_term', search);
  }

  const item = params.get('item');
  if (item) {
    fetchSingleProduct(item);
  }

  $('main').on('click', '#loginButton', function () {
    NProgress.start();

    let username = $('#username').val().toLowerCase().trim();
    let password = $('#password').val().trim();
    if (username.length && password.length) {
      $.ajax({
        type: 'POST',
        url: 'https://dummyjson.com/auth/login',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          username: username,
          password: password,
          expiresInMins: 10,
        }),
        success: function (response) {
          let tokens = JSON.stringify({
            access: response.accessToken,
            refresh: response.refreshToken,
          });
          provideDetails(response.firstName, response.image);
          const category = params.get('category');
          if (category) {
            fetchProducts(0, category);
          } else {
            fetchProducts();
          }
          startTimer();
          localStorage.setItem('clinic_login', tokens);
        },
        error: function () {
          showErrorMessage(
            'Invalid Details',
            'You have entered the wrong username or password'
          );
        },
      });
    } else {
      NProgress.done();
      showErrorMessage('Empty Data', 'Enter data in both fields.');
    }
  });

  function saveAndDisplayProducts(response) {
    $('#loginForm').fadeOut(function () {
      $('#productList').fadeIn(function () {
        let response_products = response.products;
        localStorage.setItem(
          'clinic_products',
          JSON.stringify(response_products)
        );
        placeProductsInTable(response_products);
        products = localStorage.getItem('clinic_products');
        NProgress.done();
      });
    });
  }

  let products,
    skip_tracker = 0,
    category_html = '';

  function placeCategories(response) {
    if ($('.categoryOptions').children().length) {
      return;
    }
    response.forEach((element) => {
      category_html += `
              <div class='categoryOption enter_clickable' data-category='${element}' tabindex='-1'>
                <span>${element}</span>
              </div>
            `;
    });
    $('.categoryOptions').empty().append(category_html);
    category_html = '';
  }

  function fetchCategories() {
    let categories = localStorage.getItem('categories');
    if (categories) {
      placeCategories(JSON.parse(categories));
    } else {
      $.ajax({
        type: 'GET',
        url: 'https://dummyjson.com/products/category-list',
        success: function (response) {
          placeCategories(response);
          localStorage.setItem('categories', JSON.stringify(response));
        },
      });
    }
  }

  function fetchProducts(skip = 0, category = null, clean = true) {
    NProgress.start();
    fetchCategories();
    products = localStorage.getItem('clinic_products');

    if (products && skip_tracker === skip && !category && !clean) {
      $('#loginForm').fadeOut(function () {
        $('#productList').fadeIn(function () {
          placeProductsInTable(JSON.parse(products));
          NProgress.done();
        });
      });
    } else if (category) {
      $('.categoryFilter').addClass('activated');
      $(`[data-category='${category}']`).addClass('categorized');

      $.ajax({
        type: 'GET',
        url: `https://dummyjson.com/products/category/${category}`,
        success: saveAndDisplayProducts,
      });
    } else if (clean) {
      $.ajax({
        type: 'GET',
        url: `https://dummyjson.com/products?select=id,title,price,category,stock,sku,thumbnail&skip=${skip}`,
        success: saveAndDisplayProducts,
      });
    }
    skip_tracker = skip;
  }

  function provideDetails(firstName, profileImage) {
    let profileHtml = `
            <div class='profileContainer'>
                <div class='profile'>
                    <div class='profilePhoto'>
                        <img src='${profileImage}' alt='${firstName} profile image'>
                    </div>
                    <div class='profileIntro'>
                        <span>Hello, ${firstName}</span>
                    </div>
                </div>
            </div>
        `;
    $('.headerActionButton').empty().append(profileHtml);
  }

  function returnDefault() {
    NProgress.start();
    let defaultHtml = `
            <div class='headerActionButtonText'>
              <span>Login</span>
            </div>
        `;
    $('.headerActionButton').empty().append(defaultHtml);
    $('#productList').fadeOut(function () {
      $('#loginForm').find('input').val('');
      $('#loginForm').fadeIn(function () {
        localStorage.removeItem('clinic_products');
        localStorage.removeItem('sort_data');
        NProgress.done();
      });
    });
  }

  // CHATGPT HELPED ME HERE
  const DELAY = 600 * 1000; // 1 minute

  function startTimer() {
    const targetTime = Date.now() + DELAY;

    localStorage.setItem('timerTarget', targetTime);

    setTimeout(checkTimer, DELAY);
  }

  function checkTimer() {
    const targetTime = Number(localStorage.getItem('timerTarget'));

    if (!targetTime) return;

    const remaining = targetTime - Date.now();

    if (remaining <= 0) {
      localStorage.removeItem('timerTarget');

      // Your function
      returnDefault();
    } else {
      // Page was reloaded, so schedule the remaining time
      setTimeout(checkTimer, remaining);
    }
  }

  // Check when the page loads/reloads
  checkTimer();
  const debounce = (fn, delay = 300) => {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), delay);
    };
  };
  //   CHATGPT HELPED ME HERE
  $('main').on(
    'input',
    '#productSearcher',
    debounce(function (e) {
      let searched_value = e.target.value.trim().toLowerCase();
      let parsed_products = JSON.parse(products);
      searched_products = returnSearchedProducts(
        searched_value,
        parsed_products
      );
      if (searched_products.length) {
        localStorage.setItem('search_term', searched_value);
        const url = new URL(window.location.href);

        url.searchParams.set('search', searched_value);
        updateLink(url);
        populateProductTable(searched_products);
      } else {
        localStorage.removeItem('search_term');
        populateProductTable(parsed_products);
      }
    })
  );

  function displayElement($el, children) {
    if ($el.hasClass('animate__fadeInDown')) {
      $el.removeClass('animate__fadeInDown').addClass('animate__fadeOutUp');
      $el.find(children).attr('tabindex', '-1');
    } else {
      $el.removeClass('animate__fadeOutUp').addClass('animate__fadeInDown');
      $el.find(children).attr('tabindex', '0');
    }
  }

  $('main').on('click', '.sortVisible', function () {
    removeElement($('.categoryOptions'), '.categoryOption');

    displayElement($('.sortInvisible'), '.sortOrder');
  });

  $('main').on('click', '.categoryFilter', function () {
    removeElement($('.sortInvisible'), '.sortOrder');

    displayElement($('.categoryOptions'), '.categoryOption');
  });

  let sort_algorithm = new Object();
  $('main').on('click', '.sortOrder', function () {
    let sort_key = $(this).closest('.sort').data('sort');
    let parsed_products = JSON.parse(localStorage.getItem('clinic_products'));
    if (searched_products) {
      parsed_products = searched_products;
    }
    let sort_type = $(this).data('sort-type');

    sortTable(sort_key, parsed_products, sort_type);
    sort_algorithm = {
      sort_key: sort_key,
      sort_type: sort_type,
    };
    localStorage.setItem('sort_data', JSON.stringify(sort_algorithm));
    const encoded = encodeURIComponent(JSON.stringify(sort_algorithm));
    const url = new URL(window.location.href);
    url.searchParams.set('sort', encoded);
    updateLink(url);
  });

  let single_product;

  function fetchSingleProduct(product_id) {
    $.ajax({
      type: 'GET',
      url: `https://dummyjson.com/products/${product_id}`,
      success: function (response) {
        single_product = response;
        $('.productHolder')
          .addClass('animate__fadeIn')
          .one('animationend', function () {
            $('.productPhoto')
              .find('img')
              .attr('src', single_product.thumbnail);
            $('.productTitle').find('span').text(single_product.title);
            $('.productBrand')
              .find('span')
              .text(single_product.brand || 'None');
            $('.productCategory').find('span').text(single_product.category);
            $('.rating').find('span').text(single_product.rating);
            $('.productDescription')
              .find('span')
              .text(single_product.description);
            $('.productPrice')
              .find('span')
              .text(
                single_product.price.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) + '/='
              );
            $('.productStock').find('span').text(single_product.stock);
            let percentage = single_product.rating * 13;
            $('.ratingStar').css('width', percentage + '%');
          });
      },
    });
  }
  $('main').on('click', 'tbody tr', function () {
    let product_id = parseFloat($(this).data('product-id'));
    fetchSingleProduct(product_id);
  });

  $('main').on('click', '.nav_button', function () {
    let index = parseInt(localStorage.getItem('skip_amount') || 0);
    let nav = $(this).data('nav');
    if (nav === 'next' && index < 180) {
      index += 30;
    } else if (nav === 'prev' && index >= 30) {
      index -= 30;
    } else {
      localStorage.setItem('skip_amount', index);
      return;
    }
    let category = params.get('category');
    if (category) {
      fetchProducts(index, category);
    } else {
      fetchProducts(index);
    }
    localStorage.setItem('skip_amount', index);
    $('.categoryOption').removeClass('categorized');
  });

  $('main').on('click', '.categoryOption', function () {
    const url = new URL(window.location.href);
    if ($(this).hasClass('categorized')) {
      let index = parseInt(localStorage.getItem('skip_amount') || 0);
      url.searchParams.delete('category');
      fetchProducts(index, null, true);
      $('.categoryFilter').removeClass('activated');
      $('.categoryOption').removeClass('categorized');
    } else {
      $('.categoryOption').removeClass('categorized');

      let category = $(this).data('category');
      fetchProducts(0, category);
      url.searchParams.set('category', category);
      removeElement($('.sortInvisible'), '.sortOrder');

      displayElement($('.categoryOptions'), '.categoryOption');
    }
    updateLink(url);
  });

  function removeElement($el, children) {
    if ($el.hasClass('animate__fadeInDown')) {
      $el.removeClass('animate__fadeInDown').addClass('animate__fadeOutUp');
      $el.find(children).attr('tabindex', '-1');
    }
  }

  $('main').on('click', '#stockChangingButton', function () {
    $('.productStockName').find('span').text(single_product.title);
    $('.productStockAmount').find('span').text(single_product.stock);
    $('.productStockChangerHolder')
      .removeClass('animate__fadeOut')
      .addClass('animate__fadeIn');
  });

  $('main').on('click', '#stockCancel', function () {
    $('.productStockChangerHolder')
      .removeClass('animate__fadeIn')
      .addClass('animate__fadeOut');
  });

  $('main').on('input', '#stockAmount', function () {
    this.value = this.value.replace(/\D/g, '');
  });
  $('main').on('click', '#stockUpdate', function () {
    let value = parseInt($('#stockAmount').val());
    if (value !== single_product.stock && value >= 0) {
      $.ajax({
        type: 'PUT',
        url: `https://dummyjson.com/products/${single_product.id}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          stock: value,
        }),
        success: function (response) {
          $('.productStockAmount').find('span').text(response.stock);
          let changed_stocks =
            JSON.parse(localStorage.getItem('changed_stocks')) || new Array();
          let stocks = changed_stocks.find((stock) => stock.id === 'Orange');
          if (stocks) {
            stocks.stock = response.stock;
          } else {
            changed_stocks.push({
              id: response.id,
              stock: response.stock,
            });
          }
          localStorage.setItem(
            'changed_stocks',
            JSON.stringify(changed_stocks)
          );
          showSuccessMessage(
            'Stock Changed',
            `Changed ${response.title}'s stock to ${response.stock}`
          );
          let index = parseInt(localStorage.getItem('skip_amount') || 0);
          $('.productStock').find('span').text(response.stock);

          fetchProducts(index);
        },
      });
    }
  });
  $('main').on('click', '.close_button', function () {
    const url = new URL(window.location.href);
    url.searchParams.delete('item');

    updateLink(url);
    $('.productHolder')
      .removeClass('animate__fadeIn')
      .removeClass('animate__fadeOut');
  });

  $('main').on('click', '.share_button', function () {
    const url = new URL(window.location.href);

    url.searchParams.set('item', single_product.id);
    updateLink(url);
  });

  $('main').on('click', function (e) {
    if (!$(e.target).closest('.filterBoxHolder').length) {
      removeElement($('.sortInvisible'), '.sortOrder');
      removeElement($('.categoryOptions'), '.categoryOption');
    }
  });
  $('main').on('keydown', '.enter_clickable', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      $(this).click();
    }
  });
});
