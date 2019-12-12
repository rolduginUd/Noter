let local_data = [];
let rootNode = document.getElementById('root'); //////////////////
let mainInput = document.querySelector('.addAction');//////////////////
let addButton = document.querySelector('.button');///////////////////////////
let addIcon = document.querySelector('.addIcon');///////////////////////////////////    Записуємо в змінні посилання на DOM елементи
let errorNotification = document.querySelector('.error');///////////////////////////
let containerLength = 11;//////////////////////////////////////////////////////
let themeInput = document.getElementById('theme');///////////////////////////
let hr = document.querySelector('.hr');////////////////////////////////////

window.onload =  () => { // password check
    loadStorage();
    updateDOM();
    // if(!localStorage.name) {
    //    localStorage.name = prompt('Введіть ваше і`мя');
    //    localStorage.password = prompt('Створіть пароль');
    //    passwordChecking ();
    // } else {
    //    passwordChecking ();
    // }
}

function loadStorage() {
    let data = localStorage.getItem('data');
    if (data) {
        local_data = JSON.parse(data);
    }
}

inputCheck();

function updateDOM() {
    if (local_data.length) {
        local_data.forEach(obj => {
            newNoteCreator();
        });
    }
}
mainInput.addEventListener('input', inputCheck);

function inputCheck () { // зміна кольору кнопки в залежності від того, чи вибрана тема та наявність запису
    if(!mainInput.value){
        addIcon.style.color = '#c8d0d8';
    }else{
        addIcon.style.color = '#41b5fe';
    }
};

function passwordChecking () { // перевірка пароля
    let passwordCheck = prompt('Введіть пароль');
    if(passwordCheck == localStorage.password) {
        alert('Привіт ' + localStorage.name);
    } else {
        alert('Ви ввели неправильний пароль!');
        window.location.reload();
    }
}

addButton.addEventListener('click', addData);

function addData(event) {
    if(!mainInput.value) {
        event.preventDefault();                                 // вимикаємо кнопку, якщо відсутні тема та запис
    } else {
        let obj = {};
        obj.value = mainInput.value;
        obj.themeInput = themeInput.value;

        newNoteCreator()
    }
}

function newNoteCreator() {
           let obj = {};
           let itemContainer = document.createElement('div'); // створення контейнера для нового запису
           itemContainer.setAttribute('draggable', 'true');

           let newItem = document.createElement('input');
           newItem.setAttribute('type', 'text');
           newItem.value = mainInput.value;
           obj.value = mainInput.value;
           newItem.id = 'itemId';
           newItem.style.display = 'none';

           let theme = document.createElement('div'); // додавання теми для створеного поля
           theme.textContent = themeInput.value;
           obj.theme = themeInput.value;

           let dateContainer = document.createElement('div'); // контейнер для дати
           dateContainer.className = 'dateContainer';                                                                                                                                                          
           let currentDate = document.createElement('p'); 
           let currentTime = document.createElement('p');
           currentDate.className = 'currentDate';
           let d = new Date();
           let day = d.getDate();
           let month = d.getMonth() + 1;
           let year = d.getFullYear();
           currentDate.textContent = day + '.' + month + '.' + year;
           obj.time = d.toLocaleTimeString();
           obj.date = day + '.' + month + '.' + year;
           currentTime.textContent =  d.toLocaleTimeString();



           local_data.push(obj);
           localStorage.setItem('data', JSON.stringify(local_data));




           let checkBox = document.createElement('i');
           checkBox.className = 'material-icons added_ico_checkbox';
           checkBox.textContent = 'check_box_outline_blank';
           checkBox.addEventListener('click', unclick)

           checkBox.addEventListener('click', () => {
               checkBox.textContent = 'check_box';
           });


           let labelForItem = document.createElement('label');
           labelForItem.textContent = newItem.value;
           labelForItem.className = 'itemsLabel';
           labelForItem.setAttribute('for', newItem.id);

           let editIcon = document.createElement('i');
           editIcon.className = 'material-icons';
           editIcon.textContent = 'create';
           editIcon.addEventListener('click', () => {
               itemContainer.removeAttribute('draggable');
           
               checkBox.style.display = 'none';
               newItem.style.display = 'inline-block';
               labelForItem.style.display = 'none';
               editIcon.style.display = 'none';
               removeIcon.style.display = 'none';
               saveChangesIcon.style.display = 'inline-block';
           });

           let removeIcon = document.createElement('i');
           removeIcon.className = 'material-icons removeIcn';
           removeIcon.textContent = 'delete';
           removeIcon.addEventListener('click', removeItem)

           let saveChangesIcon = document.createElement('i');
           saveChangesIcon.className = 'material-icons';
           saveChangesIcon.textContent = 'save';
           saveChangesIcon.style.display = 'none';

           saveChangesIcon.addEventListener('click', () => {         
               labelForItem.textContent = newItem.value;
           
               checkBox.style.display = 'inline-block';
               newItem.style.display = 'none';
               labelForItem.style.display = 'inline-block';
               editIcon.style.display = 'inline-block';
               removeIcon.style.display = 'inline-block';
               saveChangesIcon.style.display = 'none';
           
               itemContainer.setAttribute('draggable', 'true');                
           });

           itemContainer.appendChild(dateContainer);
           dateContainer.appendChild(theme);
           dateContainer.appendChild(currentDate);
           dateContainer.appendChild(currentTime);
           itemContainer.appendChild(newItem);              // додаємо елементи в розмітку
           itemContainer.appendChild(labelForItem);
           itemContainer.appendChild(editIcon);
           itemContainer.appendChild(saveChangesIcon);
           itemContainer.appendChild(removeIcon);
           rootNode.appendChild(itemContainer);

           mainInput.value = '';
           themeInput.value = '';
           addIcon.style.color = '#c8d0d8';
    }
