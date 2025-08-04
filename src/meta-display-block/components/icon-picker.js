import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { TextareaControl, Button } from '@wordpress/components';

const IconPicker = ( { onSelect } ) => {
	const [ customSvg, setCustomSvg ] = useState( '' );

	const encodeSvg = ( svgString ) => {
		return btoa( encodeURIComponent( svgString ) );
	};

	const decodeSvg = ( encodedSvg ) => {
		return decodeURIComponent( atob( encodedSvg ) );
	};

	return (
		<>
			<TextareaControl
				__nextHasNoMarginBottom
				label={ __( 'SVG Code', 'meta-display-block' ) }
				value={ decodeSvg( customSvg ) }
				onChange={ ( value ) => setCustomSvg( encodeSvg( value ) ) }
				help={ __( 'Paste your SVG code here', 'meta-display-block' ) }
			/>
			<Button
				variant="primary"
				onClick={ () => {
					onSelect( customSvg );
				} }
				label={ __( 'Set Icon', 'meta-display-block' ) }
				text={ __( 'Set Icon', 'meta-display-block' ) }
			></Button>
		</>
	);
};

export default IconPicker;
