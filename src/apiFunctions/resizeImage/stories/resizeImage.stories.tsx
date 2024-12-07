import React, { useState } from 'react'
import AsyncTester from '@useweb/async-tester'
import FileInput from '@useweb/ui/FileInput'
import Form from '@useweb/ui/Form'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'
import Image from '@useweb/ui/Image'

import resizeImage, { type ResizeImageProps } from '../resizeImage.client.js'

export default {
  title: 'Cloud Functions/next/resizeImage',
  parameters: {
    signInAs: false,
  },
}

export const Default = () => {
  const [originalImage, setOriginalImage] =
    useState<ImageInfoProps['imageData']>(undefined)

  return (
    <AsyncTester<any, ResizeImageProps>
      // if using triggerComponent change to async(fnArgs)=> fetcher(fnArgs)
      fn={async (fnArgs) => resizeImage(fnArgs)}
      triggerComponent={({ exec }) => (
        <Form onSubmit={() => null}>
          <FileInput
            name='fileInput'
            sx={{
              width: '100%',
            }}
            inputProps={{
              accept: 'image/*',
            }}
            label='Resize Image'
            onFileInput={async (props) => {
              const fileToUpload = props.files?.[0]

              setOriginalImage(fileToUpload)

              if (fileToUpload) {
                exec({
                  file: fileToUpload,
                  width: 300,
                  height: 300,
                })
              }
            }}
          />
        </Form>
      )}
      resultComponent={({ result }) => {
        const optimizedImage = result.data.resizedImage
        const sizeDiff = (originalImage?.size as number) - optimizedImage.size

        return (
          <>
            <Box
              data-id='Diff'
              sx={{
                display: 'flex',
                gap: 1,
              }}
            >
              <Text text={`Size reduction:`} tag='p' sx={{}} />
              <Text
                text={sizeToMB({
                  bytes: sizeDiff,
                })}
                tag='p'
                sx={{}}
              />
            </Box>
            <Box
              sx={{
                display: 'grid',
                gridAutoFlow: 'column',
                gap: '20px',
              }}
            >
              <ImageInfo title='Original Image' imageData={originalImage} />
              <ImageInfo
                title='Optimized Image'
                key={optimizedImage.name}
                imageData={optimizedImage}
              />
            </Box>
          </>
        )
      }}
    />
  )
}
const sizeToMB = (props: { bytes: number }) => {
  const decimals = 1
  const bytes = props.bytes
  const K_UNIT = 1024
  const SIZES = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB']

  if (bytes == 0) return '0 Byte'

  const i = Math.floor(Math.log(bytes) / Math.log(K_UNIT))
  const resp =
    parseFloat((bytes / Math.pow(K_UNIT, i)).toFixed(decimals)) + ' ' + SIZES[i]

  return resp
}

type ImageInfoProps = {
  title?: string
  imageData?: File
}

const ImageInfo = (props: ImageInfoProps) => {
  return (
    <Box data-id='ImageInfo' sx={{}}>
      <Text text={props.title} />
      {props.imageData && (
        <Image
          src={URL.createObjectURL(props.imageData)}
          alt={`alt`}
          width={200}
          height={200}
        />
      )}

      <Info title='Name' value={props?.imageData?.name} />
      <Info
        title='File size'
        value={sizeToMB({
          bytes: props?.imageData?.size as number,
        })}
      />
    </Box>
  )
}

const Info = (props: { title: string; value: string | undefined | number }) => {
  return (
    <Box
      data-id='Info'
      sx={{
        display: 'flex',
        gap: 2,
      }}
    >
      <Text text={`${props.title}:`} tag='p' sx={{}} />
      <Text text={props.value} tag='p' sx={{}} />
    </Box>
  )
}
