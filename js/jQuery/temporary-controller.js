//	this is the jquery form processing event
$(document).ready(function() {

	//	yes, I'm using live()
	//	this is just a prototype afterall.
	$('#makeCommentForm').live('submit',function() {
		
		$('#makeCommentAjaxLoader').fadeIn('fast',function() {
			
			//	get the comment then ajax it to
			//	the api
			var comment = escape( $('#inputComment').val() );
			var game_id = escape( $('#game_id').val() );
			
			if( comment == '' ) {
				alert( 'If you want to make a comment, you at least have to enter something!' );
				$('#makeCommentAjaxLoader').fadeOut('fast');
				return false;
			}
			
			$.ajax({
				url: $('#makeCommentForm').attr('action'),
				type: 'POST',
				data: 'comment='+comment+
						'&game_id='+game_id,
				success: function(data) {
				
					var newComment = '<li><span class="commentName">posted by <span class="italic">unknown</span> on <span class="time">1 second ago</span></span><p>'+$('#inputComment').val()+'</p></li>';
					
					//	submitted successfully, update the list
					//	then hide the ajax loader and empty the text field
					$('#noCommentsLi').slideUp('fast');
					$('#commentList').append(data);
					$('#makeCommentAjaxLoader').fadeOut('fast');
					$('#inputComment').val('');
				}
			});
		});
		
		return false;
	});
});