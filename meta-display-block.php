<?php
/**
 * Plugin Name:       Meta Display Block
 * Description:       Display custom meta fields in blocks.
 * Version:           1.0.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            BuntyWP
 * Author URI:        https://biliplugins.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       meta-display-block
 *
 * @package MetaDisplayBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
/**
 * Registers the block using a `blocks-manifest.php` file, which improves the performance of block type registration.
 * Behind the scenes, it also registers all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
 */
function buntywp_meta_display_block_init() {
	/**
	 * Registers the block(s) metadata from the `blocks-manifest.php` and registers the block type(s)
	 * based on the registered block metadata.
	 * Added in WordPress 6.8 to simplify the block metadata registration process added in WordPress 6.7.
	 *
	 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
	 */
	if ( function_exists( 'wp_register_block_types_from_metadata_collection' ) ) {
		wp_register_block_types_from_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
		return;
	}

	/**
	 * Registers the block(s) metadata from the `blocks-manifest.php` file.
	 * Added to WordPress 6.7 to improve the performance of block type registration.
	 *
	 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
	 */
	if ( function_exists( 'wp_register_block_metadata_collection' ) ) {
		wp_register_block_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
	}
	/**
	 * Registers the block type(s) in the `blocks-manifest.php` file.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	$manifest_data = require __DIR__ . '/build/blocks-manifest.php';
	foreach ( array_keys( $manifest_data ) as $block_type ) {
		register_block_type( __DIR__ . "/build/{$block_type}" );
	}
}
add_action( 'init', 'buntywp_meta_display_block_init' );

/**
 * Plugin localization for meta keys.
 *
 * @return void
 */
function buntywp_meta_display_block_localize_meta_keys() {
	global $post;

	// Only run in editor and when post is available.
	if ( ! isset( $post->ID ) ) {
		return;
	}

	// Get all meta keys for the current post.
	$meta_keys = array_keys( get_post_meta( $post->ID ) );

	// Enqueue block script (must match handle from block.json or enqueue command).
	wp_enqueue_script( 'buntywp-meta-display-block-editor-script' );

	// Localize meta keys to JS.
	wp_localize_script(
		'buntywp-meta-display-block-editor-script',
		'MetaDisplayBlockData',
		array(
			'metaKeys' => $meta_keys,
		)
	);
}

add_action( 'enqueue_block_editor_assets', 'buntywp_meta_display_block_localize_meta_keys' );

/**
 * Render Block.
 *
 * @param array $attributes Array of block attributes.
 * @param int   $post_id Post ID for which to render the block.
 * @return void
 */
function buntywp_meta_display_block_render( $attributes, $post_id ) {

	if ( empty( $attributes ) || empty( $post_id ) ) {
		return;
	}

	$label        = isset( $attributes['label'] ) ? $attributes['label'] : '';
	$meta_key     = isset( $attributes['metaKey'] ) ? $attributes['metaKey'] : '';
	$hide_label   = isset( $attributes['hideLabel'] ) ? $attributes['hideLabel'] : false;
	$display_icon = isset( $attributes['displayIcon'] ) ? $attributes['displayIcon'] : false;
	$icon_name    = isset( $attributes['iconName'] ) ? $attributes['iconName'] : '';
	$meta_value   = ! empty( $meta_key ) ? get_post_meta( $post_id, $meta_key, true ) : '';
	$icon_width   = isset( $attributes['iconWidth'] ) ? $attributes['iconWidth'] : '';

	if ( ! empty( $meta_value ) ) {

		echo '<div class="bwp-meta-display-wrap">';

		if ( ! $hide_label && $label ) {
			echo wp_sprintf(
				// Translators: %s is the label for the meta key.
				'<strong>%s: </strong>',
				esc_html( $label )
			);
		} elseif ( $display_icon && ! empty( $icon_name ) ) {
				echo '<div class="bwp-icon-display" style="width: ' . esc_attr( $icon_width ) . 'px;">';
				echo decode_svg( $icon_name ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				echo '</div>';
		}

		$meta_value = is_array( $meta_value ) ? implode( ', ', $meta_value ) : $meta_value;
		if ( ! empty( $meta_value ) ) {
			echo '<div>' . esc_html( $meta_value ) . '</div>';
		} else {
			esc_html_e( 'No value found', 'meta-display-block' );
		}

		echo '</div>'; // end .bwp-meta-display-wrap.
	}
}
/**
 * Decode SVG from base64.
 *
 * @param string $encoded_svg Base64 encoded SVG.
 *
 * @return string Decoded SVG.
 */
function decode_svg( $encoded_svg ) {

	if ( empty( $encoded_svg ) ) {
		return '';
	}

	return urldecode( base64_decode( $encoded_svg ) );
}
