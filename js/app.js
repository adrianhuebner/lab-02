'use strict';

function Horn(horn){
  this.image_url = horn.image_url;
  this.title = horn.title;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;
}

Horn.allHorns = [];

Horn.prototype.render = function(){
  $('main').append('<div class = "copy"></div>');
  let hornCopy = $('div[class = "copy"]');
  let hornHtml = $('#photo-template').html();

  hornCopy.html(hornHtml);

  hornCopy.find('img').attr('src',this.image_url);
  hornCopy.find('h2').text(this.title);
  hornCopy.find('p').text(this.description);
  hornCopy.removeClass('copy');
  hornCopy.attr('class',this.title);
};

Horn.prototype.dropdown = function() {
  let optionHtml = $('#drop-down');
  optionHtml.append($('<option></option>').attr('value', this.keyword).text(this.keyword));
};


Horn.readJson = () => {
  $.get('data/page-1.json')
    .then(data =>{
      data.forEach(item =>{
        Horn.allHorns.push(new Horn(item));
      });
    })
    .then(Horn.loadHorns);
};

Horn.loadHorns = () => {
  Horn.allHorns.forEach(horn => horn.render());
  Horn.allHorns.forEach(horn => horn.dropdown());
};


$(() => Horn.readJson());
