import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../components'
import { NotFound } from '../../pages'
import { useFetchCategory } from '../../hooks'
import { getCharacterName, getEpisodeName } from '../../utils'
import styles from './Detail.module.css'

export const Detail = () => {
  const { loading, error, categories, hasMore, category, id } =
  useFetchCategory()
	const navigate = useNavigate()

  if (loading) {
    return <h2>Loading...</h2>
  }

	console.log('####: id', id)
	console.log('####: loading', loading)
	console.log(`####: category: ${category}`)
	console.log(`####: ${category}`, categories)
	console.log('####: characters.id', categories.name)
	console.log('####: characters.name', categories.map((i) => i.name))

	// useEffect(() => {
	// 	async function fetchData() {
	// 		try {
	// 			const json = await import('../../db.json')
	// 			const item = json[category]
	// 				? json[category].find((item) => item.id === Number(id))
	// 				: null
	// 			setData(item)
	// 			setLoading(false)
	// 		} catch (error) {
	// 			console.error(error)
	// 			setLoading(false)
	// 		}
	// 	}

	// 	fetchData()
	// }, [category, id])

	if (!categories && !loading) {
		return <NotFound />
	}

	return (
		<div className={styles.Detail}>
			{!categories || loading ? (
				<span>Загрузка...</span>
			) : (
				<div className={styles.row}>
					{categories.map((i) => i.image)[id - 1] && (
						<img
							src={categories.map((i) => i.image)[id - 1]}
							alt={categories.map((i) => i.name)[id - 1]}
						/>
					)}
					<div className={styles.column}>
						<div className={styles.name}>
							{categories.map((i) => i.name)[id - 1] || 'нет'}
						</div>
						<div className={styles.body}>
							{category === 'characters' && (
								<div>
									<p>
										<span>Пол: </span>
										{categories.map((i) => i.gender)[id - 1] || 'нет'}
									</p>
									<p>
										<span>Вид: </span>
										{categories.map((i) => i.species)[id - 1] || 'нет'}
									</p>
									<p>
										<span>Статус: </span>
										{categories.map((i) => i.status)[id - 1] || 'нет'}
									</p>
									<p>
										<span>Тип: </span>
										{categories.map((i) => i.type)[id - 1] || 'нет'}
									</p>
									{categories.episode && categories.episode.length > 0 && (
										<ul>
											{categories.episode.map(
												(ep) =>
													ep && (
														<li key={ep.id}>
															<Link to={`/characters/${ep}`}>
																{getEpisodeName(ep, categories)}
															</Link>
														</li>
													)
											)}
										</ul>
									)}
								</div>
							)}
							{category === 'locations' && (
								<div>
									<p>
										<span>Тип: </span>
										{categories.map((i) => i.type)[id - 1] || 'нет'}
									</p>
									<p>
										<span>Измерение: </span>
										{categories.map((i) => i.dimension)[id - 1] || 'нет'}
									</p>
									{categories.residents && categories.residents.length > 0 && (
										<ul>
											{categories.residents.map(
												(res) =>
													res && (
														<li key={categories.id}>
															<Link to={`/locations/${res}`}>
																{getCharacterName(res, categories)}
															</Link>
														</li>
													)
											)}
										</ul>
									)}
								</div>
							)}
							{category === 'episodes' && (
								<div>
									<p>
										<span>Номер эпизода: </span>
										{categories.map((i) => i.episode)[id - 1] || 'нет'}
									</p>
									<p>
										<span>Дата выхода: </span>
										{categories.map((i) => i.air_date)[id - 1] || 'нет'}
									</p>
									{categories.characters &&
										categories.characters.length > 0 && (
											<ul>
												{categories.characters.map(
													(char) =>
														char && (
															<li key={char.id}>
																<Link to={`/episodes/${char}`}>
																	{getCharacterName(char, categories)}
																</Link>
															</li>
														)
												)}
											</ul>
										)}
								</div>
							)}
						</div>
					</div>
				</div>
			)}
			<Button onClick={() => navigate(-1)}>Вернуться назад к списку</Button>
		</div>
	)
}
