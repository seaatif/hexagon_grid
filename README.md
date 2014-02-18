## Hexagon Grid


A totally customisable jQuery plugin to Create Hexagon grid from images.

[Demo](http://rawgithub.com/seaatif/hexagon_grid/master/index.htm) 

## How to use

### Html Markup
``` html
<div class="hex-wrapper">
	<img src="http://placehold.it/150x150/FF2A7F/fff.png&text=Pink" title="Image Title to show" data-src="http://placehold.it/500x500/FF2A7F/fff.png&text=Pink Large" />
	<img src="http://placehold.it/150x150/FF7F7F/fff.png&text=Small" title="Image Title to show" data-src="http://placehold.it/500x500/FF7F7F/fff.png&text=Large" />
	<img src="http://placehold.it/150x150/2AFF7F/fff.png&text=Small" title="Image Title to show" data-src="http://placehold.it/500x500/2AFF7F/fff.png&text=Large" />
	
	<img src="http://placehold.it/150x150/AAFFD4/fff.png&text=Small" title="Image Title to show" data-src="http://placehold.it/500x500/AAFFD4/fff.png&text=Large" />
	<img src="http://placehold.it/150x150/7F55FF/fff.png&text=Small" title="Image Title to show" data-src="http://placehold.it/500x500/7F55FF/fff.png&text=Large" />
	<img src="http://placehold.it/150x150/D42AFF/fff.png&text=Small" title="Image Title to show" data-src="http://placehold.it/500x500/D42AFF/fff.png&text=Large" />
</div>
```

### jQuery Code
``` javascript
jQuery(document).ready(function($)
{
	$('.hex-wrapper img').aa_hexagon_grid({
		width : 120, // Cell width in px 
		cursorpointer : false, // Set Cursor to Pointer
		costomclass : 'my-class', // Class for each item
		wrapper_class: 'container-class',  // class for outer wrapper
		columns: 'auto', // Number of columns OR 'auto', minimum 2 columns allowed
		is_even_row_larger: true,  // Even rows should be larger or Odd rows?
		distance: 5,  // Distance in px between each cell
		hover_transition: true,  // Transition on mouse hover
	});
});
```
