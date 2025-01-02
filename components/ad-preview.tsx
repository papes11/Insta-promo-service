'use client'

import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Send, Bookmark, ChevronRight, ChevronLeft, Instagram } from 'lucide-react'
import { useAdState } from '@/app/hooks/useAdState'
import { useState } from 'react'

export default function AdPreview() {
  const { title, description, mediaPreviews } = useAdState()
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)

  const nextMedia = () => {
    setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % mediaPreviews.length)
  }

  const prevMedia = () => {
    setCurrentMediaIndex((prevIndex) => (prevIndex - 1 + mediaPreviews.length) % mediaPreviews.length)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center space-x-4 p-4">
        <Avatar>
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@yourbrand" />
          <AvatarFallback>YB</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-sm font-semibold">Your Brand</p>
          <p className="text-xs text-muted-foreground">Sponsored</p>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {mediaPreviews.length > 0 ? (
          <div className="relative">
            <div className="aspect-square overflow-hidden">
              {mediaPreviews[currentMediaIndex].startsWith('data:image') ? (
                <Image
                  src={mediaPreviews[currentMediaIndex]}
                  alt={`Preview ${currentMediaIndex + 1}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <video src={mediaPreviews[currentMediaIndex]} className="w-full h-full object-cover" controls />
              )}
            </div>
            {mediaPreviews.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full"
                  onClick={prevMedia}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full"
                  onClick={nextMedia}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {mediaPreviews.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1.5 w-1.5 rounded-full ${
                        index === currentMediaIndex ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="aspect-square bg-gray-100 flex items-center justify-center">
            <p className="text-gray-400">Add picture
            <Instagram className="h-20 w-20 text-pink-600" />
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4">
        <div className="flex justify-between w-full mb-2">
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon">
              <Heart className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon">
              <MessageCircle className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon">
              <Send className="h-6 w-6" />
            </Button>
          </div>
          <Button variant="ghost" size="icon">
            <Bookmark className="h-6 w-6" />
          </Button>
        </div>
        <div className="space-y-1">
          <p className="font-semibold">{title || 'Your Ad Title'}</p>
          <p className="text-sm text-muted-foreground">{description || 'Your ad description will appear here.'}</p>
        </div>
      </CardFooter>
    </Card>
  )
}

