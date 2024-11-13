import path from 'path'
import fs from 'node:fs'

export default defineEventHandler(async (event) => {
  const pathParam = getRouterParam(event, 'path');
  if (!pathParam) throw new Error('Path must be provided!');
  const filePath = path.resolve('questionsFile/', pathParam);
  if (!fs.existsSync(filePath)) throw new Error('Wrong path');
  return sendStream(event, fs.createReadStream(filePath))
})
