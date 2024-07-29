namespace $.$$ {

	export class $optimade_tmdne_card extends $.$optimade_tmdne_card {

		@ $mol_mem
		card_position(): string {
			return this.swiped_to() || this.passed() || ''
		}
		
	}

}
