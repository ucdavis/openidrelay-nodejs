/* Author: Scott Kirkland */
$(function() {
    $(".provider").click(function(e) {
        e.preventDefault();
        $("#openid_identifier").val(this.href);
    });
});