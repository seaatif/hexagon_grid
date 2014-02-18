/**
 * @Author Aatif Farooq
 * @AuthorEmail seaatif@gmail.com
 * @AuthorURL http://AatifSoft.com/
 * @Copyright 2014
 *
 * @Description Plugin to create hexagon
 */ 

(function($){
	$.fn.extend({ 
		aa_hexagon_grid: function(options) {
			//default Settings
			var defaults = {
				width : 200,
				corners : 6,
				cursorpointer : false,
				costomclass : '',
				wrapper_class: '',
				columns: 'auto', // Number of columns OR 'auto', minimum 2 columns allowed
				is_even_row_larger: true,
				distance: 5,
				hover_transition: true,
				click_callback: thickbox_show, // two parameters: img, cell
			}
			
			var o = $.extend(defaults, options); //combines defaults and optional Settings
			o.cursor =  (o.cursorpointer === true ? 'pointer' : (o.cursorpointer || 'auto'));
    		o.height = o.width;
    		
    		switch (o.corners) { //cursor state
				case 0:
					var wrapper = '<div class="aa_hex_cell aa_circle '+o.costomclass+'" style="width: '+o.width+'px; height: '+o.height+'px"><div class="aa_centerit"></div></div>';
					break;
				case 4:
					var wrapper = '<div class="aa_hex_cell aa_square '+o.costomclass+'" style="width: '+o.width+'px; height: '+o.height+'px"><div class="aa_centerit"></div></div>';
					break;
				case 6:
					o.height =  parseInt(o.width) * 1.15;
					var wrapper = '<div class="aa_hex_cell aa_hexagon '+o.costomclass+'" style="width: '+o.width+'px; height: '+o.height+'px"><div class="aa_hexagon-in1"><div class="aa_hexagon-in2"><div class="aa_hexagon-in2"><div class="aa_hexagon-in2"><div class="aa_centerit aa_hexagon-in3"></div></div></div></div></div>';
					break;
				case 8:
					var wrapper = '<div class="aa_hex_cell aa_octagon '+o.costomclass+'" style="width: '+o.width+'px; height: '+o.height+'px"><div class="aa_octagon-in"><div class="aa_centerit"></div></div></div>';
					break;
				default: //12
					var wrapper = '<div class="aa_hex_cell '+o.costomclass+'" style="width: '+o.width+'px; height: '+o.height+'px"><div class="aa_dodecagon"><div class="aa_dodecagon-in"><div class="aa_dodecagon-in"><div class="aa_centerit"></div></div></div></div></div>';
					break;
			}
    		
    		// dom update should be complete before image loading.
    		$(this).wrapAll('<div class="hex-group ' + o.wrapper_class + '"></div>')
				   .wrap(wrapper)
				   .css({cursor: o.cursor});
    		
    		// create columns layout.
    		var hex_group = $(this).closest('.hex-group').css({'padding-top': o.height / 4});
    		var cells = hex_group.find('.aa_hex_cell');
    		var even_row = false;
    		var index = 0;
    		
    		// calculate columns if 'auto' given
    		if(o.columns == 'auto')
    		{
    			o.auto_columns = true;
    			o.columns = Math.floor(hex_group.width() / (cells.eq(0).width() + o.distance));
    			console.log(o.columns, hex_group.width(), cells.eq(0).width(), o.distance);
    		}
			    		
    		// adding class for tarnsition
    		if(o.hover_transition)
    			hex_group.addClass('hover-transition');
    		
    		// adding distance between columns	
    		cells.css({'margin-top': 	- (o.height / 4), 
					   'margin-right': 	o.distance, 
					   'margin-bottom': o.distance,
					   'margin-left': 	0});
    		
    		// making rows
    		while(index < cells.length)
    		{
    			var larger_row = (even_row && o.is_even_row_larger);
    			var first = cells.eq(index).addClass('first-cell');
				first.prev().addClass('last-cell');
				
				if(!larger_row)
					first.addClass('cell-indent').css({'margin-left' : (o.width + o.distance) / 2});
				
    			index += (larger_row ? o.columns : o.columns - 1);
    			even_row = !even_row;
    		}
			
    		// settin hex group width
			hex_group.width((cells.eq(0).width() + o.distance) * o.columns).css({
				'margin-left': 'auto',
				'margin-right': 'auto'
			}).append('<br clear="both" />');
    		
    		
    		// default image position
    		$(this).each(function() 
			{
				$(this).css({'margin-top'	:	- $(this).height() / 2,
							 'margin-left'	:	- $(this).width() / 2});
			});

			// update image position when loaded
			$(this).load(function() 
			{
				$(this).css({'margin-top'	:	- $(this).height() / 2,
							 'margin-left'	:	- $(this).width() / 2});
			});
			
			
    		cells.click(function(e)
			{
				e.preventDefault();
				var img = $(this).find('img');
				
				if(o.click_callback)
					o.click_callback.call(img, img, $(this));
			});
			
			function thickbox_show(img, cell)
			{
				if(typeof tb_show != 'undefined')
				{
					var obj = {title: img.data('title') || img.attr('title') || null,
								url: img.attr('src'),
								group: img.data('group') || img.attr('rel') || false};
					console.log(obj, img);
					tb_show(obj.title, obj.url, obj.group);
				}
				else
					console.error('thickbox is not included to show the image. Please include thickbox or provide a callback from "click_callback" for "aa_hexagon_grid"');
			}
			
			return $(this);
    	}
	});
})(jQuery);
