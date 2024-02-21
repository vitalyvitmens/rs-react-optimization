import { useState, useTransition } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Component } from '../../components/Component/Component'
import { Button } from '../../components/Button/Button'
import { NotFound } from '../../pages/NotFound/NotFound'
import { useFetchCategoryId } from '../../hooks'
import styles from './Detail.module.css'

export const Detail = () => {
	const [query, setQuery] = useState('')
	const [pageNumber, setPageNumber] = useState(1)
	const [isPending, startTransition] = useTransition()
	const { loading, error, categoriesId, category, id } = useFetchCategoryId(
		query,
		pageNumber
	)
	const navigate = useNavigate()

	if (loading || !categoriesId) {
		return <h2>Loading...</h2>
	}

	if (!categoriesId && !loading) {
		return <NotFound />
	}

	const handleNavigateBack = () => {
		window.scrollTo(0, 0)
		startTransition(() => {
			setQuery(id)
			setPageNumber(1)
			navigate(-1)
		})
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
									<p style={{ fontSize: '1.5rem' }}>
										<span className={styles.name}>Расположение: </span>
										{categoriesId?.location?.name === 'unknown'
											? '🤷'
											: categoriesId?.location?.name || '🤷'}
									</p>
									<Link
										to={`/locations${categoriesId?.location?.url.slice(40)}`}
									>
										{categoriesId?.location?.url.slice(32)}
									</Link>

									{/* <span>Список эпизодов: </span>
									<ul>
										{categoriesId?.episode?.length === 0 ? (
											<span style={{ color: 'red' }}>
												Список эпизодов отсутствует!
											</span>
										) : (
											categoriesId?.episode?.map(
												(episode, index) =>
													episode && (
														<li key={index}>
															<Link to={`/episodes/${episode.slice(40)}`}>
																{episode.slice(32)}
															</Link>
														</li>
													)
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
									<span className={styles.name}>Список жителей: </span>
									<ol>
										{categoriesId?.residents?.length === 0 ? (
											<span style={{ color: 'red' }}>
												Список жителей отсутствует!
											</span>
										) : (
											categoriesId?.residents?.map(
												(resident, index) =>
													resident && (
														<li key={index}>
															<Link to={`/characters/${resident.slice(42)}`}>
																{resident.slice(32)}
															</Link>
														</li>
													)
											)
										)}
									</ol>
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
									<span className={styles.name}>Список персонажей: </span>
									<ol>
										{categoriesId?.characters?.length === 0 ? (
											<span style={{ color: 'red' }}>
												Список персонажей отсутствует!
											</span>
										) : (
											categoriesId?.characters?.map(
												(character, index) =>
													character && (
														<li key={index}>
															<Link to={`/characters/${character.slice(42)}`}>
																{character.slice(32)}
															</Link>
														</li>
													)
											)
										)}
									</ol>
								</div>
							)}
							{error && <div>Error</div>}
						</div>
					</div>
				</div>
			)}
			<Component
				component={Button}
				title="Вернуться назад к списку"
				disabled={isPending}
				onClick={handleNavigateBack}
			/>
			{isPending && <div>Загрузка...</div>}
		</div>
	)
}
