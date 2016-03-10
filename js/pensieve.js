
$(document).ready(function() {

    $(document).bind("contextmenu", function(e) {
        return false;
    });

    var sentMemories = [{'person':'Dad', 'created':'3/5/2016', 'media':'img/cameraroll/1.jpg', 'message':'test memory', 'icon':'photo', 'condition':'50th birthday'}
                        ];

    var unlockedMemories = [
        {'person':'Grandpa', 'icon':'photo', 'created':'2/5/1975', 'unlocked':'2/25/2016', 'media':'img/unlockedImages/1.jpg', 'condition': 'it\'s your 16th birthday'},
        {'person':'Dad', 'icon':'photo', 'created':'2/5/1985', 'unlocked':'2/4/2016', 'media':'img/unlockedImages/2.jpg', 'condition': 'you travel to New York'},
        {'person':'Robin', 'icon':'mail', 'created':'1/6/2015', 'unlocked':'3/4/2016', 'media':'img/unlockedImages/3.jpg', 'condition':'you take your MCAT'},
        {'person':'Mom', 'icon':'mail','created':'6/6/1994', 'unlocked':'3/25/2016', 'media':'img/unlockedImages/4.jpg', 'condition':'you travel to Hawaii', 'message':'Happy 23rd birthday! Isnt it crazy that I am writing you before you are even born?! This is a photo of your dad and I when we got engaged yesterday. Thought you might like to see us when we were 23 as well.'}
    ];

    var currentMemory = {};

    var resetPages = function() {
        $('#sent').hide();
        $('#memory-page').hide();
        $('#inbox').hide();
        $('#create').hide();
        $('.create-nav').hide();
        $('#create-btn').show();
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

        var unlockMessage = (hasUnlocked ? 'Unlocked at ' : 'Unlock at ') + memory['condition'];
        $('#unlock-condition').text(unlockMessage);
        $('#media-content').css('background-image', 'url(' + memory['media'] + ')')
        $('#memory-message').text(memory['message']);
    };


    var loadTable = function(tableId, memoryArr) {
        $('#' + tableId +' > tbody').empty();
        var tableContent = '';
        for (var i = 0; i < memoryArr.length; i++) {
            var memory = memoryArr[i];
            var memoryHtml = '<div class="memory"><div style="float: left; position: relative; top: 2px;"><img class="lock-icon2" src="img/sketch/'+ memory['icon'] + '-icon.png"/></div><div class="title">' + memory['person'] + '</div><div class="mem-info" style="font-size: 11px">Created ' + memory['created'] + '<br/>' + (memory['unlocked'] != null ? 'Unlocked ' + memory['unlocked'] : '<br/>') +'</div></div>';
            var tdHmtl = '<td class="memory-cell" id="' + tableId + i + '"style="background-image:url(' + memory['media'] + ');">' + memoryHtml + '</td>';
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


    var exitCreateProcess = function() {
        $('#banner-next').show(); //so the button shows next time
        $('.bottom-nav').show();
        hideAllCreatePages();
        if ($('#inbox-btn').hasClass('selected-btn')) {
            resetPages();
            loadInbox();
        } else {
            resetPages();
            loadSent();
        }
    }
    //alt-banner options
    $('#banner-close').click(function() {
        exitCreateProcess();
    });


    //create option buttons
    var createNavArr = ['media', 'share', 'condition', 'send'];

    var resetCreateNav = function() {
        for (var i = 0; i < createNavArr.length; i++) {
            var obj = $('#' + createNavArr[i])
            obj.css('background-image', 'url(img/sketch/' + obj.attr('id') + '-unselected.png)')
        }
    }

    var selectCreateNavItem = function(itemId) {
        resetCreateNav();
        $('#' + itemId).css('background-image', 'url(img/sketch/' + itemId + '-selected.png)');
        console.log($('#' + itemId).css('background-image'));
    }

    var hideAllCreatePages = function() {
        for (var i = 0; i < createNavArr.length; i++) {
            var nav = createNavArr[i];
            $('#' + nav + '-page').hide();
        }
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
        if (step == 'condition') bannerText = 'Set Condition';

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
        currentMemory['icon'] = 'photo';

    });

    $('#video-btn').click(function() {
        $('#video-input').trigger('click');
        $('#preview-icon').attr('src', 'img/sketch/video-icon.png');
        currentMemory['icon'] = 'video';
    });

    $('#sound-btn').click(function() {
        $('#create-sound').show();
        $('#media-preview').css('background-image', 'url(img/sketch/sound-icon.png)');
        currentMemory['icon'] = 'sound';
    });

// Rendering media

    var loadMedia = function(url, mediaId) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#' + mediaId).attr('src', e.target.result);
            $('#media-preview').css('background-image', 'url(' + e.target.result +')');
            currentMemory['media'] = e.target.result;
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
        if (step != 'create-nav-line') {
            selectCreateNavItem(step);
            showCreateNavPage(step);
        }
        if (step != 'send') {
            $('#final-users').empty();
        }
    });

    $('#banner-next').click(function() {
        for (var i = 0; i < createNavArr.length; i++) {
            var imageUrl = $('#' + createNavArr[i]).css('background-image');
            //Find the selected item
            if (imageUrl.indexOf('-selected') != -1) {
                var changeIndex = i + 1;
                if (changeIndex == createNavArr.length) {
                    sendMemory();
                } else {
                    //Pick the next item
                    var nextStep = createNavArr[changeIndex];
                    selectCreateNavItem(nextStep);
                    showCreateNavPage(nextStep);
                    if (nextStep == 'send') loadPreviewText();
                    return;
                }
            }
        }
    });

    //Sharing

    var sharedUsers = function() {
        var users = [];
        for (var i = 0; i < $('.share-cb').length; i++) {
            var obj = $('.share-cb')[i];
            if ($(obj).hasClass('checked')) users.push($(obj).attr('id'));
        }
        return users;
    }

    $('.share-cb').click(function() {
        if ($(this).hasClass('unchecked')) {
            $(this).removeClass('unchecked');
            $(this).addClass('checked');
        } else {
            $(this).removeClass('checked');
            $(this).addClass('unchecked');
        }
    });

    //bottom nav bar buttons
    $('#inbox-btn').click(function() {
        resetPages();
        loadInbox();
    });


    $('#create-btn').click(function() {
        resetPages();
        $(this).hide();
        $('#main-banner').show();
        loadCreate();
    });

    $('#sent-btn').click(function() {
        resetPages();
        loadSent();
    });

    $('#record-btn').on({'touchstart': function() {
        if ($('#record-directions').text() != 'Done!') {
            $('#record-directions').text('Recording...')
            $(this).attr('src', 'img/sketch/microphone-pressed.png')
        }
    }});

    $('#record-btn').on({'touchend': function() {
        $('#record-directions').text('Done!')
        $(this).attr('src', 'img/sketch/microphone.png')
    }});


    //sharing conditions
    var loadChosenCondition = function(condition) {
        $('#selected-condition').attr('src', 'img/sketch/' + condition + '-selected.png');
        $('#selected-condition').attr('name', condition);
        var conditionInstructions = '';
        var conditionPlaceholder = '';
        if (condition == 'time') {
            conditionInstructions = 'Enter a date and time.'
            conditionPlaceholder = 'e.g. 3/6/2016'
            $('#condition-text').attr('type', 'date');
        } else

        if (condition == 'location') {
            conditionInstructions = 'Enter location or address.'
            conditionPlaceholder = 'e.g. Paris, France'
        } else

        if (condition == 'life-event') {
            conditionInstructions = 'Enter a specific life event.'
            conditionPlaceholder = 'e.g. on your marriage date'
        }
        $('#condition-instructions').text(conditionInstructions);
        $('#condition-text').attr('placeholder', conditionPlaceholder);
    };

    $('.condition-icon').click(function() {
        loadChosenCondition($(this).attr('name'));
        $('#choose-condition-page').hide();
        $('#chosen-page').show();
    });

//send
    var loadPreviewText = function() {
        var recipients = sharedUsers();
        var recipientsText = '';
        for (var i = 0; i < recipients.length; i++) {
            recipientsText += recipients[i];
            if (i < recipients.length -1) recipientsText += ', '
        }
        $('#final-users').text(recipientsText);

        var condition = $('#selected-condition').attr('name');
        var prep = '';
        if (condition == 'time' || condition == 'life-event') {
            prep = '&nbsp;on&nbsp;';
        } else
        if (condition == 'location') {
            prep = '&nbsp;at&nbsp;';
        }
        $('#condition-preposition').html(prep);
        $('#final-condition').text($('#condition-text').val());
    }


    $('#send').click(function() {
        loadPreviewText();
    });

    $('#unlocked-table').on('click', 'td', function() {
        var id = $(this).attr('id');
        if (id != null) {
            var index = parseInt(id[id.length - 1]);
            $('#unlockedMemories').hide();
            loadMemoryPage(unlockedMemories[index], 'Memory from ' + unlockedMemories[index]['person'], true);
        }
    });

    //Final Sending!

    var sendMemory = function() {
        var recipients = sharedUsers();
        var recipientsText = '';
        for (var i = 0; i < recipients.length; i++) {
            recipientsText += recipients[i];
            if (i < recipients.length -1) recipientsText += ', '
        }
        var currentDate = new Date();
        currentMemory['condition'] = $('#condition-text').val();
        currentMemory['person'] = recipientsText;
        currentMemory['created'] = currentDate.toDateString();
        currentMemory['message'] = $('#create-message').val();
        var newMemory = jQuery.extend(true, {}, currentMemory);
        sentMemories.push(newMemory);
        currentMemory = {};
        exitCreateProcess();
    }

    $('#sent-table').on('click', 'td', function() {
        var id = $(this).attr('id');
        if (id != null) {
            var index = parseInt(id[id.length - 1]);
            $('#sent').hide();
            loadMemoryPage(sentMemories[index], 'Memory for ' + sentMemories[index]['person'], false);
        }
    });


});