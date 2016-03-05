var switchToLocked = function() {
    $('#unlocked-tab').removeClass('active');
    $('#locked-tab').addClass('active');
    $('#locked-memories').show();
    $('#unlocked-memories').hide();
}

var switchToUnlocked = function() {
    $('#locked-tab').removeClass('active');
    $('#unlocked-tab').addClass('active');
    $('#locked-memories').hide();
    $('#unlocked-memories').show();
}

