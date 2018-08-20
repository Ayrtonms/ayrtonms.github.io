function select(e) {
	var type = e.target.get('type');

	$('#editor').empty();

	if(type == 'text') {
		$('#editor').load('editor/textEditor.html', () => {
			function changeStroke() {
				if($('#editor_draw').val() == 0){
					e.target.set('stroke', null);
					e.target.set('strokeWidth', 1);
				}
				else{
					e.target.set('stroke', $('#editor_draw_color').val());
					e.target.set('strokeWidth', $('#editor_draw').val());
				}

				canvas.renderAll();
			}

			$('#editor_content').val(e.target.get('text'));
			$('#editor_content').on('input', () => {
				e.target.set('text', $('#editor_content').val());
				canvas.renderAll();
			});
				
			$('#editor_font').load('html/fontSelectOptions.html', () => {
				$('#editor_font').val(e.target.get('fontFamily'));
				$('#editor_font').change(() => {
					e.target.set('fontFamily', $('#editor_font').val());
					canvas.renderAll();
				});
			});

			$('#editor_size').val(e.target.get('fontSize'));
			$('#editor_size').on('input', () => {
				e.target.set('fontSize', $('#editor_size').val());
				canvas.renderAll();
			});

			$('#editor_color').val(e.target.get('fill'));
			$('#editor_color').on('input', () => {
				e.target.set('fill', $('#editor_color').val());
				canvas.renderAll();
			});

			$('#editor_draw').val(e.target.get('stroke') == null ? 0 : e.target.get('strokeWidth'));
			$('#editor_draw').on('input', () => changeStroke());

			$('#editor_draw_color').val(e.target.get('stroke') == null ? '#000000': e.target.get('stroke'));
			$('#editor_draw_color').on('input', () => changeStroke());

			$('#editor_bold').prop('checked', e.target.get('fontWeight') == 'bold');
			$('#editor_bold').change(() => {
				e.target.set('fontWeight', $('#editor_bold:checked').length > 0 ? 'bold' : 'normal');
				canvas.renderAll();
			});

			var align = e.target.get('textAlign');

			if(align == 'left') {
				$('#editor_align1').prop('checked', true);
			}
			else if(align == 'center') {
				$('#editor_align2').prop('checked', true);
			}
			else{
				$('#editor_align3').prop('checked', true);
			}

			$('input[name=editor_align]', '#editor_form').change(() => {
				e.target.set('textAlign', $('input[name=editor_align]:checked', '#editor_form').val());
				canvas.renderAll();
			});
		});
	}
	else if(type == 'rect') {
		$('#editor').load('editor/rectEditor.html', () => {
			function changeBorder() {
				var borda = parseInt($('#rect_editor_border').val());

				if(borda == 0) {
					e.target.set('stroke', null);
					e.target.set('strokeWidth', 1);
				}
				else{
					e.target.set('stroke', $('#rect_editor_color').val());
					e.target.set('strokeWidth', borda);
				}

				canvas.renderAll();
			}

			$('#rect_editor_border').val(e.target.get('stroke') == null ? 0 : e.target.get('strokeWidth'));
			$('#rect_editor_border').on('input', () => changeBorder());

			$('#rect_editor_color').val(e.target.get('stroke') == null ? '#000000' : e.target.get('stroke'));
			$('#rect_editor_color').change(() => changeBorder());

			$('#rect_editor_fill').prop('checked', e.target.get('fill') != 'rgba(0, 0, 0, 0)');
			$('#rect_editor_fill').change(() => {
				e.target.set('fill', $('#rect_editor_fill:checked').length > 0 ? $('#rect_editor_fill_color').val() : 'rgba(0, 0, 0, 0)');
				canvas.renderAll();
			});

			$('#rect_editor_fill_color').val(e.target.get('fill') == 'rgba(0, 0, 0, 0)' ? '#000000' : e.target.get('fill'));
			$('#rect_editor_fill_color').change(() => {
				$('#rect_editor_fill').prop('checked', true);
				e.target.set('fill', $('#rect_editor_fill_color').val());
				canvas.renderAll();
			});
		});
	}
	else if(type == 'circle') {
		$('#editor').load('editor/circEditor.html', () => {
			function changeBorder() {
				var borda = parseInt($('#circ_editor_border').val());

				if(borda == 0) {
					e.target.set('stroke', null);
					e.target.set('strokeWidth', 1);
				}
				else{
					e.target.set('stroke', $('#circ_editor_color').val());
					e.target.set('strokeWidth', borda);
				}

				canvas.renderAll();
			}

			$('#circ_editor_border').val(e.target.get('stroke') == null ? 0 : e.target.get('strokeWidth'));
			$('#circ_editor_border').on('input', () => changeBorder());

			$('#circ_editor_color').val(e.target.get('stroke') == null ? '#000000' : e.target.get('stroke'));
			$('#circ_editor_color').change(() => changeBorder());

			$('#circ_editor_fill').prop('checked', e.target.get('fill') != 'rgba(0, 0, 0, 0)');
			$('#circ_editor_fill').change(() => {
				e.target.set('fill', $('#circ_editor_fill:checked').length > 0 ? $('#circ_editor_fill_color').val() : 'rgba(0, 0, 0, 0)');
				canvas.renderAll();
			});

			$('#circ_editor_fill_color').val(e.target.get('fill') == 'rgba(0, 0, 0, 0)' ? '#000000' : e.target.get('fill'));
			$('#circ_editor_fill_color').change(() => {
				$('#circ_editor_fill').prop('checked', true);
				e.target.set('fill', $('#circ_editor_fill_color').val());
				canvas.renderAll();
			});
		});
	}
}

function deselect(e) {
	$('#editor').empty();
}

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

		$('#add_filter').click(() => {
			var object = canvas.getActiveObject();

			if(object.isType('image')){
				object.filters.push(new fabric.Image.filters.Grayscale());
				object.applyFilters();
				canvas.renderAll();
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