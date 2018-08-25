function loadToolbar(){
	$('#toolbar').load('html/toolbar.html', () => {
		$('#delete').click(() => {
			var group = canvas.getActiveObjects();

			if(group) {
				canvas.remove(...group);
				canvas.discardActiveObject().renderAll();
			} else{
				canvas.remove(canvas.getActiveObject());
			}
		});

		$('#mirror').click(() => {
			var object = canvas.getActiveObject();

			if(canvas != null && object.isType('image')) {
				object.set('flipX', !object.get('flipX'));
				canvas.renderAll();
			}
		});
	});

	$('#textModal').load('modals/textModal.html', () => {
		$('#text_font').load('html/fontSelectOptions.html');

		$('#add_text').click(() => {
			var content = $('#text_content').val();
			var font = $('#text_font').val();
			var size = $('#text_size').val();
			var color = $('#text_color').val();
			var draw = $('#text_draw').val();
			var draw_color = $('#text_draw_color').val();
			var bold = $('#text_bold:checked').length > 0;
			var align = $('input[name=text_align]:checked', '#text_form').val();

			if(content != null && content != '' && font != -1) {
				var text;

				if(draw > 0) {
					text = new fabric.Text(content, { left: 100, top: 100, fontFamily: font, fontSize: size, fill: color, strokeWidth: draw, stroke: draw_color, fontWeight: (bold ? 'bold' : 'normal'), textAlign: align });
				}
				else{
					text = new fabric.Text(content, { left: 100, top: 100, fontFamily: font, fontSize: size, fill: color, fontWeight: (bold ? 'bold' : 'normal'), textAlign: align });
				}
				
				canvas.add(text);
			}
		});
	});

	$('#imageModal').load('modals/imageModal.html', () => {
		$('#image_file').change(() => {
			if($('#image_file').prop('files').length > 0){
				var type = $('#image_file').prop('files')[0].type;
				
				if(type == 'image/jpeg' || type == 'image/png') {
					var reader = new FileReader();

					reader.onload = (e) => {
						$('#image_preview').prop('src', e.target.result);

						if($('#image_template:checked').length > 0){
							$('#image_label').text('Proporção: 100%');
							$('#image_prop').val(100 / 3);
							$('#image_prop').removeAttr('disabled');
						}
					};

					reader.readAsDataURL($('#image_file').prop('files')[0]);
				}
				else{
					alert('Arquivo inválido!');
				}
			}
		});

		$('#add_image').click(() => {
			var url = $('#image_preview').prop('src');

			if(url != null && url != '') {
				var template = $('#image_template:checked').length > 0;

				if(template) {
					var prop = 50 + $('#image_prop').val() * 1.5;

					fabric.Image.fromURL(url, (img) => {
						width = img.width * prop / 100;
						height = img.height * prop / 100;

						resize();

						canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
							scaleX: canvas.width / img.width,
							scaleY: canvas.height / img.height
						});
					});
				} else{
					fabric.Image.fromURL(url, (img) => {
						canvas.add(img);
						canvas.renderAll();
					});
				}
			}
			else{
				alert('Selecione um arquivo antes de fazer upload!');
			}
		});

		$('#image_template').change(() => {
			if($('#image_template:checked').length > 0) {
				var src = $('#image_preview').prop('src');

				if(src != null && src != '') {
					$('#image_label').text('Proporção: 100%');
					$('#image_prop').val(100 / 3);
					$('#image_prop').removeAttr('disabled');
				}
			}
			else{
				$('#image_prop').prop('disabled', 'true');
			}
		});

		$('#image_prop').prop('disabled', 'true');
		$('#image_prop').on('input', () => {
			var proporcao = 50 + $('#image_prop').val() * 1.5;

			$('#image_label').text('Proporção: ' + proporcao + '%');
		});
	});

	$('#rectModal').load('modals/rectModal.html', () => {
		$('#rect_fill_color').change(() => {
			$('#rect_fill').prop('checked', true);
		});

		$('#add_rect').click(() => {
			var borda = $('#rect_border').val();
			var cor = $('#rect_color').val();
			var fill = $('#rect_fill:checked').length > 0;
			var fill_color = $('#rect_fill_color').val();

			var rect = new fabric.Rect({
				stroke: borda > 0 ? cor : null,
				strokeWidth: borda > 0 ? parseInt(borda, 10) : 1,
				left: 100,
				top: 100,
				width: 100,
				height: 100,
				fill: fill ? fill_color : 'rgba(0, 0, 0, 0)'
			});

			canvas.add(rect);
		});
	});

	$('#circModal').load('modals/circModal.html', () => {
		$('#circ_fill_color').change(() => {
			$('#circ_fill').prop('checked', true);
		});

		$('#add_circle').click(() => {
			var borda = $('#circ_border').val();
			var cor = $('#circ_color').val();
			var fill = $('#circ_fill:checked').length > 0;
			var fill_color = $('#circ_fill_color').val();

			var circ = new fabric.Circle({
				stroke: borda > 0 ? cor : null,
				strokeWidth: borda > 0 ? parseInt(borda, 10) : 1,
				left: 100,
				top: 100,
				radius: 100,
				fill: fill ? fill_color : 'rgba(0, 0, 0, 0)'
			});

			canvas.add(circ);
		});
	});
}