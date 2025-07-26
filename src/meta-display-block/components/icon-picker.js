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
				label="SVG Code"
				value={ decodeSvg( customSvg ) }
				onChange={ ( value ) => setCustomSvg( encodeSvg( value ) ) }
				help="Paste your SVG code here"
			/>
			<Button
				variant="primary"
				onClick={ () => {
					onSelect( customSvg );
				} }
			>
				Set Icon
			</Button>
		</>
	);
};

export default IconPicker;
