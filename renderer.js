const weather = require('weather-js'),
      location = '';    // City or Zip Code to get the weather for

function skyCodeClass(skycode) {
    let iconClass = '';

    if (['0', '1', '2', '3', '4', '17', '35', '37', '38', '47'].includes(skycode)) {
        iconClass = 'lightning cloud';
    } else if (['5', '6', '7', '10', '13', '14', '15', '16', '42', '43'].includes(skycode)) {
        iconClass = 'snow cloud';
    } else if (['8', '25'].includes(skycode)) {
        iconClass = 'snowflake'
    } else if (['9', '11', '12', '18', '40'].includes(skycode)) {
        iconClass = 'rain cloud';
    } else if (['19', '23', '24'].includes(skycode)) {
        iconClass = 'wind';
    } else if (['20', '21', '22'].includes(skycode)) {
        iconClass = 'fog cloud';
    } else if (['26', '27', '28'].includes(skycode)) {
        iconClass = 'cloud';
    } else if (['29', '30'].includes(skycode)) {
        iconClass = 'cloud sun';
    } else if (['31', '32', '33', '34', '36'].includes(skycode)) {
        iconClass = 'sun';
    } else if (['39', '45'].includes(skycode)) {
        iconClass = 'rain cloud sun';
    } else if (['41', '46'].includes(skycode)) {
        iconClass = 'snow cloud sun';
    } else if (['44'].includes(skycode)) {
        iconClass = 'thermometer';
    }

    return iconClass;
}

function showErrorMessage(msg) {
    $('#title').html(msg.title);
    $('#today').html(msg.text);
}

if (!location) {
    showErrorMessage({
        'title': 'No Location Specified',
        'text': '<p>Set a location in the <code>renderer.js</code> file.</p>'
    });
    return;
}

weather.find({ search: location, degreeType: 'F' }, function (err, result) {
    if (err) {
        showErrorMessage({
            'title': 'Weather JS API Error',
            'text': `<p>${err}</p>`
        });
        return;
    }

    const data = result[0],
          today = data.current;

    $('#title').text('Weather in ' + data.location.name);

    $('#today').html(`<div class="icon"><i class="climacon ${skyCodeClass(today.skycode)}"></i></div><div class="details"><span class="temp">${today.temperature}&deg;</span><span class="day">${today.shortday}</span></div>`);

    for (const day of data.forecast) {
        $('#forecast').append(`<li><div class="icon"><i class="climacon ${skyCodeClass(day.skycodeday)}"></i></div><div class="details"><span class="day">${day.shortday}</span><span class="temp">${day.high}&deg; / ${day.low}&deg;</span></div></li>`);
    }
});