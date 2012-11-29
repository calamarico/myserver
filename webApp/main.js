$(function() {
	$("#login").submit(function() {
		console.log({user: $('username').value, pass: $('password')});
		$.ajax({
			url: '/login',
			type: 'POST',
			data: JSON.stringify({'user': $('#username').val(),
					'pass': $('#password').val()}),
			dataType: 'json',
			contentType: 'application/json',
			success: function(result) {
				console.log(result);
			}
		});
		return false;
	});
});
