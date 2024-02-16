export async function getEpisodeName(number) {
	try {
		const json = await import('../db.json')
		const episode = json.episodes.find((ep) => ep.id === +number)
		if (episode) {
			return episode.name
		}
		return ''
	} catch (error) {
		return ''
	}
}
