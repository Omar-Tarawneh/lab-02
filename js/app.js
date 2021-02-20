'use strict';

//=========
// Global variables
//=========
var keywords = [];
var animalObj = [];



// ========
// constructor
// ========

function Animal(an) {
    this.img = an.image_url;
    this.title = an.title;
    this.description = an.description;
    this.keyword = an.keyword;
    this.horns = an.horns;
    keywords.push(this.keyword);
    animalObj.push(this)

}

// =======
// prototypes
// =======

Animal.prototype.render = function () {
    let template = $('#photo-template').html()
    $('main').append(Mustache.render(template, this));
}


// ========
// Data ajax
// ========

function populateAnimalData(path) {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };

    $.ajax(`./data/${path}`, ajaxSettings)
        .then(data => {
            data.forEach(element => {
                let animal = new Animal(element);
                animal.render();
            });
            list();
            filterImg();
        });

}

// =========
// functions
// =========

// remove all childs except the first child in the parent element
const removeChilds = (parent) => {
    $(parent).children().not(':first-child').remove();
}

// get the unique keywords and render them in the drop-list 'select'
function list() {
    var uniqueWords = [];
    $.each(keywords, function (i, el) {
        if ($.inArray(el, uniqueWords) === -1) uniqueWords.push(el);
    });
    for (let index = 0; index < uniqueWords.length; index++) {
        $('#drop-list').append(`<option value="${uniqueWords[index]}">${uniqueWords[index]}</option>`)

    }
}

// filter the images and render them accroding the the key selected
function filterImg() {
    $('#drop-list').on('change', function () {
        removeChilds('#main');

        for (let index = 0; index < animalObj.length; index++) {
            if (this.value == animalObj[index].keyword) {
                animalObj[index].render();
            } else if (this.value == 'all') {
                animalObj[index].render();
            }
        }
    });
}


// event handler to navigate between page1 and page2
function renderPage() {
    removeChilds('#main');
    removeChilds('#drop-list');

    $('document').ready(populateAnimalData(this.value));

    if (this.value == 'page-1.json') {
        $('#page').html('Page-2');
        this.value = 'page-2.json';
    } else {
        $('#page').html('Page-1');
        this.value = 'page-1.json';
    }

    animalObj = [];
    keywords = [];
}

// sorting the objects alphabetically and render them
function sortTitle() {
    animalObj.sort((a, b) => {
        if (a.title < b.title) {
            return -1;
        }
        if (a.title > b.title) {
            return 1;
        }
        return 0;

    });

    removeChilds('#main');
    for (let index = 0; index < animalObj.length; index++) {
        animalObj[index].render();
    }
}

// sorting the horns numbers from smallest to largest and render them
function sortHorns() {
    animalObj.sort((a, b) => {
        if (a.horns > b.horns) {
            return -1;
        }
        if (a.horns < b.horns) {
            return 1;
        }
        return 0;


    });

    removeChilds('#main');
    for (let index = 0; index < animalObj.length; index++) {
        animalObj[index].render();
    }
}







//========
// events
//========
$('#page').on('click', renderPage);
$('#title').on('click', sortTitle);
$('#horns').on('click', sortHorns);




//========
// calling funcitons
//========
$('document').ready(populateAnimalData('page-1.json'));
