import { Dispatch, SetStateAction, UIEvent } from 'react';
import { Dialog } from 'primereact/dialog';
import Image from 'next/image';
import useSWRInfinite from 'swr/infinite';
import calculateScrollProgress from '@/utils/calculateScrollProgress';
import { Button } from 'primereact/button';
import { Media } from './LoadMedia';

const PAGE_SIZE = 12;

export type SelectProductProps = {
  display?: boolean
  setDisplay?: Dispatch<SetStateAction<boolean>>
  onSelect?: (url: string) => void
}

export const SelectProduct = ({ display, setDisplay, onSelect }: SelectProductProps) => {
  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite<Array<Media>>(
    (index) => `http://localhost:8080/medias?page=${index}&size=${PAGE_SIZE}&sort=id,desc`
  );

  const products: Array<Media> = [].concat(...(data as any ?? []));
  const isLoadingInitialData = !data && !error;
  const isLoadingMore = isLoadingInitialData || (size > 0 && typeof data?.[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
  const isRefreshing = isValidating && data?.length === size;

  const handleSelect = (src: string) => {
    onSelect?.(src);
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
        contentClassName='border-round p-0'
      >
        <div className='grid grid-nogutter h-full'>
          <div className='col-3 bg-teal-50'>
          </div>
          <div className='col-9 p-3 h-full overflow-y-auto overflow-x-hidden' onScroll={handleOnScroll}>
            <div className='grid'>
              {products?.map((e, i) => (
                <div key={i} className='col-3'>
                  <div className='cursor-pointer' onClick={() => handleSelect(e.url)}>
                    <Image
                      id={(e.id ?? i).toString()}
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
                  label={isLoadingMore ? 'Loading...' : isReachingEnd ? 'No more products' : 'Load more'}
                  iconPos="right"
                  loading={isLoadingMore}
                  disabled={isLoadingMore || isReachingEnd}
                  onClick={handleLoadMore}
                />
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  </>
}

export default SelectProduct;
