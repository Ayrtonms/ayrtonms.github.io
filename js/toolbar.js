$('#toolbar').load('html/toolbar.html', () => {
	$('#delete').click(() => {
		canvas.remove(canvas.getActiveObject());
	});

	$('#add_rect').click(() => {
		var rect = new fabric.Rect({
			left: 100,
			top: 100,
			fill: 'red',
			width: 20,
			height: 20
		});

		canvas.add(rect);
	});

	$('#add_image').click(() => {
		fabric.Image.fromURL('img/boi.jpg', (img) => {
			canvas.add(img);
			canvas.renderAll();
		});
	});

	$('#add_filter').click(() => {
		var object = canvas.getActiveObject();

		if(object.isType('image')){
			object.filters.push(new fabric.Image.filters.Grayscale());
			object.applyFilters();
			canvas.renderAll();
		}
	});
});

$('#textModal').load('modals/textModal.html', () => {
	$('#text_font').load('html/textSelectOptions.html');

	$('#add_text').click(() => {
		var content = $('#text_content').val();
		var font = $('#text_font').val();
		var size = $('#text_size').val();
		var color = $('#text_color').val();

		if(content != null && content != '' && font != -1) {
			var text = new fabric.Text(content, { left: 100, top: 100, fontFamily: font, fontSize: size, fill: color });
			canvas.add(text);
		}
	});
});