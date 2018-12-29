const rp = require('request-promise-native')

async function fetchMovie(item) {
	const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}
	`
	const res = await rp(url)
	return res
}
;(async () => {
	let movies = [
		{
			doubanId: 26611804,
			title: '三块广告牌',
			rate: 8.7,
			poster:
				'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2510081688.jpg'
		},
		{
			doubanId: 25716096,
			title: '狗十三',
			rate: 8.3,
			poster:
				'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2540513831.jpg'
		}]
	movies.map(async movie => {
		let movieData = await fetchMovie(movie)
		try{
			movieData = JSON.parse(movieData)
			console.log(movieData.tags)
			console.log(movieData.summary)
		}
		catch (err) {
			console.log(err)
		}
		console.log(movieData)
	})
})()