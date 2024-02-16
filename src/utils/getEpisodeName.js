export async function getEpisodeName(number, characters) {
	try {
		const episode = characters.find((ep) => ep.id === +number)
		if (episode) {
			return episode.name
		}
		return ''
	} catch (error) {
		return ''
	}
}
