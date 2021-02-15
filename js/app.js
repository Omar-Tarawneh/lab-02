'use strict';

//=========
// Global variables
//=========
var keywords = [];
var animalObj=[];



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
    let template = $('#photo-template').clone();
    template.find('h2').text(this.title);
    template.find('img').attr('src', this.img);
    template.find('p').text(this.description);
    template.removeAttr('id');
    $('main').append(template);
}
// Animal.prototype.list = function () {

// }

function list() {
    var uniqueWords = [];
    $.each(keywords, function (i, el) {
        if ($.inArray(el, uniqueWords) === -1) uniqueWords.push(el);
    });
    for (let index = 0; index < uniqueWords.length; index++) {
        $('#drop-list').append(`<option value="${uniqueWords[index]}">${uniqueWords[index]}</option>`)

    }


}
function filterImg(){
    $('#drop-list').on('change',function(){
        console.log(this.value);
        $('#main').children().not(':first-child').remove();
        for (let index = 0; index < animalObj.length; index++) {
            
            if(this.value == animalObj[index].keyword)
            {
                
                animalObj[index].render();
                console.log(animalObj[index]);
            }
            
        }
        
    });

}



// ========
// Data ajax
// ========

function populateAnimalData() {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };

    $.ajax('../data/page-1.json', ajaxSettings)
        .then(data => {
            data.forEach(element => {
                let animal = new Animal(element);
                // console.log(animal);
                animal.render();
            });
            list();
            filterImg();
        });

}



//========
// calling funcitons
//========
$('document').ready(populateAnimalData);
