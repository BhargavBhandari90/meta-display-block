/* global MetaDisplayBlockData */
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	SelectControl,
	TextControl,
	ToggleControl,
	RangeControl,
	Modal,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import ServerSideRender from '@wordpress/server-side-render';

import './editor.scss';
import { unseen, seen, media } from '@wordpress/icons';
import metadata from './block.json';
import IconPicker from './components/icon-picker';

export default function Edit( { attributes, setAttributes } ) {
	const {
		label,
		metaKey,
		hideLabel,
		isPreview,
		displayIcon,
		iconName,
		iconWidth,
	} = attributes;
	const [ isOpen, setOpen ] = useState( false );
	const openModal = () => setOpen( true );
	const closeModal = () => setOpen( false );
	const decodeSvg = ( encodedSvg ) => {
		return decodeURIComponent( atob( encodedSvg ) );
	};

	return (
		<div
			className={ `bwp-meta-display-block-wrap has-text-align-${ attributes?.style?.typography?.textAlign }` }
		>
			<div
				{ ...useBlockProps( {
					className: `bwp-meta-row ${
						isPreview ? 'bwp-meta-preview' : ''
					}`,
				} ) }
			>
				<InspectorControls>
					<PanelBody title={ __( 'Setting', 'meta-display-block' ) }>
						<ToggleControl
							__nextHasNoMarginBottom
							label={ __( 'Hide Label', 'meta-display-block' ) }
							checked={ hideLabel }
							onChange={ ( val ) =>
								setAttributes( {
									hideLabel: val,
								} )
							}
						/>
						{ hideLabel && (
							<>
								<ToggleControl
									__nextHasNoMarginBottom
									label={ __(
										'Display Icon',
										'meta-display-block'
									) }
									checked={ displayIcon }
									onChange={ ( val ) =>
										setAttributes( {
											displayIcon: val,
										} )
									}
								/>
								{ displayIcon && (
									<RangeControl
										__nextHasNoMarginBottom
										__next40pxDefaultSize
										help={ __(
											'Width of the icon in pixels.',
											'meta-display-block'
										) }
										initialPosition={ iconWidth }
										label={ __(
											'Icon Width',
											'meta-display-block'
										) }
										max={ 100 }
										min={ 0 }
										value={ iconWidth }
										onChange={ ( value ) =>
											setAttributes( {
												iconWidth: value,
											} )
										}
									/>
								) }
							</>
						) }
					</PanelBody>
				</InspectorControls>
				<div>
					{ isPreview ? (
						<ServerSideRender
							block={ metadata.name }
							attributes={ {
								...attributes,
								isEditorPreview: true,
								iconName: attributes.iconName,
							} }
						/>
					) : (
						<div className="bwp-meta-display-wrap">
							{ ! hideLabel ? (
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
									<span>{ ':' }</span>
								</>
							) : (
								<>
									{ displayIcon && (
										<div
											className={ `bwp-icon-display ${
												iconName ? 'bwp-has-icon' : ''
											}` }
											style={
												iconName
													? { width: iconWidth }
													: {}
											}
										>
											<Button
												variant="tertiary"
												onClick={ openModal }
												icon={ media }
												className="bwp-icon-modal-button"
											></Button>
											{ iconName && (
												<div
													className="bwp-icon-svg-wrap"
													style={
														iconName
															? {
																	width: iconWidth,
															  }
															: {}
													}
													dangerouslySetInnerHTML={ {
														__html: decodeSvg(
															iconName
														),
													} }
												></div>
											) }
											{ isOpen && (
												<Modal
													title="Icon Library"
													onRequestClose={
														closeModal
													}
													size="large"
												>
													<IconPicker
														onSelect={ (
															selectedIcon
														) => {
															setAttributes( {
																iconName:
																	selectedIcon,
															} );
															closeModal();
														} }
													/>
												</Modal>
											) }
										</div>
									) }
								</>
							) }
							<SelectControl
								className="bwp-meta-key"
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								value={ metaKey }
								options={ [
									{
										label: '-- Select a Meta Key --',
										value: '',
									},
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
						</div>
					) }
				</div>
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
