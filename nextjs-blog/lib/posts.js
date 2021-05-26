import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
    //Obter nome dos arquivos em /posts
    const fileNames = fs.readdirSync(postDirectory)
    const allPostsData = fileNames.map(fileName => {
        //Remover .md do nome do arquivo para obter o id
        const id = fileName.replace(/\.md$/, '')

        //Ler o markdown como string 
        const fullPath = path.join(postDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        //Usar o gray-matter para analisar os metadata 
        const matterResult = matter(fileContents)

        //combinando os dados 
        return {
            id,
            ...matterResult.data
        }
    })

    //Classificando por data
    return allPostsData.sort((a, b) => {
        if(a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}