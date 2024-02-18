import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

export function useFetchCategoryId(query, pageNumber) {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [categoriesId, setCategoriesId] = useState([])
	const [hasMore, setHasMore] = useState(true)
	const { category, id } = useParams()
	const [categorySlice, setCategorySlice] = useState(category?.slice(0, -1))
	const navigate = useNavigate()
	console.log(
		`####: categories.${category} from useFetchCategoryId`,
		categoriesId
	)
	// console.log(`####: id from useFetchCategoryId`, id)

	// useEffect(() => {
	// 	setCategoriesId([])
	// 	setCategorySlice(category?.slice(0, -1))
	// }, [category, query])

	useEffect(() => {
		setLoading(true)
		setError(false)

		let cancel
		axios({
			method: 'GET',
			url: `https://rickandmortyapi.com/api/${categorySlice}/${id}`,
			params: { q: query, page: pageNumber },
			cancelToken: new axios.CancelToken((c) => (cancel = c)),
		})
			.then((res) => {
				setCategoriesId(res.data)

				// setHasMore(res.data.results.length > 0 && res.data.info.next !== null)
				setLoading(false)
				console.log('####: res.data from useFetchCategoryId', res.data)
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
	}, [category, categorySlice, id, navigate, pageNumber, query])

	return {
		loading,
		error,
		categoriesId,
		hasMore,
		category,
		id,
		pageNumber,
	}
}
