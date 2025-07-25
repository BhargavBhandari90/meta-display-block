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
import { useState } from '@wordpress/element';
import ServerSideRender from '@wordpress/server-side-render';

import './editor.scss';
import * as wpIcons from '@wordpress/icons';
import { unseen, seen, media } from '@wordpress/icons';
import metadata from './block.json';
import { Modal } from '@wordpress/components';
import IconPicker from './components/icon-picker';
import { Icon } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const { label, metaKey, hideLabel, isPreview, displayIcon, iconName } =
		attributes;
	const [ isOpen, setOpen ] = useState( false );
	const openModal = () => setOpen( true );
	const closeModal = () => setOpen( false );

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
					{ hideLabel && (
						<ToggleControl
							__nextHasNoMarginBottom
							label={ __( 'Display Icon', 'bhargav-bhandari' ) }
							checked={ displayIcon }
							onChange={ ( val ) =>
								setAttributes( {
									displayIcon: val,
								} )
							}
						/>
					) }
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
							iconName: attributes.iconName,
						} }
					/>
				) : (
					<>
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
								<div>:</div>
							</>
						) : (
							<>
								{ displayIcon && (
									<>
										<div
											className={ `bwp-icon-display ${
												iconName ? 'bwp-has-icon' : ''
											}` }
										>
											<Button
												variant="tertiary"
												onClick={ openModal }
												icon={ media }
												className="bwp-icon-modal-button"
											></Button>
											{ iconName && iconName }
										</div>
										{ isOpen && (
											<Modal
												title="Icon Library"
												onRequestClose={ closeModal }
												size="large"
											>
												<IconPicker
													selected={ iconName }
													onSelect={ (
														selectedIcon
													) => {
														setAttributes( {
															iconName: (
																<Icon
																	icon={
																		wpIcons[
																			selectedIcon
																		]
																	}
																/>
															),
														} );
														closeModal();
													} }
												/>
											</Modal>
										) }
									</>
								) }
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
