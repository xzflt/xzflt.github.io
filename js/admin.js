$(function () {
	$imgs = $('#imgs')
	$('#get').on('click', function () {
		$imgs.empty()
		var name = $('#name').val()
		if (!name) {return false;};
		$.get('/imgs', {name: name}, function (data) {
			data.forEach(function (img) {
				$imgs.append('<img src="http://7xlgbr.com1.z0.glb.clouddn.com/'+img+'" alt="'+img+'"/>')
			})
		})
	})

	dragula([document.getElementById('lights')], {
	  removeOnSpill: true
	});

	$('#put').on('click', function () {
		var name = $('#name').val()
		var imgs = []
		$imgs.find('img').each(function () {
			imgs.push(this.alt)
		})
		$.post('/imgs', {name: name, imgs: imgs.join(',')}, function (data) {
			console.log(data)
		})
	})


  $('#name').blur(function(){
	if ($('#imgs img').length > 0) {return;};
	var name = $('#name').val()
	$.get('/imgs', {name: name}, function (data) {
		data.forEach(function (img) {
			$imgs.append('<img src="http://7xlgbr.com1.z0.glb.clouddn.com/'+img+'" alt="'+img+'"/>')
		})
	})
  })
	console.log('msg')
	$('#sort').on('click', function () {
		var ls = []
		$('#lights li').each(function (el) {
			ls.push(this.title)
		})
		console.log(ls)
		$.get('/sort', {ls: ls}, function (data) {
			console.log(data)
		})
	})
})