namespace $.$$ {

	$mol_style_define( $optimade_tmdne_card, {

		pointerEvents: 'auto',
		width: 'max-content',
		position: 'fixed',
		left: '50%',
		transform: 'translateX(-50%)',
		bottom: '1.6rem',
		zIndex: 2,

		// position: 'relative',
		// left: 0,
		// right: 0,
		// width: '100%',
		// margin: 'auto',
		// overflow: 'hidden',
		// flex: {
		// 	grow: 1,
		// },

		padding: '0.5rem',
		Float: {
			margin: 'auto',
		},

		Card_float: {
			background: {
				color: $mol_theme.back,
			},
			transform: 'translateY(125%)',
			transition: 'transform 0.7s',
			'[loaded]': {
				'true': {
					transform: 'none',
				},
			},
			border: {
				radius: $mol_gap.round,
			},
			boxShadow: '0 0 0.5rem 0rem hsla(0,0%,0%,.125)',
		},

		Card_content: {
			flex: {
				direction: 'column',
			},
			background: {
				color: $mol_style_func.hsla( 210, 80, 50, 0.3 ),
			},
			padding: $mol_gap.block,
			border: {
				radius: $mol_gap.round,
			},
			'[card_position]': {
				'right': {
					background: {
						color: $mol_style_func.hsla( 120, 80, 50, 0.3 ),
					},
				},
				'left': {
					background: {
						color: $mol_style_func.hsla( 0, 80, 50, 0.3 ),
					},
				},
			},
		},

		Name: {
			flex: {
				direction: 'row',
			},
			padding: {
				bottom: '0.5rem',
			},
			justify: {
				content: 'center',
			},
			font: {
				weight: 700,
				size: '1.5rem',
			},
		},

		Question: {
			justify: {
				content: 'center',
			},
			padding: {
				bottom: '0.5rem',
			},
		},

		Why: {
			pointerEvents: 'auto',
			maxWidth: '20rem',
		},

		Why_label: {
			gap: '0.5rem',
		},

		Why_optional: {
			color: $mol_theme.shade,
			font: {
				style: 'italic',
			},
		},

	} )

}
