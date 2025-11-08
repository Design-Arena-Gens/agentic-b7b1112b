import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { data, style } = await req.json()
  const openaiKey = process.env.OPENAI_API_KEY
  const geminiKey = process.env.GEMINI_API_KEY

  if (!openaiKey && !geminiKey) {
    // No keys available; let client fallback to local template
    return NextResponse.json({ text: null })
  }

  try {
    // Prefer OpenAI if available
    if (openaiKey) {
      const prompt = buildPrompt(data, style)
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You are a world-class biographer. Compose a coherent, warm, well-structured autobiography draft based on structured notes. Keep it 800-1500 words.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.8
        })
      })
      const json = await res.json()
      const text = json?.choices?.[0]?.message?.content ?? null
      return NextResponse.json({ text })
    }

    // Gemini fallback
    const prompt = buildPrompt(data, style)
    const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=' + geminiKey, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: prompt }] }] })
    })
    const json = await res.json()
    const text = json?.candidates?.[0]?.content?.parts?.[0]?.text ?? null
    return NextResponse.json({ text })
  } catch (e) {
    return NextResponse.json({ text: null })
  }
}

function buildPrompt(data: any, style: string) {
  return `Write an autobiography in a ${style} style with sections:\n` +
  `Personal: ${JSON.stringify(data.personal)}\n` +
  `Childhood: ${data.childhood.content}\n` +
  `Education: ${data.education.content}\n` +
  `Career: ${data.career.content}\n` +
  `Family: ${data.family.content}\n` +
  `Challenges: ${data.challenges.content}\n` +
  `Dreams: ${data.dreams.content}\n` +
  `Timeline: ${data.timeline.map((e: any) => `${e.date} ${e.title}: ${e.description}`).join(' | ')}`
}
