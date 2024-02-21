import { useCallback, useRef, useState, useTransition } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { Component } from '../../components/Component/Component'
import { Button } from '../../components/Button/Button'
import { CustomSelect } from '../../components/CustomSelect/CustomSelect'
import { NotFound } from '../../pages/NotFound/NotFound'
import { useFetchCategory } from '../../hooks'
import styles from './Category.module.css'

export const Category = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const sort = searchParams.get('sort')
	const [query, setQuery] = useState('')
	const [pageNumber, setPageNumber] = useState(1)
	const navigate = useNavigate()
	const [isPending, startTransition] = useTransition()

	const { loading, error, categories, hasMore, category, id } =
		useFetchCategory(query, pageNumber)

	const observer = useRef()
	const lastNodeRef = useCallback(
		(node) => {
			if (loading) return

			if (observer.current) {
				observer.current.disconnect()
			}

			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					setPageNumber((prevState) => prevState + 1)
				}
			})

			if (node) {
				observer.current.observe(node)
			}
		},
		[hasMore, loading]
	)

	const firstNodeRef = useRef()
	const firstNodeObserver = useCallback(
		(node) => {
			if (loading) return

			if (firstNodeRef.current) {
				firstNodeRef.current.disconnect()
			}

			firstNodeRef.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting) {
					setPageNumber(1)
				}
			})

			if (node) {
				firstNodeRef.current.observe(node)
			}
		},
		[loading]
	)

	const sortByCreated = (array, order) => {
		const copy = [...(array || [])]
		copy.sort((a, b) => {
			const dateA = Date.parse(a.created)
			const dateB = Date.parse(b.created)
			if (order === 'ASC') {
				return dateA - dateB
			} else if (order === 'DESC') {
				return dateB - dateA
			} else {
				return 0
			}
		})
		return copy
	}

	const handleChangeSort = (event) => {
		const value = event.target.value
		startTransition(() => {
			setQuery(id)
			setPageNumber(1)
			setSearchParams({ sort: value })
		})
	}

	const handlerScrollUp = () => {
		window.scrollTo(0, 0)
		startTransition(() => {
			setPageNumber(1)
		})
	}

	if (category && !['characters', 'locations', 'episodes'].includes(category)) {
		return <NotFound />
	}

	return (
		<div className={styles.Category}>
			<form>
				<Component
					component={CustomSelect}
					label="Сортировать по дате создания:"
					type="select"
					id="select"
					name="select"
					value={sort || ''}
					onChange={handleChangeSort}
				/>
			</form>
			<ul>
				{sortByCreated(categories, sort).map((item, index) => {
					if (categories.length - 5 === index + 1) {
						return (
							<li ref={lastNodeRef} key={index}>
								<Link to={`/${category}/${item.id}`}>{item.name}</Link>
							</li>
						)
					} else if (index === 0) {
						return (
							<li ref={firstNodeObserver} key={index}>
								<Link to={`/${category}/${item.id}`}>{item.name}</Link>
							</li>
						)
					} else {
						return (
							<li ref={lastNodeRef} key={index}>
								<Link to={`/${category}/${item.id}`}>{item.name}</Link>
							</li>
						)
					}
				})}
				{loading && hasMore && (
					<div style={{ color: 'red', fontSize: '2rem' }}>Loading...</div>
				)}
				{!loading && !hasMore && (
					<div
						style={{
							display: 'flex',
							alignItems: 'end',
							color: 'blue',
							fontSize: '2rem',
							fontWeight: '600',
							textShadow: '-2px 2px 2px black',
						}}
					>
						Конец списка
						<Component
							component={Button}
							title="В начало списка"
							disabled={isPending}
							onClick={handlerScrollUp}
						/>
						<Component
							component={Button}
							title="На главную"
							disabled={isPending}
							onClick={() => navigate('/')}
						/>
						{isPending && <div>Загрузка...</div>}
					</div>
				)}
				{error && <div>Error</div>}
			</ul>
		</div>
	)
}
