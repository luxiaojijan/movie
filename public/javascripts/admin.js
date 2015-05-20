$(function(){
	$('.del').click(function(e){
		var target = $(e.target);
		var id = target.data('id');
		var tr = $('.item-id-'+ id);
		$.ajax({
			url: '/admin/movie/list/?id=' + id,
			type: 'POST'
		})
		.done(function(results) {
			if(results.success === 1){
				if(tr.length > 0){
					tr.remove();
				}
			}
		})
	})

  $('#douban').blur(function(){
    var douban = $('#douban');
    var id = douban.val();
    $.ajax({
      url: 'https://api.douban.com/v2/movie/subject/' +id,
      cache: true,
      type: 'get',
      dataType: 'jsonp',
      crossDomain: true,
      jsonp: 'callback',
      success: function(data){
        $('#inputTitle').val(data.title)
        $('#inputDoctor').val(data.directors.name)
        $('#inputFlash').val('http://player.youku.com/player.php/sid/XOTU5NDg2ODE2/v.swf')
        $('#inputCountry').val(data.countries)
        $('#inputPoster').val(data.images.large)
        $('#inputYear').val(data.year)
        $('#inputSummary').val(data.summary)
      }
    })
  })
})
