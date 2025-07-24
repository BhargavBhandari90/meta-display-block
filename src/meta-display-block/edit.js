/* global MetaDisplayBlockData */
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	SelectControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';

import './editor.scss';
import { unseen, seen } from '@wordpress/icons';
import metadata from './block.json';

export default function Edit( { attributes, setAttributes } ) {
	const { label, metaKey, hideLabel, isPreview } = attributes;
	const { serverSideRender: ServerSideRender } = wp;

	return (
		<div className="bwp-meta-display-wrap">
			<InspectorControls>
				<PanelBody title={ __( 'Setting', 'bhargav-bhandari' ) }>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Hide Label', 'bhargav-bhandari' ) }
						checked={ hideLabel }
						onChange={ ( val ) =>
							setAttributes( {
								hideLabel: val,
							} )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div
				{ ...useBlockProps( {
					className: `bwp-meta-row ${
						isPreview ? 'bwp-meta-preview' : ''
					}`,
					style: isPreview
						? { display: 'block' }
						: { display: 'flex' },
				} ) }
			>
				{ isPreview ? (
					<ServerSideRender
						block={ metadata.name }
						attributes={ {
							...attributes,
							isEditorPreview: true,
						} }
					/>
				) : (
					<>
						{ ! hideLabel && (
							<>
								<TextControl
									className="bwp-meta-label"
									__next40pxDefaultSize
									placeholder={ __(
										'Label',
										'meta-display'
									) }
									value={ label }
									onChange={ ( value ) =>
										setAttributes( { label: value } )
									}
									__nextHasNoMarginBottom
								/>
								<div>:</div>
							</>
						) }
						<SelectControl
							className="bwp-meta-key"
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							value={ metaKey }
							options={ [
								{ label: '-- Select a Meta Key --', value: '' },
								...MetaDisplayBlockData.metaKeys.map(
									( key ) => ( {
										label: key,
										value: key,
									} )
								),
							] }
							onChange={ ( value ) =>
								setAttributes( { metaKey: value } )
							}
						/>
					</>
				) }
			</div>
			{ ! isPreview ? (
				<Button
					className="step-preview-button"
					variant="tertiary"
					onClick={ () => setAttributes( { isPreview: true } ) }
					icon={ seen }
				></Button>
			) : (
				<Button
					icon={ unseen }
					iconPosition="right"
					className="step-edit-button"
					onClick={ () => setAttributes( { isPreview: false } ) }
				></Button>
			) }
		</div>
	);
}
