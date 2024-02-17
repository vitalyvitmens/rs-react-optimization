import { useCallback, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CustomSelect } from '../../components'
import { NotFound } from '../../pages'
import { useFetchCategory } from '../../hooks'
import styles from './Category.module.css'

export const Category = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const sort = searchParams.get('sort')
	const [query, setQuery] = useState('')
	const [pageNumber, setPageNumber] = useState(3)

	const { loading, error, categories, hasMore, category, id } =
		useFetchCategory(query, pageNumber)
	console.log('####: categories', categories)

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
					console.log('####: VISIBLE')
				}
			})

			if (node) {
				observer.current.observe(node)
			}

			console.log('####: node', node)
		},
		[hasMore, loading]
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
		setQuery(id)
		setPageNumber(1)
		setSearchParams({ sort: value })
	}

	if (category && !['characters', 'locations', 'episodes'].includes(category)) {
		return <NotFound />
	}

	return (
		<div className={styles.Category}>
			<form>
				<CustomSelect
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
							<li ref={lastNodeRef} key={item.id}>
								<Link style={{ color: 'green' }} to={`/${category}/${item.id}`}>
									{item.name}
								</Link>
							</li>
						)
					} else {
						return (
							<li key={item.id}>
								<Link style={{ color: 'red' }} to={`/${category}/${item.id}`}>
									{item.name}
								</Link>
							</li>
						)
					}
				})}
				{loading && hasMore && (
					<div style={{ color: 'red', fontSize: '3rem' }}>Loading...</div>
				)}
				{!loading && !hasMore && (
					<div style={{ color: 'blue', fontSize: '3rem' }}>Конец списка</div>
				)}
				{error && <div>Error</div>}
			</ul>
		</div>
	)
}
