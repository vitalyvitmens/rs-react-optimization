export async function getCharacterName(number, characters) {
	try {
		const character = characters.find((char) => char.id === +number)
		if (character) {
			return character.name
		}
		return ''
	} catch (error) {
		return ''
	}
}
