<?php
// This file is generated. Do not modify it manually.
return array(
	'meta-display-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'buntywp/meta-display-block',
		'version' => '0.1.0',
		'title' => 'Meta Display',
		'category' => 'widgets',
		'icon' => 'tag',
		'description' => 'Example block scaffolded with Create Block tool.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'shadow' => true,
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true,
				'__experimentalFontFamily' => true
			),
			'color' => array(
				'background' => true,
				'text' => true,
				'heading' => false
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true
			),
			'__experimentalBorder' => array(
				'radius' => true,
				'color' => true,
				'width' => true,
				'style' => true,
				'__experimentalDefaultControls' => array(
					'color' => true,
					'radius' => true
				)
			)
		),
		'attributes' => array(
			'label' => array(
				'type' => 'string',
				'default' => 'Meta Label'
			),
			'metaKey' => array(
				'type' => 'string',
				'default' => '_my_meta_key'
			),
			'hideLabel' => array(
				'type' => 'boolean',
				'default' => false
			),
			'isPreview' => array(
				'type' => 'boolean',
				'default' => false
			),
			'isEditorPreview' => array(
				'type' => 'boolean',
				'default' => false
			),
			'displayIcon' => array(
				'type' => 'boolean',
				'default' => false
			),
			'iconName' => array(
				'type' => 'string',
				'default' => ''
			),
			'iconWidth' => array(
				'type' => 'number',
				'default' => 24
			)
		),
		'textdomain' => 'meta-display',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js'
	)
);
