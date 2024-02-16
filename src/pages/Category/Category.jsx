import { useEffect, useState } from 'react'
import { Link, useSearchParams, useParams } from 'react-router-dom'
import { Navigation, CustomSelect } from '../../components'
import { NotFound } from '../../pages'
import styles from './Category.module.css'

export const Category = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const { category } = useParams()
	const sort = searchParams.get('sort')
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function fetchData() {
			try {
				const json = await import('../../db.json')
				const array = json[category]
				setData(array)
				setLoading(false)
			} catch (error) {
				console.error(error)
				setLoading(false)
			}
		}

		fetchData()
	}, [category])

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
		setSearchParams({ sort: value })
	}

	if (category && !['characters', 'locations', 'episodes'].includes(category)) {
		return <NotFound />
	}

	return (
		<div className={styles.Category}>
			<Navigation />
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
			{!data || loading ? (
				<span>Загрузка...</span>
			) : (
				<ul>
					{sortByCreated(data, sort).map((item) => (
						<li key={item.id}>
							<Link to={`/${category}/${item.id}`}>{item.name}</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
