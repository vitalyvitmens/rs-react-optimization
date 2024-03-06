import { Link } from 'react-router-dom'
import { PRELOAD_THRESHOLD } from '../../../../constants/preloadThreshold'
import { ImgStyleCategoryList } from '../../../../constants/imgStyleCategoryList'

export const CategoryList = ({
	category,
	categories,
	sort,
	isCharacter,
	lastNodeRef,
	firstNodeRef,
}) => {
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

	return (
		<ol style={{ marginLeft: '2rem' }}>
			{sortByCreated(categories, sort).map((item, index) => {
				if (categories.length - PRELOAD_THRESHOLD === index + 1) {
					return (
						<li ref={lastNodeRef} key={index}>
							<Link to={`/${category}/${item.id}`}>
								{isCharacter && (
									<img
										style={ImgStyleCategoryList}
										src={item.image}
										alt={item.name}
									/>
								)}
								{item.name}
							</Link>
						</li>
					)
				} else if (index === 0) {
					return (
						<li ref={firstNodeRef} key={index}>
							<Link to={`/${category}/${item.id}`}>
								{isCharacter && (
									<img
										style={ImgStyleCategoryList}
										src={item.image}
										alt={item.name}
									/>
								)}
								{item.name}
							</Link>
						</li>
					)
				} else {
					return (
						<li key={index}>
							<Link to={`/${category}/${item.id}`}>
								{isCharacter && (
									<img
										style={ImgStyleCategoryList}
										src={item.image}
										alt={item.name}
									/>
								)}
								{item.name}
							</Link>
						</li>
					)
				}
			})}
		</ol>
	)
}
