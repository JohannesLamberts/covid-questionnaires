import { jwt } from './identity'

async function gitApiCall(path: string) {
  return await fetch(`.netlify/git/github/${path}`, {
    headers: {
      Authorization: `Bearer ${jwt()}`
    }
  }).then((res) => res.json())
}

export async function readFile(path: string) {
  const { content } = await gitApiCall(`contents/${path}`)
  return {
    content: atob(content)
  }
}
