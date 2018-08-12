var canvas;

window.onload = function(){
	canvas = new fabric.Canvas('canvas');

	canvas.backgroundColor = "#ffffff";
	canvas.setWidth($('#canvas-container').width());
	canvas.setHeight($('#canvas-container').height());

	canvas.renderAll();
};

window.onresize = function(){
	canvas.setWidth($('#canvas-container').width());
	canvas.setHeight($('#canvas-container').height());

	canvas.renderAll();
};

$('#rect').click(function(){
	var rect = new fabric.Rect({
		left: 100,
		top: 100,
		fill: 'red',
		width: 20,
		height: 20
	});

	canvas.add(rect);
});

$('#text').click(function(){
	var text = new fabric.Text('hello world', { left: 100, top: 100 });
	canvas.add(text);
});

$('#img').click(function(){
	fabric.Image.fromURL('img/boi.jpg', function(oImg) {
		canvas.add(oImg);
	});
});

$('#filter').click(function(){
	var object = canvas.getActiveObject();

	if(object.isType('image')){
		object.filters.push(new fabric.Image.filters.Grayscale());
		object.applyFilters();
		canvas.renderAll();
	}
});

$('#delete').click(function(){
	canvas.remove(canvas.getActiveObject());
});