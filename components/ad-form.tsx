'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { postAd } from '@/app/actions/post-ad'
import { Camera, Upload, X } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { useAdState } from '@/app/hooks/useAdState'

export default function AdForm() {
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { title, description, mediaPreviews, resetState } = useAdState()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const response = await postAd(formData)

    setIsLoading(false)

    if (response.success) {
      toast({
        title: "Ad Posted Successfully!",
        description: "Your ad has been posted to Instagram.",
      })
      resetState()
      if (fileInputRef.current) fileInputRef.current.value = ''
    } else {
      toast({
        title: "Error",
        description: "There was an error posting your ad. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newPreviews: string[] = []
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          newPreviews.push(reader.result as string)
          if (newPreviews.length === files.length) {
            useAdState.setState({ mediaPreviews: newPreviews })
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleCameraCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const removeMedia = (index: number) => {
    const updatedPreviews = mediaPreviews.filter((_, i) => i !== index)
    useAdState.setState({ mediaPreviews: updatedPreviews })
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Ad Title</Label>
        <Input 
          id="title" 
          name="title" 
          value={title}
          onChange={(e) => useAdState.setState({ title: e.target.value })}
          required 
        />
      </div>
      <div>
        <Label htmlFor="description">Ad Description</Label>
        <Textarea 
          id="description" 
          name="description" 
          value={description}
          onChange={(e) => useAdState.setState({ description: e.target.value })}
          required 
        />
      </div>
      <div>
        <Label>Media</Label>
        <div className="flex space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Media
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleCameraCapture}
          >
            <Camera className="w-4 h-4 mr-2" />
            Take Photo/Video
          </Button>
          <Input
            type="file"
            id="media"
            name="media"
            accept="image/*,video/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleMediaUpload}
            multiple
            capture="environment"
          />
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {mediaPreviews.map((preview, index) => (
            <div key={index} className="relative">
              {preview.startsWith('data:image') ? (
                <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-auto rounded-lg" />
              ) : (
                <video src={preview} className="w-full h-auto rounded-lg" controls />
              )}
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1"
                onClick={() => removeMedia(index)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Posting..." : "Post Ad to Instagram"}
      </Button>
    </form>
  )
}

