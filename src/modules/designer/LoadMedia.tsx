import { Dispatch, SetStateAction, UIEvent } from 'react';
import { Dialog } from 'primereact/dialog';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import axios from 'axios';
import useSWRInfinite from 'swr/infinite';
import imageSize from '@/utils/imageSize';
import calculateScrollProgress from '@/utils/calculateScrollProgress';
import { Button } from 'primereact/button';

const PAGE_SIZE = 12;

export type LoadMediaProps = {
  display?: boolean
  setDisplay?: Dispatch<SetStateAction<boolean>>
  onSelect?: (media: Media) => void
}

export type Media = {
  id: number
  userId: string
  url: string
  name: string
  originalFilename: string
  contentType: string
  metadata: MediaMetadata
  createdAt: Date
  updatedAt: Date
  version: number
}

export type MediaMetadata = Record<'width' | 'height' | 'alt' | string, string | number | boolean>

export const LoadMedia = ({ display, setDisplay, onSelect }: LoadMediaProps) => {
  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite<Array<Media>>(
    (index) => `http://localhost:8080/medias?page=${index}&size=${PAGE_SIZE}&sort=id,desc`
  );
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp'],
    maxFiles: 1,
    multiple: false,
    onDropAccepted: (files: File[]) => { if (files?.length) uploadMedia(files[0]) }
  });

  const medias: Array<Media> = [].concat(...(data as any ?? []));
  const isLoadingInitialData = !data && !error;
  const isLoadingMore = isLoadingInitialData || (size > 0 && typeof data?.[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
  const isRefreshing = isValidating && data?.length === size;

  const uploadMedia = async (file: File) => {
    // if (file.type.match('image.*'))
    const { width, height } = await imageSize(file);
    const metadata = {
      width,
      height,
      alt: file.name
    }

    const body = new FormData();
    body.append('media', file);
    body.append('metadata', new File([JSON.stringify(metadata)], 'metadata.json', { type: 'application/json' }));

    try {
      const media = (await axios.post<Media>('http://localhost:8080/medias', body)).data;

      mutate();

      handleSelect(media);
    } catch (e) {
      console.error('Error uploading image:', e);
    }
  }

  const handleSelect = (media: Media) => {
    onSelect?.(media);
    setDisplay?.(false);
  }

  const handleLoadMore = () => {
    if (!(isLoadingMore || isReachingEnd)) {
      setSize(size + 1);
    }
  }

  const handleOnScroll = (event: UIEvent<HTMLDivElement>) => {
    const scrollProgress = calculateScrollProgress(event);
    if (scrollProgress > 80) {
      handleLoadMore();
    }
  }

  return <>
    <div className='card'>
      <Dialog
        visible={display}
        onHide={() => setDisplay?.(false)}
        breakpoints={{ '960px': '90vw' }}
        style={{ width: '85vw', height: '80vh' }}
        dismissableMask={true}
        showHeader={false}
        contentClassName='border-round p-4'
      >
        <div className='grid grid-nogutter h-full load-media'>
          <div className='col max-h-full'>
            <div {...getRootProps({ className: 'dropzone w-full h-full surface-border surface-ground border-dashed border-round border-1 hover:border-blue-400 active:border-blue-600 cursor-pointer' })}>
              <input {...getInputProps()} />
              <div className='flex align-items-center justify-content-center flex-column h-full'>
                <i className='pi pi-image mt-3 p-5 surface-200 text-400 border-circle' style={{ fontSize: '5em' }}></i>
                <span className='my-5 text-xl text-600'>Drag and Drop Image Here</span>
              </div>
            </div>
          </div>
          {[medias]?.length &&
            <div className='col-9 pr-1 h-full overflow-y-auto overflow-x-hidden medias-container' onScroll={handleOnScroll}>
              <div className='grid pl-4'>
                {medias?.map((e, i: number) => (
                  <div key={e.id ?? i} className='col-3'>
                    <div className='border-round hover:surface-200 cursor-pointer p-3' onClick={() => handleSelect(e)}>
                      <Image
                        id={(e.id ?? i)?.toString()}
                        src={e.url}
                        alt={e.metadata?.alt?.toString() ?? ''}
                        width='100%'
                        height='100%'
                        layout='responsive'
                        objectFit='contain'
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className='mt-4 mb-2'>
                <div className='flex justify-content-center'>
                  <Button
                    label={isLoadingMore ? 'Loading...' : isReachingEnd ? 'No more medias' : 'Load more'}
                    iconPos="right"
                    loading={isLoadingMore}
                    disabled={isLoadingMore || isReachingEnd}
                    onClick={handleLoadMore}
                  />
                </div>
              </div>
            </div>
          }
        </div>
      </Dialog>
    </div>
  </>
}

export default LoadMedia;
