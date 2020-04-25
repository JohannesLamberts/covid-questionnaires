import { jwt } from './identity'

// https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
function b64DecodeUnicode(str: string) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(
    atob(str)
      .split('')
      .map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )
}

async function gitApiCall(path: string, init: Partial<RequestInit> = {}) {
  return await fetch(`.netlify/git/github/${path}`, {
    headers: {
      Authorization: `Bearer ${jwt()}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...init.headers
    },
    ...init
  }).then((res) => res.json())
}

export async function readFile(path: string) {
  const response = await gitApiCall(`contents/${path}?ref=test-api`)
  return {
    ...response,
    content: b64DecodeUnicode(response.content)
  }
}

export function writeFile(
  path: string,
  { content, message, sha }: { content: string; message: string; sha?: string }
) {
  return gitApiCall(`contents/${path}`, {
    method: 'PUT',
    body: JSON.stringify({
      message,
      content: btoa(content),
      sha,
      branch: 'test-api'
    })
  })
}
