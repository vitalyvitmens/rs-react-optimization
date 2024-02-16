import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Button, Navigation } from '../../components'
import { NotFound } from '../../pages'
import { getCharacterName, getEpisodeName } from '../../utils'
import styles from './Detail.module.css'

export const Detail = () => {
	const { category, id } = useParams()
	const navigate = useNavigate()
	const [data, setData] = useState({})
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function fetchData() {
			try {
				const json = await import('../../db.json')
				const item = json[category]
					? json[category].find((item) => item.id === Number(id))
					: null
				setData(item)
				setLoading(false)
			} catch (error) {
				console.error(error)
				setLoading(false)
			}
		}

		fetchData()
	}, [category, id])

	if (!data && !loading) {
		return <NotFound />
	}

	return (
		<div className={styles.Detail}>
			<Navigation />
			{!data || loading ? (
				<span>Загрузка...</span>
			) : (
				<div className={styles.row}>
					{data.image && <img src={data.image} alt={data.name} />}
					<div className={styles.column}>
						<div className={styles.name}>{data.name}</div>
						<div className={styles.body}>
							{category === 'characters' && (
								<div>
									<p>
										<span>Пол: </span>
										{data.gender || 'нет'}
									</p>
									<p>
										<span>Вид: </span>
										{data.species || 'нет'}
									</p>
									<p>
										<span>Статус: </span>
										{data.status || 'нет'}
									</p>
									<p>
										<span>Тип: </span>
										{data.type || 'нет'}
									</p>
									{data.episode && data.episode.length > 0 && (
										<ul>
											{data.episode.map(
												(ep) =>
													ep && (
														<li key={ep}>
															<Link to={`/characters/${ep}`}>
																{getEpisodeName(ep)}
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
										{data.type || 'нет'}
									</p>
									<p>
										<span>Измерение: </span>
										{data.dimension || 'нет'}
									</p>
									{data.residents && data.residents.length > 0 && (
										<ul>
											{data.residents.map(
												(res) =>
													res && (
														<li key={res}>
															<Link to={`/locations/${res}`}>
																{getCharacterName(res)}
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
										{data.episode || 'нет'}
									</p>
									<p>
										<span>Дата выхода: </span>
										{data.air_date || 'нет'}
									</p>
									{data.characters && data.characters.length > 0 && (
										<ul>
											{data.characters.map(
												(char) =>
													char && (
														<li key={char}>
															<Link to={`/episodes/${char}`}>
																{getCharacterName(char)}
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
