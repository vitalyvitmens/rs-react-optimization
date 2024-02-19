import { useNavigate, Link } from 'react-router-dom'
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

	return (
		<div className={styles.Detail}>
			{!categoriesId || loading ? (
				<span>Загрузка...</span>
			) : (
				<div className={styles.row}>
					{categoriesId?.image && (
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
									<span>Список эпизодов: </span>
									{/* <ul>
										{categoriesId?.episode?.map(
											(episode, index) =>
												episode && (
													<li key={index}>
														<Link to={`/episodes/${episode.slice(40)}`}>
															{episode}
														</Link>
													</li>
												)
										)}
									</ul> */}
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
									<span>Список жителей: </span>
									<ul>
										{categoriesId?.residents?.map(
											(resident, index) =>
												resident && (
													<li key={index}>
														<Link to={`/characters/${resident.slice(42)}`}>
															{resident}
														</Link>
													</li>
												)
										)}
									</ul>
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
									<span>Список персонажей: </span>
									<ul>
										{categoriesId?.characters?.map(
											(character, index) =>
												character && (
													<li key={index}>
														<Link to={`/characters/${character.slice(42)}`}>
															{character}
														</Link>
													</li>
												)
										)}
									</ul>
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
