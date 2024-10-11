"use client"
import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Upload } from "lucide-react"

function UploadImage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const searchParams = useSearchParams()
  const mediaId = searchParams.get('itemId')

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleSubmit = async () => {
    if (!file || !mediaId) return

    try {
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => resolve(e.target?.result as string)
        reader.onerror = (e) => reject(e)
        reader.readAsDataURL(file)
      })

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/images`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mediaId,
          file: {
            name: file.name,
            type: file.type,
            base64Data,
          },
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to upload image')
      }

      const data = await response.json()
      console.log('Image uploaded successfully:', data)
      // You might want to update the UI or state here to reflect the successful upload
    } catch (error) {
      console.error('Error uploading image:', error)
      // Handle error (e.g., show an error message to the user)
    }
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Upload className="mr-2 h-4 w-4" /> Upload Image
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Image</DialogTitle>
            <DialogDescription>
              Choose an image file to upload to your dashboard.
            </DialogDescription>
          </DialogHeader>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="image-upload">Image</Label>
            <Input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} />
          </div>
          {uploadedImage && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Preview:</h3>
              <img src={uploadedImage} alt="Uploaded" className="max-w-full h-auto rounded-lg" />
            </div>
          )}
          <Button onClick={handleSubmit} disabled={!file}>Upload</Button>
        </DialogContent>
      </Dialog>

      {uploadedImage && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Uploaded Image:</h2>
          <img src={uploadedImage} alt="Uploaded" className="max-w-full h-auto rounded-lg shadow-md" />
        </div>
      )}
    </div>
  )
}

export default UploadImage
