var loadMemoryPage = function(memory, title, hasUnlocked) {
    $('#memory-page').show();
    $('#memory-title').text(title);
    $('#creation-date').text('Created on ' + memory['created']);

    var unlockMessage = (hasUnlocked ? 'Unlocked on ' : 'Unlock on ') + memory['condition'];
    $('#unlock-condition').text(unlockMessage);
    $('#media-content').css('background-image', 'url(' + memory['image'] + ')')
    $('#memory-message').text(memory['message']);
};

$(document).ready(function() {

    var sentMemories = [{'person':'Dad', 'created':'3/5/2016', 'image':'img/cameraroll/1.jpg', 'message':'test memory', 'condition':'50th birthday'}
                        ];

    var unlockedMemories = [
        {'person':'Grandpa', 'created':'2/5/1975', 'unlocked':'2/25/2016', 'image':'img/unlockedImages/1.jpg'},
        {'person':'Dad', 'created':'2/5/1985', 'unlocked':'2/4/2016', 'image':'img/unlockedImages/2.jpg'},
        {'person':'Robin', 'created':'1/6/2015', 'unlocked':'3/4/2016', 'image':'img/unlockedImages/3.jpg'},
        {'person':'Mom', 'created':'6/6/1994', 'unlocked':'3/25/2016', 'image':'img/unlockedImages/4.jpg'}
    ];

    var resetPages = function() {
        $('#sent').hide();
        $('#memory-page').hide();
        $('#inbox').hide();
        $('#inbox-btn').removeClass('selected-btn');
        $('#sent-btn').removeClass('selected-btn');
        $('#create-btn').removeClass('selected-btn');
    };

    var loadTable = function(tableId, memoryArr) {
        $('#' + tableId +' > tbody').empty();
        var tableContent = '';
        for (var i = 0; i < memoryArr.length; i++) {
            var memory = memoryArr[i];
            var memoryHtml = '<div class="memory"><div class="title">' + memory['person'] + '</div><div class="mem-info">Created ' + memory['created'] + '<br/>' + (memory['unlocked'] != null ? 'Unlocked ' + memory['unlocked'] : '') +'</div></div>';
            var tdHmtl = '<td id="' + tableId + i + '"style="background-image:url(' + memory['image'] + ');">' + memoryHtml + '</td>';
            if (i % 2 == 0) {
                tdHmtl = '<tr>' + tdHmtl;
            } else {
                tdHmtl = tdHmtl + '</tr>';
            }
            tableContent += tdHmtl;
        }
        if (memoryArr.length % 2 != 0) tableContent += '<td></td></tr>'
        $('#' + tableId + '> tbody:last-child').append(tableContent);
    };

    $('#landing').fadeOut(1000);
    loadTable('unlocked-table', unlockedMemories);


    //locked-unlocked tabs
    $('#unlocked-tab').click(function() {
        $(this).css('background-image', 'url("img/sketch/unlocked-selected.jpg")');
        $('#locked-tab').css('background-image', 'url("img/sketch/locked-unselected.jpg")');
        $('#locked-memories').hide();
        $('#unlocked-memories').show();
    });

    $('#locked-tab').click(function() {
        $(this).css('background-image', 'url("img/sketch/locked-selected.jpg")');
        $('#unlocked-tab').css('background-image', 'url("img/sketch/unlocked-unselected.jpg")');
        $('#locked-memories').show();
        $('#unlocked-memories').hide();
    });

    //bottom nav bar buttons
    $('#inbox-btn').click(function() {
        resetPages();
        $('#inbox').show();
        $('#inbox-btn').addClass('selected-btn');
        loadTable('unlocked-table', unlockedMemories);
    });

    $('#create-btn').click(function() {
    });



    $('#sent-table').on('click', 'td', function() {
        var id = $(this).attr('id');
        if (id != null) {
            var index = parseInt(id[id.length - 1]);
            $('#sent').hide();
            loadMemoryPage(sentMemories[index], 'Memory for ' + sentMemories[index]['person'], false);
        }
    });

    $('#sent-btn').click(function() {
        resetPages();
        $('#sent-btn').addClass('selected-btn');
        $('#sent').show();
        loadTable('sent-table', sentMemories);
    });
});