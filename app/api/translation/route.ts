import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { prompt, originalLanguage, translateLanguage } = body as {
      prompt: string
      originalLanguage: string
      translateLanguage: string
    }

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!openai.apiKey) {
      return new NextResponse('OpenAI API key not configured', {
        status: 500,
      })
    }

    if (!prompt || !translateLanguage) {
      return new NextResponse('Missing fields', { status: 400 })
    }

    let promptMessage = `Translate the following text to 
    ${translateLanguage}:\n
    ${prompt}`

    if (originalLanguage) {
      promptMessage = `Translate the following text from ${originalLanguage}
       to ${translateLanguage}:\n
      ${prompt}`
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages: [
        {
          role: 'user',
          content: promptMessage,
        },
      ],
    })
    console.log('[TRANSLATION_RESPONSE]', response)
    const stream = OpenAIStream(response)

    return new StreamingTextResponse(stream)
  } catch (error) {
    console.log('[TRANSLATION_ERROR]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
