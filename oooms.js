/*!
* OO Olympic Medal Standings
* Log Colourer.js v@VERSION
* https://github.com/aligo/oooms
*
*
* Copyright 2012, aligo, http://aligo.me/ @ JPSFM, http://www.jpsfm.com/
* under the MIT license.
*/

!function( $ ){

  'use strict';

  var medals;
  var oo_medals = {};
  var medals = ['gold', 'silver', 'bronze'];
  _.each(['HRL', 'AEU', 'UNION'], function (item) {
    oo_medals[item] = { 'power' : item, 'countries' : [] }
    _.each(medals, function (medal) {
      oo_medals[item][medal] = 0;
    });
  });

  var oo_map = {
    'People\'s Republic of China': 'HRL',
    'United States of America': 'UNION',
    'Great Britain': 'AEU',
    'Republic of Korea': 'HRL',
    'France': 'AEU',
    'Russian Federation': 'HRL',
    'Italy': 'AEU',
    'Kazakhstan': 'HRL',
    'Germany': 'AEU',
    'Hungary': 'AEU',
    'Democratic People\'s Republic  of Korea' : 'HRL',
    'Netherlands': 'AEU',
    'Cuba': 'UNION',
    'Belarus': 'HRL',
    'New Zealand': 'UNION',
    'South Africa': 'AEU',
    'Ukraine': 'HRL',
    'Japan': 'UNION',
    'Australia': 'UNION',
    'Denmark': 'AEU',
    'Romania': 'AEU',
    'Brazil': 'UNION',
    'Poland': 'AEU',
    'Islamic Republic of Iran': 'HRL',
    'Jamaica': 'UNION',
    'Croatia': 'AEU',
    'Ethiopia': 'AEU',
    'Canada': 'UNION',
    'Sweden': 'AEU',
    'Czech Republic': 'AEU',
    'Kenya': 'UNION',
    'Slovenia': 'AEU',
    'Dominican Republic': 'UNION',
    'Georgia': 'HRL',
    'Switzerland': 'AEU',
    'Lithuania': 'AEU',
    'Grenada': 'UNION',
    'Venezuela': 'UNION',
    'Mexico': 'UNION',
    'Colombia': 'UNION',
    'Spain': 'AEU',
    'Egypt': 'AEU',
    'Slovakia': 'AEU',
    'Azerbaijan': 'HRL',
    'Belgium': 'AEU',
    'India': 'HRL',
    'Armenia': 'HRL',
    'Indonesia': 'HRL',
    'Mongolia': 'HRL',
    'Norway': 'AEU',
    'Serbia': 'AEU',
    'Tunisia': 'AEU',
    'Cyprus': 'AEU',
    'Estonia': 'AEU',
    'Guatemala': 'UNION',
    'Malaysia': 'HRL',
    'Thailand': 'HRL',
    'Taipei (Chinese Taipei)': 'HRL',
    'Greece': 'AEU',
    'Republic of Moldova': 'AEU',
    'Argentina': 'UNION',
    'Hong Kong, China': 'HRL',
    'Saudi Arabia': 'HRL',
    'Kuwait': 'HRL',
    'Puerto Rico': 'UNION',
    'Qatar': 'HRL',
    'Singapore': 'HRL',
    'Trinidad and Tobago': 'UNION',
    'Turkey': 'AEU',
    'Uzbekistan': 'HRL',
    'Algeria': 'AEU',
    'Finland': 'AEU',
    'Morocco': 'AEU'
  }

  $( function () {
    
    $.getJSON('http://apify.heroku.com/api/olympics2012_medals.json?callback=?', function (data) {
      _.each(JSON.parse(data), function (item) {
        var power = oo_map[item['country']];
        if (power) {
          oo_medals[power]['countries'].push(item);
          _.each(medals, function (medal) {
            oo_medals[power][medal]    = oo_medals[power][medal]    + parseInt(item[medal]);
          });
        } else {
          alert(item['country']);
        }
      });
      var medal = 'gold';
      _.each(_.clone(medals).reverse(), function (medal) {
        oo_medals = _.values(oo_medals).sort(function (a,b) {
          return b[medal] - a[medal];
        });
      });
      var rank = 0;
      _.each(oo_medals, function (item) {
        var total = 0;
        rank = rank + 1;
        var html = '<td class="rank">' + rank + '</td><td><img src="' + item['power'].toLowerCase() + '.png" /></td>'
                 + '<td><a href="#" data-power="' + item['power'] + '">' + item['power'] + '</a></td>';
        _.each(medals, function (medal) {
          total = total + item[medal];
          html = html + '<td class="' + medal + '">' + item[medal] + '</td>';
        });
        html = html + '<td>' + total + '</td>';
        $('#ooom tbody').append('<tr class="power">' + html + '</tr>');
        _.each(item['countries'], function (country) {
          var html = '<td class="rank">' + country['rank'] + '</td><td><img src="http://www.london2012.com' + country['flag'] + '" /></td>'
                   + '<td>' + country['country'] + '</td>';
          _.each(medals, function (medal) {
            html = html + '<td class="' + medal + '">' + country[medal] + '</td>';
          });
          html = html + '<td>' + country['total'] + '</td>';
          $('#ooom tbody').append('<tr class="country" data-power="' + item['power'] + '">' + html + '</tr>');
        });
      });
      $('#ooom a').on('click.ooom', function () {
        $('#ooom tr.country[data-power=' + $(this).attr('data-power') + ']').toggle();
        return false;
      });
    });

  });

}( window.jQuery );