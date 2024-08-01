"use client"
import { useState, useEffect, ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input} from "@/components/ui/input"
interface Emoji {
    char: string
    name: string
}

const TextBox = () => {
    const [inputText, setInputText] = useState('')    
    const [emojis, setEmojis] = useState<Emoji[]>([])
    const [suggestions, setSuggestions] = useState<Emoji[]>([])


    useEffect(() => {
        setEmojis([
            { char: '😀', name: 'grinning face' },
            { char: '😂', name: 'face with tears of joy' },
            { char: '🤔', name: 'thinking face' },
            { char: '👍', name: 'thumbs up' },
            { char: '❤️', name: 'red heart' },
            { char: '🎉', name: 'party popper' }
          ]);
    }, [])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value)
        const filtered = emojis.filter(emoji => emoji.char.includes(e.target.value))
        setSuggestions(filtered)
    }

    const insertEmoji = (emoji: Emoji) => {
        setInputText(prevText => prevText + emoji.char)
    }
    return (
        <div className="p-4">
          <Input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Type here..."
            className="mb-4"
          />
          <div className="flex flex-wrap gap-2 mb-4">
            {emojis.map((emoji, index) => (
              <Button 
                key={index} 
                onClick={() => insertEmoji(emoji)} 
                title={emoji.name} 
                variant="outline"
              >
                {emoji.char}
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
                    title={emoji.name} 
                    variant="outline"
                  >
                    {emoji.char}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      );
}

export default TextBox