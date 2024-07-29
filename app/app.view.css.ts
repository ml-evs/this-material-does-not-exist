namespace $.$$ {

	$mol_style_define( $optimade_tmdne_app, {

		overflow: 'hidden',
		flex: {
			direction: 'column',
		},
		align: {
			items: 'center',
		},

		Player: {
			flex: {
				grow: 1,
			},
			width: '100%',
			opacity: 1,
			transition: 'opacity 0.15s',
			'[optimade_tmdne_app_player_hidden]': {
				'true': {
					opacity: 0.1,
				},
			},
		},

		Head_space: {
			position: 'absolute',
			top: $mol_gap.block,
			left: 0,
			right: 0,
			flex: {
				grow: 1,
			},
			pointerEvents: 'none',
		},

		Head_card: {
			pointerEvents: 'auto',
			margin: 'auto',
			width: '35%',
			textAlign: 'center',
		},

		Head_title: {
			userSelect: 'none',
			justify: {
				content: 'center',
			},
			font: {
				size: '1.2rem',
			},
		},

		Prediction: {
			userSelect: 'none',
			font: {
				size: '0.7rem',
			},
			lineHeight: '16px',
			flex: {
				grow: 0,
				wrap: 'wrap',
			},
			position: 'absolute',
			left: $mol_gap.block,
			bottom: '11rem',
			pointerEvents: 'none',
			opacity: 1,
			transition: 'opacity 0.15s',
			'[optimade_tmdne_app_prediction_hidden]': {
				'true': {
					opacity: 0,
				},
			},
		},

		Param: {
			gap: '0.3rem',
			flex: {
				wrap: 'wrap',
			},
		},

		Param_name: {
			font: {
				weight: 700,
			},
		},

		Param_symbol: {
			flex: {
				direction: 'row',
			},
		},

		Param_unit: {
			flex: {
				direction: 'row',
			},
		},

		Param_mae_unit: {
			flex: {
				direction: 'row',
			},
		},

		Param_value: {
			gap: '0.25rem',
		},

		Foot: {
			justify: {
				content: 'space-between',
			},
			width: '24rem',
			position: 'absolute',
			bottom: '5.3rem',

			pointerEvents: 'none',
			transition: 'opacity 0.2s',
			opacity: 1,
			'[optimade_tmdne_app_foot_hidden]': {
				'true': {
					opacity: 0,
				},
			},
			zIndex: 1,
		},

		Hint_no: {
			pointerEvents: 'auto',
			color: '#ff6666',
		},

		Hint_yes: {
			pointerEvents: 'auto',
			color: $mol_theme.current,
		},

		Acks: {
			font: {
				size: '0.7rem',
			},
			zIndex: 0,
		},

	} )

}
