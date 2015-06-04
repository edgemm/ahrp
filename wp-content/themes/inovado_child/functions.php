<?php

// SCRIPTS //
function ahrp_scripts() {
	// load self rater scripts only for free quote and subsequent thank you page
	if( is_page( array( 314, 315 ) ) ) :
		wp_enqueue_script( 'ahrp-selfrater', get_stylesheet_directory_uri() . '/js/ahrp-selfrater.js', array(), '1.0.0', true );
		wp_enqueue_script( 'jquery-cookie', get_stylesheet_directory_uri() . '/js/jquery.cookie.js', array(), '1.4.1', true );
	endif;
}
add_action( 'wp_enqueue_scripts', 'ahrp_scripts' );

// SHORTCODES //
function ahrp_freeQuote() {	
	return $_COOKIE[ "ahrp-quote-final" ];
}
add_shortcode( 'ahrp-free-quote', 'ahrp_freeQuote' );

// MISC //
function cf7_form_classes( $class ) {
	// self rater
	if( is_page( 314 ) ) $class .= ' cf7-self-rater';

	return $class;
}
add_filter( 'wpcf7_form_class_attr', 'cf7_form_classes' );

?>