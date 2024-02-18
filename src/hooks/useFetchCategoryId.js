import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

export function useFetchCategoryId(query, pageNumber) {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [categoriesId, setCategoriesId] = useState({})
	const { category, id } = useParams()
	const [categorySlice, setCategorySlice] = useState(category?.slice(0, -1))
	const navigate = useNavigate()

	useEffect(() => {
		setCategoriesId({})
		setCategorySlice(category?.slice(0, -1))
	}, [category, query])

	useEffect(() => {
		setLoading(true)
		setError(false)

		axios({
			method: 'GET',
			url: `https://rickandmortyapi.com/api/${categorySlice}/${id}`,
		})
			.then((res) => {
				setCategoriesId(res.data)

				setLoading(false)
			})
			.catch((e) => {
				setError(false)
				console.error(e)
				navigate('/')
			})
	}, [category, categorySlice, id, navigate])

	return {
		loading,
		error,
		categoriesId,
		category,
		id,
		pageNumber,
	}
}
