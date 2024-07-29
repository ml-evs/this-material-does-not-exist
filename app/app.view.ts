namespace $.$$ {

	export class $optimade_tmdne_app extends $.$optimade_tmdne_app {

		@ $mol_mem_key
		fetch_by_number( number: number ) {
			$mol_wire_solid()
			return this.$.$mol_fetch.json( `https://optimade-gnome.odbx.science/v1/structures?page_limit=1&page_offset=${number}` ) as any
		}

		@ $mol_mem_key
		predict_by_number( number: number ) {
			$mol_wire_solid()

			const structure = JSON.stringify( this.fetch_by_number( number ) )
			const params = new URLSearchParams({ structure })
			const url = `https://labs.mpds.io/predict`

			const prediction = this.$.$mol_wire_sync( this ).$.$mol_fetch.success( url, {
				method: 'post',
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: params.toString(),
			} ).json() ?? {} as any

			return prediction
		}

		@ $mol_mem
		json() {
			return this.fetch_by_number( this.number() )
		}

		@ $mol_mem_key
		card_name( n: number ) {
			const json = this.fetch_by_number( n )
			let str = json?.data[ 0 ]?.attributes?.chemical_formula_reduced
			return formula_html( str )
		}

		@ $mol_mem_key
		card_loaded( n: number ) {
			try {
				this.card_name( n )
				return this.number() === n
			} catch (error) {
				if( $mol_promise_like( error ) ) return false
			}
			return false
		}

		cards(): readonly ( any )[] {
			const swiped = this.number_swiped()
			return [
				this.Card( this.number_prefetch() ),
				... swiped ? [ this.Card( swiped ) ] : [],
				this.Card( this.number() ),
			]
		}

		@ $mol_action
		random_sample() {
			return random_int( 1, 384937 )
		}

		@ $mol_mem
		number( next?: number ): number {
			return next ?? this.random_sample()
		}

		@ $mol_mem
		number_prefetch( next?: number ): number {
			return next ?? this.random_sample()
		}

		@ $mol_action
		update() {
			this.number_swiped( this.number() )
			this.number( this.number_prefetch() )
			const prefetch = this.random_sample()
			this.number_prefetch( prefetch )
			$mol_wire_async( this ).predict_by_number( prefetch )
		}

		@ $mol_mem
		predict() {
			return this.predict_by_number( this.number() )
		}

		@ $mol_mem
		params(): readonly any[] {
			const keys = Object.keys( this.predict().prediction )
			return keys.map( k => this.Param( k ) )
		}

		@ $mol_mem_key
		param_value( id: any ): string {
			return this.predict().prediction[id].value ?? ''
		}

		@ $mol_mem_key
		param_mae( id: any ): string {
			return this.predict().prediction[id].mae ?? ''
		}

		@ $mol_mem_key
		param_name( id: any ): string {
			return this.predict().legend[id].name ?? ''
		}

		@ $mol_mem_key
		param_unit( id: any ): string {
			return this.predict().legend[id].gui_units ?? ''
		}

		@ $mol_mem_key
		param_symbol( id: any ): string {
			return this.predict().legend[id].symbol ?? ''
		}

		player_pointerdown( next?: any ) {
			this.rotating( true )
		}

		player_pointerup( next?: any ) {
			this.rotating( false )
		}

		click_no() {
			this.swipe_to_left( this.number() )
		}

		click_yes() {
			this.swipe_to_right( this.number() )
		}

		@ $mol_mem_key
		swiped_to( id: number, next?: string ) {

			const vote = next == 'left' ? 0 : next == 'right' ? 1 : undefined
			if( vote !== undefined ) {

				this.update()
				const params = new URLSearchParams( {
					id: this.fetch_by_number( id )?.data[ 0 ]?.attributes?._gnome_material_id,
					comment: this.why( id ),
					vote: vote.toString(),
				} )

				this.$.$mol_fetch.success( 'https://crus.absolidix.com', {
					method: 'post',
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
					body: params.toString(),
				} )

			}

			return next ?? ''
		}

	}

	function random_int( min: number, max: number ) {
		return Math.floor( Math.random() * ( max - min + 1 ) ) + min
	}

	function formula_html( str: string ) {
		let sub = false
		let html = ''
		for( let i = 0; i < str.length; i++ ) {
			if( !isNaN( +str[ i ] ) || str[ i ] == '.' ) {
				if( !sub ) {
					html += '<sub>'
					sub = true
				}
			} else {
				if( sub ) {
					html += '</sub>'
					sub = false
				}
			}
			html += str[ i ]
		}
		if( sub ) html += '</sub>'
		return html ?? ''
	}

}
