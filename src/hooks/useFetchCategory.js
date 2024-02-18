import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

export function useFetchCategory(query, pageNumber) {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [categories, setCategories] = useState([])
	const [hasMore, setHasMore] = useState(true)
	const { category, id } = useParams()
	const [categorySlice, setCategorySlice] = useState(category?.slice(0, -1))
	const navigate = useNavigate()
	// console.log(`####: categories.${category} from useFetchCategory`, categories)

	useEffect(() => {
		setCategories([])
		setCategorySlice(category?.slice(0, -1))
	}, [category, query])

	useEffect(() => {
		setLoading(true)
		setError(false)

		let cancel
		axios({
			method: 'GET',
			url: `https://rickandmortyapi.com/api/${categorySlice}`,
			params: { q: query, page: pageNumber },
			cancelToken: new axios.CancelToken((c) => (cancel = c)),
		})
			.then((res) => {
				setCategories((prevState) => {
					return [...new Set([...prevState, ...res.data.results])]
				})

				setHasMore(res.data.results.length > 0 && res.data.info.next !== null)
				setLoading(false)
				// console.log('####: res', res.data.results)
			})
			.catch((e) => {
				if (axios.isCancel(e)) {
					return
				}

				setError(false)
				console.error(e)
				navigate('/')
			})

		return () => cancel()
	}, [category, categorySlice, navigate, pageNumber, query])

	return {
		loading,
		error,
		categories,
		hasMore,
		category,
		id,
		pageNumber,
	}
}
