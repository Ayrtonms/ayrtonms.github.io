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