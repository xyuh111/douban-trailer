// let movies
// [
// 	{
// 		video: 'http://vt1.doubanio.com/201812291815/a6a0baa7c7bfdb3a5224f4be9dacc433/view/movie/M/402360635.mp4',
// 		doubanId: '4864908',
// 		poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2530513100.jpg'
// 		cover: 'https://img3.doubanio.com/img/trailer/medium/2534551851.jpg?'
// 	}
// ]

// http://web.web3n.com/Dkl4qg0GYuz83H5AHg51Z.jpg
// http://web.web3n.com/fLnr3a0H4RBMoOsm6iR6e.jpg
// http://web.web3n.com/bIflAhZv00cLUMmo0AvcN.mp4

const qiniu = require("qiniu");
const nanoid = require('nanoid') //生成一个本地资源的文件名

const config = require('../config/index')

const bucket = config.bucket;

const mac = new qiniu.auth.digest.Mac(config.accessKey, config.secretKey)

const cfg = new qiniu.conf.Config()
const client = new qiniu.rs.BucketManager(mac, cfg)

const uploadToQiniu = async (url, key) => {
		return new Promise((resolve, reject) => {
			client.fetch(url, bucket, key, (err, ret, info) => {
				if (err) {
					reject(err)
				} else {
					if (info.statusCode === 200) {
						resolve({key})
						console.log(key)
					} else {
						reject(info)
						console.log(info)
					}
				}
			})
		})
	}
;(async () => {
	let movies = [{
		video: 'http://vt1.doubanio.com/201812291815/a6a0baa7c7bfdb3a5224f4be9dacc433/view/movie/M/402360635.mp4',
		doubanId: '4864908',
		poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2530513100.jpg',
		cover: 'https://img3.doubanio.com/img/trailer/medium/2534551851.jpg'
	}]

	movies.map(async movie => {
		if (movie.video && !movie.key) {
			try {
				console.log('正在传 video')
				let videoData = uploadToQiniu(movie.video, nanoid() + '.mp4')

				console.log('正在传 cover')
				let coverData = uploadToQiniu(movie.cover, nanoid() + '.jpg')

				console.log('正在传 poster')
				let posterData = uploadToQiniu(movie.poster, nanoid() + '.jpg')
				if (videoData.key) {
					movie.videoKey = videoData.key
				}
				if (coverData.key) {
					movie.videoKey = videoData.key
				}
				if (posterData.key) {
					movie.videoKey = videoData.key
				}
				console.log(movie)
			} catch (err) {
				console.log(err)
			}
		}
	})
})()