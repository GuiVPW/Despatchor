import { createWriteStream, unlinkSync } from 'fs'
import path from 'path'
import sharp from 'sharp'
import { Stream } from 'stream'

interface Props {
	stream: Stream
	folder: 'users' | 'posts'
	filename: string
	id: string
}

export const storeUpload = async ({
	stream,
	filename,
	id,
	folder
}: Props): Promise<{ path: string }> => {
	let ext: string[] | string = filename.split('.')
	ext = ext[ext.length - 1]
	const storedIn = path.join(__dirname, `../../../../uploads/${folder}`, `${id}.${ext}`)
	const tempFile = path.join(__dirname, '../../../../uploads/temp', `${id}.${ext}`)

	return new Promise((resolve, reject) =>
		stream
			.pipe(createWriteStream(tempFile))
			.on('finish', async () => {
				await sharp(tempFile)
					.resize(1920, 1080, {
						fit: 'cover'
					})
					.jpeg({ quality: 70 })
					.toFile(storedIn)
				unlinkSync(tempFile)
				resolve({ path: `uploads/${folder}/${id}.${ext}` })
			})
			.on('error', reject)
	)
}
