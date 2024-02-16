export async function getCharacterName(number) {
	try {
		const json = await import('../db.json')
		const character = json.characters.find((char) => char.id === +number)
		if (character) {
			return character.name
		}
		return ''
	} catch (error) {
		return ''
	}
}
