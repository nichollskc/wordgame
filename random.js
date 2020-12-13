$(function(){
    // Populate select inputs
    populateSelect('#mediums', lists.mediums);
    populateSelect('#verbs', lists.verbs);
    populateSelect('#subjects', lists.subjects);

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

function shuffle(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function randomise(list, rowID) {
    var row = document.getElementById(rowID);

	row.animate({
		opacity: 0,
	}, 0, function() {
	});

    var listRandomisedOrder = shuffle(list);

    for (var j = 0, col; col = row.cells[j]; j++) {
      col.innerHTML = listRandomisedOrder[j];
    }  

	row.animate({
		opacity: 1,
	}, 500, function() {
	});

};

function randomiseWords() {
    var list = lists['mediums'][$('#mediums').val()]['data'];
    randomise(list, 'randomWords');
}

function randomiseNumbers() {
    var list = [1,2,3,4];
    randomise(list, 'randomNumbers');
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
