<?php
/**
 * Plugin Name: USA Interactive Map 
 * Description: A plugin to display the US map with interactive features.
 * Version: 1.0
 * Author: Awais Yaqoob
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

// Enqueue JavaScript and CSS files
function state_map_plugin_enqueue_scripts() {

  wp_enqueue_script('jquery');


    wp_enqueue_script(
        'state-map-hover-script', // Handle for the script
        plugins_url( '/assets/script.js', __FILE__ ), // Path to the JavaScript file
        array('jquery'), // Dependencies
        '1.0',
        true // Load in the footer
    );

    // Optionally, enqueue CSS for styling
    wp_enqueue_style(
        'state-map-style',
        plugins_url( '/assets/styles.css', __FILE__ ),
        array(),
        '1.0'
    );
}
add_action( 'wp_enqueue_scripts', 'state_map_plugin_enqueue_scripts' );

// Shortcode to display the map
function state_map_shortcode() {
    // Path to your HTML file
    $html_file_path = plugin_dir_path( __FILE__ ) . 'assets/customMapUS.html';

    // Check if the file exists
    if ( file_exists( $html_file_path ) ) {
        // Load and return the content of the HTML file
        ob_start();
        include $html_file_path;
        return ob_get_clean();
    } else {
        return '<p>Map file not found.</p>';
    }
}
add_shortcode( 'states_map', 'state_map_shortcode' );
