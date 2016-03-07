
$(document).ready(function() {

    var sentMemories = [{'person':'Dad', 'created':'3/5/2016', 'image':'img/cameraroll/1.jpg', 'message':'test memory', 'icon':'photo', 'condition':'50th birthday'}
                        ];

    var unlockedMemories = [
        {'person':'Grandpa', 'icon':'photo', 'created':'2/5/1975', 'unlocked':'2/25/2016', 'image':'img/unlockedImages/1.jpg', 'condition': 'it\'s your 16th birthday'},
        {'person':'Dad', 'icon':'photo', 'created':'2/5/1985', 'unlocked':'2/4/2016', 'image':'img/unlockedImages/2.jpg', 'condition': 'you travel to New York'},
        {'person':'Robin', 'icon':'mail', 'created':'1/6/2015', 'unlocked':'3/4/2016', 'image':'img/unlockedImages/3.jpg', 'condition':'you take your MCAT'},
        {'person':'Mom', 'icon':'mail','created':'6/6/1994', 'unlocked':'3/25/2016', 'image':'img/unlockedImages/4.jpg', 'condition':'you travel to Hawaii', 'message':'Happy 23rd birthday! Isnt it crazy that I am writing you before you are even born?! This is a photo of your dad and I when we got engaged yesterday. Thought you might like to see us when we were 23 as well.'}
    ];

    var resetPages = function() {
        $('#sent').hide();
        $('#memory-page').hide();
        $('#inbox').hide();
        $('#create').hide();
        $('.create-nav').hide();
        $('#inbox-btn').removeClass('selected-btn');
        $('#sent-btn').removeClass('selected-btn');
    };

    var loadMemoryPage = function(memory, title, hasUnlocked) {
        $('#sent').hide();
        $('#inbox').hide();
        $('#main-banner').hide();
        $('#alt-banner').show();
        $('#banner-next').hide();
        $('#memory-page').show();
        $('#banner-text').text('Memory');
        $('#memory-title').text(title);
        $('#creation-date').text('Created on ' + memory['created']);

        var unlockMessage = (hasUnlocked ? 'Unlocked when ' : 'Unlock when ') + memory['condition'];
        $('#unlock-condition').text(unlockMessage);
        $('#media-content').css('background-image', 'url(' + memory['image'] + ')')
        $('#memory-message').text(memory['message']);
    };


    var loadTable = function(tableId, memoryArr) {
        $('#' + tableId +' > tbody').empty();
        var tableContent = '';
        for (var i = 0; i < memoryArr.length; i++) {
            var memory = memoryArr[i];
            var memoryHtml = '<div class="memory"><div style="float: left; position: relative; top: 2px;"><img class="lock-icon2" src="img/sketch/'+ memory['icon'] + '-icon.png"/></div><div class="title">' + memory['person'] + '</div><div class="mem-info" style="font-size: 11px">Created ' + memory['created'] + '<br/>' + (memory['unlocked'] != null ? 'Unlocked ' + memory['unlocked'] : '<br/>') +'</div></div>';
            var tdHmtl = '<td class="memory-cell" id="' + tableId + i + '"style="background-image:url(' + memory['image'] + ');">' + memoryHtml + '</td>';
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


    var loadInbox = function() {
        $('#inbox').show();
        $('#inbox-btn').addClass('selected-btn');
        $('#alt-banner').hide();
        $('#main-banner').show();
        loadTable('unlocked-table', unlockedMemories);
    };

    var loadSpecificConditionPage = function(pageToLoad) {
        $('#location-condition-choice-page').hide();
        $('#life-event-condition-choice-page').hide();
        $('#time-condition-choice-page').hide();
        $('#main-condition-choice-page').hide();
        $('#' + pageToLoad + '-condition-choice-page').show();
    };

    var loadSent = function() {
        $('#sent-btn').addClass('selected-btn');
        $('#sent').show();
        $('#alt-banner').hide();
        $('#main-banner').show();
        loadTable('sent-table', sentMemories);
    };

    var loadCreate = function() {
        $('#alt-banner').hide();
        $('#main-banner').show();
        $('#create').show();
    }

    $('#landing').fadeOut(2000);
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

    //alt-banner options
    $('#banner-close').click(function() {
        $('#banner-next').show();
        $('.bottom-nav').show();
        if ($('#inbox-btn').hasClass('selected-btn')) {
            resetPages();
            loadInbox();
        } else {
            resetPages();
            loadSent();
        }
    });


    //create option buttons
    var createNavArr = ['media', 'share', 'condition', 'send'];

    var resetCreateNav = function() {
        for (var i = 0; i < $('.create-nav').length; i++) {
            var obj = $($('.create-nav')[i])
            obj.css('background-image', 'url(img/sketch/' + obj.attr('id') + '-unselected.png')
        }
    }

    var selectCreateNavItem = function(itemId) {
        resetCreateNav();
        $('#' + itemId).css('background-image', 'url(img/sketch/' + itemId + '-selected.png');
    }

    var showCreateNavPage = function(step) {
        for (var i = 0; i < createNavArr.length; i++) {
            var nav = createNavArr[i];
            $('#' + nav + '-page').hide();
        }
        $('#' + step + '-page').show();
        var bannerText = '';
        if (step == 'media') bannerText = 'Upload';
        if (step == 'share') bannerText = 'Share with';
        if (step == 'send') bannerText = 'Finish Sharing';
        if (step == 'condition') {
            bannerText = 'Set Condition';
            loadSpecificConditionPage('main')
        }

        $('#banner-text').text(bannerText);
    }

    $('.create-options').click(function() {
        resetPages();
        $('#main-banner').hide();
        $('.create-nav').show();
        $('.bottom-nav').hide();
        $('#alt-banner').show();
        $('#banner-text').text('Upload');
        $('#media-page').show();
    });


// Loading media
    $('#photo-btn').click(function() {
        $('#camera-input').trigger('click');
        $('#preview-icon').attr('src', 'img/sketch/photo-icon.png');

    });

    $('#video-btn').click(function() {
        $('#video-input').trigger('click');
        $('#preview-icon').attr('src', 'img/sketch/video-icon.png');
    });

    $('#sound-btn').click(function() {
        $('#sound-input').trigger('click');
        $('#preview-icon').attr('src', 'img/sketch/sound-icon.png');
    });

// Rendering media

    var loadMedia = function(url, mediaId) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#' + mediaId).attr('src', e.target.result);
        }

        reader.readAsDataURL(url);
    };

    $('#camera-input').change(function() {
        loadMedia(this.files[0], 'create-photo');
        $('#create-photo').show();
    });

    $('#video-input').change(function() {
        loadMedia(this.files[0], 'create-video');
        $('#create-video').show();
    });


    $('.create-nav').click(function() {
        var step = $(this).attr('id');
        selectCreateNavItem(step);
        showCreateNavPage(step);
    });

    $('#banner-next').click(function() {
        for (var i = 0; i < createNavArr.length; i++) {
            var imageUrl = $('#' + createNavArr[i]).css('background-image');
            //Find the selected item
            if (imageUrl.indexOf('-selected') != -1) {
                var changeIndex = i + 1;
                if (changeIndex == createNavArr.length) {
                    //Finish sharing!
                } else {
                    //Pick the next item
                    selectCreateNavItem(createNavArr[changeIndex]);
                    showCreateNavPage(createNavArr[changeIndex]);
                    return;
                }
            }
        }
    });

    //Sharing

    $('.share-cb').click(function() {
        if ($(this).hasClass('unchecked')) {
            $(this).removeClass('unchecked');
            $(this).addClass('checked');
        } else {
            $(this).removeClass('checked');
            $(this).addClass('unchecked');
        }
    });

    $('.checked').click(function() {

    });

    //bottom nav bar buttons
    $('#inbox-btn').click(function() {
        resetPages();
        loadInbox();
    });

    //bottom nav bar buttons
    $('#location-condition-butt').click(function() {
        loadSpecificConditionPage('location')
    });

    $('#time-condition-butt').click(function() {
        loadSpecificConditionPage('time')
    });

    $('#life-event-condition-butt').click(function() {
        loadSpecificConditionPage('life-event')
    });


    $('#create-btn').click(function() {
        resetPages();
        $(this).hide();
        $('#main-banner').show();
        loadCreate();
    });


    $('#unlocked-table').on('click', 'td', function() {
        var id = $(this).attr('id');
        if (id != null) {
            var index = parseInt(id[id.length - 1]);
            $('#unlockedMemories').hide();
            loadMemoryPage(unlockedMemories[index], 'Memory from ' + unlockedMemories[index]['person'], true);
        }
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
        loadSent();
    });
});