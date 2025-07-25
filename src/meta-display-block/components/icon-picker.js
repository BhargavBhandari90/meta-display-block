import * as wpIcons from '@wordpress/icons';
import { Icon } from '@wordpress/icons';
import { useState } from '@wordpress/element';
import { Button, TextControl } from '@wordpress/components';

const IconPicker = ( { selected, onSelect } ) => {
	const [ searchTerm, setSearchTerm ] = useState( '' );
	const [ selectedCategory, setSelectedCategory ] = useState( 'All' );
	const [ selectedIcon, setSelectedIcon ] = useState( null );

	const categories = [ 'WordPress' ];
	const iconsList = {
		wordpress: {
			name: 'WordPress',
			icons: wpIcons,
			category: 'WordPress',
		},
		other: {
			name: 'Other',
			icons: {},
			category: 'Other',
		},
	};

	return (
		<div className="bwp-icon-picker-wrap">
			{ /* Sidebar */ }
			<div className="bwp-icon-picker-sidebar">
				<TextControl
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					placeholder="Search icons..."
					className="mb-4"
					value={ searchTerm }
					onChange={ ( value ) => setSearchTerm( value ) }
				/>
				<ul className="space-y-1">
					{ categories.map( ( cat ) => (
						<li key={ cat }>
							<Button
								variant={
									selectedCategory === cat
										? 'default'
										: 'ghost'
								}
								className="w-full justify-start"
								onClick={ () => setSelectedCategory( cat ) }
							>
								{ cat }
							</Button>
						</li>
					) ) }
				</ul>
			</div>

			<div className="bwp-icon-picker-content">
				<div className="bwp-icons">
					{ Object.entries( iconsList ).map(
						( [ category, catObj ] ) => {
							{
								return Object.entries( catObj.icons ).map(
									( [ name, iconNode ] ) => {
										if (
											name === 'Icon' ||
											typeof iconNode !== 'object' ||
											iconNode === null ||
											Array.isArray( iconNode ) ||
											! name
												.toLowerCase()
												.includes(
													searchTerm.toLowerCase()
												)
										) {
											return null;
										}

										return (
											<Button
												key={ name }
												onClick={ () => {
													setSelectedIcon( name );
													onSelect?.( name );
												} }
												className={ `bwp-icon-button ${
													selectedIcon === name
														? 'selected'
														: ''
												}` }
											>
												<Icon icon={ iconNode } />
												<div>{ name }</div>
											</Button>
										);
									}
								);
							}
						}
					) }
				</div>
			</div>
		</div>
	);
};

export default IconPicker;
