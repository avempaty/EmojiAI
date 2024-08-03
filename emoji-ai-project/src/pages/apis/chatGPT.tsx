import ApiClient from "simple-api-client"
import OpenAI from "openai"
//Temporary API KEY right here
const NEXT_PUBLIC_OPENAI_API_KEY = ''

export class ChatGPT {
    openai: OpenAI
    constructor() {
        this.openai = new OpenAI({ apiKey: NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true })
    }

    async enhanceEmojiExperience(currentContext: string) {
        const stream = await this.openai.chat.completions.create({
            model: "gpt-3.5-turbo-0125",
            messages: [{
                role: "user", content: `Can you take this sentence and 
            give me better emoji suggestions? Sentence: ${currentContext}`
            }],
            stream: true,
        });
        let result = []
        for await (const chunk of stream) {
            console.log(chunk)
            result.push(chunk.choices[0]?.delta?.content || "");
        }
        return result
    }
}

