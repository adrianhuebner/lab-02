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
  hornCopy.find('img').attr('alt',this.keyword);
  hornCopy.find('h2').text(this.title);
  hornCopy.find('p').text(this.description);
  hornCopy.removeClass('copy');
  hornCopy.attr('class','photo-template');
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
}

let page1 = [];
let page2 = [];

Horn.readJson = () => {
  $.get('data/page-1.json')
    .then(data =>{
      data.forEach(item =>{
        Horn.allHorns.push(new Horn(item));
        page1.push(new Horn(item));
      });
    }).then(
      $.get('data/page-2.json')
        .then(data =>{
          data.forEach(item =>{
            Horn.allHorns.push(new Horn(item));
            page2.push(new Horn(item));
          });
        })
        .then(Horn.loadHorns));
};

Horn.loadHorns = () => {
  page1.forEach(horn => {
    let hornHtml = template(horn);
    $('#page-1').append(hornHtml);
  });
  dropDown();
  $('#drop-down').on('change', function() {
    $('div').hide();
    const keyword = $('#drop-down option:selected').text();
    $(`img[alt=${keyword}]`).parent().show();
  });
  $('#drop-down-sort').on('change', function() {
    console.log('Hentai');
    // If first value... sort


    // If second value... sort


    // Else ?
    // const sortNumbersByLength = (arr) => {
    //   // Solution code here...
    //   arr.sort((a, b) => {
    //     return a.toString().length - b.toString().length;
    //   });
    //   return arr;
    // };

  });
};


$('#reset').click(function() {
  $('#drop-down').prop('selectedIndex', 0);
  $('#page-1').empty( );
  $('#page-2').empty( );

  page1.forEach(horn => {
    const hornHtml = template(horn);
    $('#page-1').append(hornHtml);
  });
});

$('#page1').click(function() {
  $('#drop-down').prop('selectedIndex', 0);
  $('#page-1').empty( );
  $('#page-2').empty( );

  page1.forEach(horn => {
    const hornHtml = template(horn);
    $('#page-1').append(hornHtml);
  });
});

$('#page2').click(function() {
  $('#drop-down').prop('selectedIndex', 0);
  $('#page-1').empty( );
  $('#page-2').empty( );

  page2.forEach(horn => {
    const hornHtml = template(horn);
    $('#page-2').append(hornHtml);
  });
});



//////////handlebars////////////
var source   = document.getElementById('handlebars-page-1').innerHTML;
var template = Handlebars.compile(source);

/////////////Jon's fun time happy code///////////////
let arrRGB = [];

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const generateRandomRGB = () => {
  for (let i = 0; i < 9; i++) {
    let r = randomNumber(0, 255);
    let g = randomNumber(0, 255);
    let b = randomNumber(255, 255);
    let rgbBG = `rgba(${r}, ${g}, ${b}, 1)`;
    arrRGB.push(rgbBG);
  }
};

generateRandomRGB();

function setButtonColors() {
  var box = $('button');
  for (let i = 0; i < box.length; i++) {
    let divEl = document.getElementById(box[i].id);
    for (let j = 0; j < arrRGB.length; j++) {
      $(divEl).css('background-color', arrRGB[i]);
    }
  }
}

setButtonColors();

$(() => {
  Horn.readJson();
  // Horn.readJson2();
});
