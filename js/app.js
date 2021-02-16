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

// =========
// functions
// =========

function list() {
    var uniqueWords = [];
    $.each(keywords, function (i, el) {
        if ($.inArray(el, uniqueWords) === -1) uniqueWords.push(el);
    });
    for (let index = 0; index < uniqueWords.length; index++) {
        $('#drop-list').append(`<option value="${uniqueWords[index]}">${uniqueWords[index]}</option>`)

    }
}


function filterImg() {
    $('#drop-list').on('change', function () {
        // console.log(this.value);
        $('#main').children().not(':first-child').remove();
        for (let index = 0; index < animalObj.length; index++) {

            if (this.value == animalObj[index].keyword) {
                animalObj[index].render();
            } else if (this.value == 'all') {
                animalObj[index].render();
            }

        }

    });

}



function renderPage() {
    let page = `./data/${this.value}`;
    function populateAnimalData() {
        const ajaxSettings = {
            method: 'get',
            dataType: 'json'
        };

        $.ajax(page, ajaxSettings)
            .then(data => {
                data.forEach(element => {
                    let animal = new Animal(element);
                    animal.render();
                });
                list();
                filterImg();
            });
    }
    $('#main').children().not(':first-child').remove();
    $('#drop-list').children().not(':first-child').remove();
    $('document').ready(populateAnimalData);
    if (this.value == 'page-1.json') {
        $('#page-1').html('Page-2');
        this.value = 'page-2.json';
    } else {
        $('#page-1').html('Page-1');
        this.value = 'page-1.json';
    }
    animalObj = [];
    keywords = [];
}

function sortTitle(){
    animalObj.sort ((a,b) => {
        if ( a.title < b.title ){
            return -1;
          }
          if ( a.title > b.title ){
            return 1;
          }
          return 0;
        
    });

    $('#main').children().not(':first-child').remove();
    for (let index = 0; index < animalObj.length; index++) {
        animalObj[index].render();  
    }
}

function sortHorns(){
    animalObj.sort ((a,b) => {
        if ( a.horns > b.horns ){
            return -1;
          }
          if ( a.horns < b.horns ){
            return 1;
          }
          return 0;
        
          
    });
    console.log(animalObj);
    $('#main').children().not(':first-child').remove();
    for (let index = 0; index < animalObj.length; index++) {
        animalObj[index].render();  
    }
}



// ========
// Data ajax
// ========

function populateAnimalData() {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };

    $.ajax('./data/page-1.json', ajaxSettings)
        .then(data => {
            data.forEach(element => {
                let animal = new Animal(element);
                animal.render();
            });
            list();
            filterImg();
        });

}




//========
// events
//========
$('#page-1').on('click', renderPage);
$('#title').on('click' , sortTitle);
$('#horns').on('click' , sortHorns);




//========
// calling funcitons
//========
$('document').ready(populateAnimalData);