function unclick () {
    this.disabled = true;
}

function removeItem () {
    let parrent = this.parentNode;
    rootNode.removeChild(parrent);
    addIcon.disabled = false;
    mainInput.disabled = false;
    errorNotification.style.display = 'none';
    addIcon.style.color = '#41b5fe';
    mainInput.value = '';
    addIcon.style.color = '#c8d0d8';
}


let dragging = null;

rootNode.addEventListener('dragstart', function(event) {
		dragging = event.target;
    event.dataTransfer.setData('text/html', dragging);
});

rootNode.addEventListener('dragover', function(event) {
    event.preventDefault();
});

rootNode.addEventListener('dragenter', function(event) {
    if(event.target.tagName === 'DIV'){
        event.target.style['border-bottom'] = 'solid 3px #41b5fe';
    }
});

rootNode.addEventListener('dragleave', function(event) {
    if(event.target.tagName === 'DIV'){
        event.target.style['border-bottom'] = '';
    }
});

rootNode.addEventListener('drop', function(event) {
    event.preventDefault();
    if(event.target.tagName === 'DIV'){
        event.target.style['border-bottom'] = '';
        event.target.parentNode.insertBefore(dragging, event.target.nextSibling);
    }
});

$('.select').each(function() {
    let _this = $(this),
        selectOption = _this.find('option'),
        selectOptionLength = selectOption.length,
        selectedOption = selectOption.filter(':selected'),
        duration = 600; // длительность анимации 

    _this.hide();
    _this.wrap('<div class="select"></div>');
    $('<div>', {
        class: 'new-select',
        text: _this.children('option:disabled').text()
    }).insertAfter(_this);

    const selectHead = _this.next('.new-select');
    $('<div>', {
        class: 'new-select__list'
    }).insertAfter(selectHead);

    const selectList = selectHead.next('.new-select__list');
    for (let i = 1; i < selectOptionLength; i++) {
        $('<div>', {
            class: 'new-select__item',
            html: $('<span>', {
                text: selectOption.eq(i).text()
            })
        })
        .attr('data-value', selectOption.eq(i).val())
        .appendTo(selectList);
    }

    const selectItem = selectList.find('.new-select__item');
    selectList.slideUp(0);
    selectHead.on('click', function() {
        document.getElementById('hr').style.marginTop = '140px';
        if ( !$(this).hasClass('on') ) {
            $(this).addClass('on');
            selectList.slideDown(duration);

            selectItem.on('click', function() {
                document.getElementById('hr').style.marginTop = '10px';
                let chooseItem = $(this).data('value');

                $('select').val(chooseItem).attr('selected', 'selected');
                selectHead.text( $(this).find('span').text() );

                duration = 200;
                selectList.slideUp(duration);
                selectHead.removeClass('on');
            });

        } else {
            document.getElementById('hr').style.marginTop = '10px';
            $(this).removeClass('on');
            duration = 200;
            selectList.slideUp(duration);
        }
    });
});