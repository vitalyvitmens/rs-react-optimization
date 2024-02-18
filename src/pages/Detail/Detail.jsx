import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../components'
import { NotFound } from '../../pages'
import { useFetchCategoryId } from '../../hooks'
import { getCharacterName, getEpisodeName } from '../../utils'
import styles from './Detail.module.css'

export const Detail = () => {
	const { loading, error, categoriesId, hasMore, category, id, pageNumber } =
		useFetchCategoryId()
	console.log(`####: categoriesId.${category} from Detail`, categoriesId)
	console.log(`####: pageNumber: ${pageNumber} from Detail`)
	// console.log(`####: id: ${id} from Detail`)

	const navigate = useNavigate()

	if (loading || !categoriesId) {
		return <h2>Loading...</h2>
	}

	console.log('####: characters.name', categoriesId.name)

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

	if (!categoriesId && !loading) {
		return <NotFound />
	}

	return (
		<div className={styles.Detail}>
			{!categoriesId || loading ? (
				<span>Загрузка...</span>
			) : (
				<div className={styles.row}>
					{categoriesId.image && (
						<img src={categoriesId.image} alt={categoriesId.name} />
					)}
					<div className={styles.column}>
						<div className={styles.name}>{categoriesId.name || 'нет'}</div>
						<div className={styles.body}>
							{category === 'characters' && (
								<div key={categoriesId.id}>
									<p>
										<span>Пол: </span>
										{categoriesId.gender || 'нет'}
									</p>
									<p>
										<span>Вид: </span>
										{categoriesId.species || 'нет'}
									</p>
									<p>
										<span>Статус: </span>
										{categoriesId.status || 'нет'}
									</p>
									<p>
										<span>Тип: </span>
										{categoriesId.type || 'нет'}
									</p>
									{/* {categoriesId && (
										<ul>
											{categoriesId.episode.map(
												(ep) =>
													ep && (
														<li key={ep.id}>
															<Link to={`/characters/${ep}`}>
																{getEpisodeName(ep, categoriesId)}
															</Link>
														</li>
													)
											)}
										</ul>
									)} */}
								</div>
							)}
							{category === 'locations' && (
								<div>
									<p>
										<span>Тип: </span>
										{categoriesId.type || 'нет'}
									</p>
									<p>
										<span>Измерение: </span>
										{categoriesId.dimension || 'нет'}
									</p>
									{/* {categoriesId && (
										<ul>
											{categoriesId.residents.map(
												(res) =>
													res && (
														<li key={categoriesId.id}>
															<Link to={`/locations/${res}`}>
																{getCharacterName(res, categoriesId)}
															</Link>
														</li>
													)
											)}
										</ul>
									)} */}
								</div>
							)}
							{category === 'episodes' && (
								<div>
									<p>
										<span>Номер эпизода: </span>
										{categoriesId.episode || 'нет'}
									</p>
									<p>
										<span>Дата выхода: </span>
										{categoriesId.air_date || 'нет'}
									</p>
									{/* {categoriesId && (
											<ul>
												{categoriesId.characters.map(
													(char) =>
														char && (
															<li key={char.id}>
																<Link to={`/episodes/${char}`}>
																	{getCharacterName(char, categoriesId)}
																</Link>
															</li>
														)
												)}
											</ul>
										)} */}
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
