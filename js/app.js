'use strict';

function Horn(horn){
  this.image_url = horn.image_url;
  this.title = horn.title;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;

  Horn.allHorns.push(this);
}

Horn.allHorns = [];

Horn.prototype.render = function(){
  $('main').append('<div class = "copy"></div>');
  let hornCopy = $('div[class = "copy"]');
  let hornHtml = $('.photo-template').html();

  hornCopy.html(hornHtml);

  hornCopy.find('img').attr('src',this.image_url);
  hornCopy.find('h2').text(this.title);
  hornCopy.find('p').text(this.description);
  hornCopy.removeClass('copy');
  hornCopy.attr('class', 'photo-template');
  hornCopy.find('img').attr('alt',this.keyword);
};

function dropDown() {
  let uniqueElements = [];

  let optionHtml = $('#drop-down');

  Horn.allHorns.forEach(image => {
    let bananas = true;
    uniqueElements.forEach(uniqueImage => {
      if(image.keyword === uniqueImage){
        bananas = false;
      }
    });
    if(bananas){
      optionHtml.append($('<option></option>').attr('value', image.keyword).text(image.keyword));
      uniqueElements.push(image.keyword);
    }
  });
  console.log('hello');
}


Horn.readJson = () => {
  $.get('data/page-1.json')
    .then(data =>{
      data.forEach(item =>{
        new Horn(item);
      });
    })
    .then(Horn.loadHorns);
};

Horn.loadHorns = () => {
  Horn.allHorns.forEach(horn => horn.render());
  console.log('in the load horns');
  dropDown();
  $('#drop-down').on('change', function() {
    $('div').hide();
    const keyword = $('#drop-down option:selected').text();
    $(`img[alt=${keyword}]`).parent().show();
  })
 };

$(() => Horn.readJson());
