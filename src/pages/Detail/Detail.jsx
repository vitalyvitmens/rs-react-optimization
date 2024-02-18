import { useNavigate } from 'react-router-dom'
import { Button } from '../../components'
import { NotFound } from '../../pages'
import { useFetchCategoryId } from '../../hooks'
import styles from './Detail.module.css'

export const Detail = () => {
	const { loading, error, categoriesId, category } = useFetchCategoryId()
	const navigate = useNavigate()

	if (loading || !categoriesId) {
		return <h2>Loading...</h2>
	}

	if (!categoriesId && !loading) {
		return <NotFound />
	}
	console.log(`####: categoriesId.${category} from Detail`, categoriesId)

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
						<div className={styles.name}>{categoriesId.name || '🤷'}</div>
						<div className={styles.body}>
							{category === 'characters' && (
								<div key={categoriesId.id}>
									<p>
										<span>Пол: </span>
										{categoriesId.gender === 'unknown'
											? '🤷'
											: categoriesId.gender || '🤷'}
									</p>
									<p>
										<span>Вид: </span>
										{categoriesId.species === 'unknown'
											? '🤷'
											: categoriesId.species || '🤷'}
									</p>
									<p>
										<span>Статус: </span>
										{categoriesId.status === 'unknown'
											? '🤷'
											: categoriesId.status || '🤷'}
									</p>
									<p>
										<span>Тип: </span>
										{categoriesId.type === 'unknown'
											? '🤷'
											: categoriesId.type || '🤷'}
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
										{categoriesId.type === 'unknown'
											? '🤷'
											: categoriesId.type || '🤷'}
									</p>
									<p>
										<span>Измерение: </span>
										{categoriesId.dimension === 'unknown'
											? '🤷'
											: categoriesId.dimension || '🤷'}
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
										{categoriesId.episode === 'unknown'
											? '🤷'
											: categoriesId.episode || '🤷'}
									</p>
									<p>
										<span>Дата выхода: </span>
										{categoriesId.air_date === 'unknown'
											? '🤷'
											: categoriesId.air_date || '🤷'}
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
							{error && <div>Error</div>}
						</div>
					</div>
				</div>
			)}
			<Button onClick={() => navigate(-1)}>Вернуться назад к списку</Button>
		</div>
	)
}
