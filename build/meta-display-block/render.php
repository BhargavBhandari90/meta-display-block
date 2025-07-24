<?php
/**
 * Server-side rendering for the Meta Display block.
 *
 * @package MetaDisplayBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// Get current post ID safely.
$current_post_id = get_the_ID();

if ( ! empty( $attributes['isEditorPreview'] ) ) {
	buntywp_meta_display_block_render( $attributes, $current_post_id );
	return;
}

?>
<div class="bwp-meta-display-wrap">
	<div <?php echo wp_kses_data( get_block_wrapper_attributes( array( 'class' => 'bwp-meta-row is-front' ) ) ); ?>>
		<?php buntywp_meta_display_block_render( $attributes, $current_post_id ); ?>
	</div>
</div>
