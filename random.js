$(function(){
    // Populate select inputs
    populateSelect('#mediums', lists.mediums);
    populateSelect('#verbs', lists.verbs);
    populateSelect('#subjects', lists.subjects);

    populateKeyOptions('harrypotter');

    // Open list chooser
    $('.js-chooseLists').click(function(e){
        if(!($('.js-wrapper--listChooser').hasClass('open'))){
            $('.js-wrapper--listChooser').addClass('open');
            $(this).text('Hide lists');
        } else {
            $('.js-wrapper--listChooser').removeClass('open');
            $(this).text('Choose lists');
        }

        e.preventDefault();
    });
});

function shuffle(o, seedKey) {
    Math.seedrandom(seedKey);
    console.log(seedKey);
    console.log(Math.random());
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function randomise(list, rowID, seedKey) {
    var row = document.getElementById(rowID);

    var listRandomisedOrder = shuffle(list, seedKey);

    for (var j = 0, col; col = row.cells[j]; j++) {
      col.innerHTML = listRandomisedOrder[j];
    }
};

function randomiseWords() {
    var list = lists['codenames'].slice();
    var today = new Date().toLocaleDateString();
    var seedKey = document.getElementById('selectTeamKey').value;
    var fullSeedKey = seedKey + ' ' + today;
    console.log(fullSeedKey);
    Math.seedrandom(fullSeedKey);
    var randomValue = Math.random();
    console.log(randomValue);

    var check = document.getElementById('keyCheck');
    check.innerHTML = Math.trunc(randomValue * 10000);
    randomise(list, 'randomWords', fullSeedKey);
}

function randomiseNumbers() {
    var list = [1,2,3,4];
    randomise(list, 'randomNumbers', null);
}

function toggleRow(rowID, buttonID, showText, hideText) {
    var button = document.getElementById(buttonID);
    console.log(button.value);
    if (button.value == showText) {
        button.value = hideText;
        console.log("Showing");
        $(rowID).css('visibility', 'visible');
    } else {
        button.value = showText;
        console.log("Hiding");
        $(rowID).css('visibility', 'hidden');
    }
}

function toggleWords() {
    toggleRow('#randomWords', 'toggleWordsButton', 'Show words', 'Hide words');
}

function toggleNumbers() {
    toggleRow('#randomNumbers', 'toggleNumbersButton', 'Show code', 'Hide code');
}


function populateKeyOptions(listName) {
    var keyOptionsEl = document.getElementById("teamKeyList");
    var options = lists[listName];
    console.log(options);

    // Clear existing options
    while (keyOptionsEl.firstChild) {
        keyOptionsEl.firstChild.remove()
    }

    // Add all options from the list
    for(var i = 0; i < options.length; i++) {
        var opt = options[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        keyOptionsEl.appendChild(el);
    }
}

/* Helper functions
-------------------------------- */
function getRandomArrayItem(theArray){
    return theArray[Math.floor(Math.random() * theArray.length)];
}

function populateSelect(elementId, listOfLists){
    $.each(listOfLists, function(i, val){
        $(elementId).append('<option value="' + i + '">' + val.name + '</option>');
    });
}
