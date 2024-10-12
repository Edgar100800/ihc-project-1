"use client";

import React, { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import QRCodeGenerator from './QRCodeGenerator'

function MediaDescriptionContent() {
  const searchParams = useSearchParams();
  const itemId = searchParams.get("itemId");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Item ID: {itemId}</h1>
      {itemId && (
        <div className="mt-4">
          <QRCodeGenerator value={itemId} />
        </div>
      )}
    </div>
  )
}

function MediaDescription() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MediaDescriptionContent />
    </Suspense>
  )
}

export default MediaDescription
