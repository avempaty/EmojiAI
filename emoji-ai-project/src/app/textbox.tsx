"use client"
import { useState, useEffect, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChatGPT } from "@/pages/apis/chatGPT"
interface Emoji {
  char: string
  name: string
}

const TextBox = () => {
  const chatGPT = new ChatGPT()
  const [inputText, setInputText] = useState('')
  const [emojis, setEmojis] = useState<string[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])


  useEffect(() => {
    /*setEmojis([
        { char: '😀', name: 'grinning face' },
        { char: '😂', name: 'face with tears of joy' },
        { char: '🤔', name: 'thinking face' },
        { char: '👍', name: 'thumbs up' },
        { char: '❤️', name: 'red heart' },
        { char: '🎉', name: 'party popper' }
      ]);*/
    setEmojis(['😀', '😂', '🤔', '👍', '❤️', '🎉'])
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    //setInputText(inputText)
    try {
      let res = await chatGPT.enhanceEmojiExperience(inputText)
      setSuggestions(res)
    } catch (error) {
      console.error("Error:", error)
    }
    //const filtered = emojis.filter(emoji => emoji.char.includes(e.target.value))
  }

  const insertEmoji = (emoji: string) => {
    setInputText(prevText => prevText + emoji)
  }
  return (
    <div className="p-4">
      <div className="flex flex-row gap-2 mb-4">
        <Input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type here..."
          className="mb-4"
        />
        <Button
          onClick={handleSubmit}
          title="submit"
        >
          Submit
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {emojis.map((emoji, index) => (
          <Button
            key={index}
            onClick={() => insertEmoji(emoji)}
            title={emoji}
            variant="outline"
          >
            {emoji}
          </Button>
        ))}
      </div>
      {suggestions.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Suggestions:</h3>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((emoji, index) => (
              <Button
                key={index}
                onClick={() => insertEmoji(emoji)}
                title={emoji}
                variant="outline"
              >
                {emoji}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TextBox