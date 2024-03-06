import { useCallback, useRef, useState, useTransition } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Component } from '../../components/Component/Component'
import { Button } from '../../components/Button/Button'
import { Error } from '../../components/Error/Error'
import { CategoryList } from './components/CategoryList/CategoryList'
import { CustomSelect } from '../../components/CustomSelect/CustomSelect'
import { NotFound } from '../../pages/NotFound/NotFound'
import { useFetchCategory } from '../../hooks/useFetchCategory'
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

	const lastNodeObserver = useRef()
	const lastNodeRef = useCallback(
		(node) => {
			if (loading) return

			if (lastNodeObserver.current) {
				lastNodeObserver.current.disconnect()
			}

			lastNodeObserver.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					setPageNumber((prevState) => prevState + 1)
				}
			})

			if (node) {
				lastNodeObserver.current.observe(node)
			}
		},
		[hasMore, loading]
	)

	const firstNodeObserver = useRef()
	const firstNodeRef = useCallback(
		(node) => {
			if (loading) return

			if (firstNodeObserver.current) {
				firstNodeObserver.current.disconnect()
			}

			firstNodeObserver.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting) {
					setPageNumber(1)
				}
			})

			if (node) {
				firstNodeObserver.current.observe(node)
			}
		},
		[loading]
	)

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
		startTransition(() => {})
	}

	const isCharacter = category === 'characters'

	if (error) {
		return <Error />
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
			<CategoryList
				category={category}
				categories={categories}
				sort={sort}
				isCharacter={isCharacter}
				lastNodeRef={lastNodeRef}
				firstNodeRef={firstNodeRef}
			/>
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
		</div>
	)
}
