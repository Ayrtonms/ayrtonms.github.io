var canvas;

var width = null, height = null, template_width, template_height;

function resize() {
	if(width == null && height == null) {
		canvas.setWidth($('#canvas-container').width());
		canvas.setHeight($('#canvas-container').height());
	}
	else{
		canvas.setWidth(width);
		canvas.setHeight(height);
	}
}

window.onresize = function(event){
	resize();

	canvas.renderAll();
};

$(document).ready(() => {
	canvas = new fabric.Canvas('canvas');

	canvas.backgroundColor = "#ffffff";

	resize();

	canvas.on('selection:created', (e) => select(e));
	canvas.on('selection:updated', (e) => select(e));
	canvas.on('selection:cleared', (e) => deselect(e));

	canvas.renderAll();

	$('#main_bar').load('html/mainBar.html', () => {
		$('#save').click(() => {
			$('#save').attr('download', 'meme.png');
			$('#save').attr('href', canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream'));
		});

		$('#reset').click(() => {
			canvas.clear();

			canvas.backgroundColor = '#ffffff';
			width = null;
			height = null;
			resize();

			canvas.renderAll();
		});

		$('#resizeModal').load('modals/resizeModal.html', () => {
			$('#resize').click(() => {
				var x = $('#resize_width').val();
				var y = $('#resize_height').val();

				if(x != null && x != '' && y != null && y != '') {
					width = x;
					height = y;

					canvas.backgroundImage = 0;
					resize();

					alert(x);
				}
			});
		});

		$('#templateModal').load('modals/templateModal.html', () => {
			$('#template_select').load('html/templateSelectOptions.html')

			$('#template_prop').val(0);
			$('#template_prop').prop('disabled', 'true');

			$('#template_select').change(() => {
				var imagePath = $('#template_select').val();

				if(imagePath != -1) {
					fabric.Image.fromURL(imagePath, (img) => {
						$('#template_width').val(img.width);
						$('#template_height').val(img.height);
						$('#template_prop').removeAttr('disabled');

						$('#template_prop').val(100 / 3);
						$('#template_label').text("Proporção: 100%");

						template_width = img.width;
						template_height = img.height;
					});
				}
				else{
					$('#template_width').val(null);
					$('#template_height').val(null);
					$('#template_prop').prop('disabled', 'true');
				}
			});

			$('#template_prop').on('input', () => {
				$('#template_prop').trigger('change');
			});

			$('#template_prop').change(() => {
				var proportion = 50 + $('#template_prop').val() * 1.5;

				$('#template_width').val(template_width * proportion / 100);
				$('#template_height').val(template_height * proportion / 100);

				$('#template_label').text("Proporção: " + proportion + "%");
			});

			$('#template').click(() => {
				var imagePath = $('#template_select').val();
				var x = $('#template_width').val();
				var y = $('#template_height').val();

				if(imagePath != -1 && x != null && x != '' && y != null && y != '') {
					fabric.Image.fromURL(imagePath, (img) => {
						width = x;
						height = y;

						resize();

						canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
							scaleX: canvas.width / img.width,
							scaleY: canvas.height / img.height
						});
					});
				}
			});
		});

		loadToolbar();
	});
});