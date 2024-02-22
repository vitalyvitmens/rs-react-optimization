// В файле useScrollPosition.js
import { useState, useLayoutEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

// Хук useScrollPosition принимает параметр restore, который указывает, нужно ли восстанавливать позицию прокрутки при монтировании компонента
export function useScrollPosition(restore = true) {
	// Используем хук useSearchParams, чтобы получить и установить параметр scroll в URL
	const [searchParams, setSearchParams] = useSearchParams()
	// Получаем значение параметра scroll из URL или 0, если его нет
	const scroll = Number(searchParams.get('scroll')) || 0
	// Создаем локальное состояние для хранения позиции прокрутки
	const [scrollPosition, setScrollPosition] = useState(scroll)

	// При изменении позиции прокрутки, обновляем локальное состояние и параметр scroll в URL
	useLayoutEffect(() => {
		const handleScroll = () => {
			const currentScroll = window.scrollY
			setScrollPosition(currentScroll)
			setSearchParams({ scroll: currentScroll })
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [setSearchParams])

	// При монтировании компонента, если параметр restore равен true, прокручиваем окно до сохраненной позиции
	useLayoutEffect(() => {
		if (restore) {
			window.scrollTo(0, scrollPosition)
		}
	}, [restore, scrollPosition])

	// Возвращаем позицию прокрутки и функцию для ее установки
	return [scrollPosition, setScrollPosition]
}
