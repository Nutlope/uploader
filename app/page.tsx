'use client';

import { UrlBuilder } from '@bytescale/sdk';
import { UploadDropzone } from '@bytescale/upload-widget-react';
import { useState } from 'react';

const options = {
  apiKey: !!process.env.NEXT_PUBLIC_BYTESCALE_API_KEY
    ? process.env.NEXT_PUBLIC_BYTESCALE_API_KEY
    : 'free',
  maxFileCount: 1,
  // mimeTypes: ['application/pdf'],
  editor: { images: { crop: false } },
};

export default function Home() {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  return (
    <div className="prose p-10 mt-20 mx-auto">
      <h1 className="text-center">Uploader app</h1>
      <UploadDropzone
        options={options}
        onUpdate={({ uploadedFiles }) => {
          if (uploadedFiles.length !== 0) {
            const pdf = uploadedFiles[0];
            const imageName = pdf.originalFile.file.name;
            const imageUrl = UrlBuilder.url({
              accountId: pdf.accountId,
              filePath: pdf.filePath,
            });
            setName(imageName);
            setUrl(imageUrl);
          }
        }}
        onComplete={() => console.log('done')}
        width="670px"
        height="250px"
      />
      {name && url && (
        <div className="mt-5">
          <div>
            <b>Name:</b> {name}
          </div>
          <div>
            <b>Link to PDF:</b>{' '}
            <a href={url} className="text-sm">
              {url}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
