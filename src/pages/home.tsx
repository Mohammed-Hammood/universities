import { useContext, useState } from 'react';
import { FiltersContext, UinversityContext } from '@/context';
import { useFetch } from '@/hooks/useFetch';
import { Modal, Loader, Controllers, Button } from '@/components';


export default function HomePage(): JSX.Element {
    const [universityDetails, setUniversityDetails] = useState<null | University>(null);
    const { universities, total } = useContext(UinversityContext);
    const { filters, setFilters } = useContext(FiltersContext);
    const { loading } = useFetch();

    return (
        <main className="home-page">
            <Controllers />
            <div className='center-content'>
                <div className='universitiesWrapper'>
                    {loading ?
                        <Loader size={universities.length || filters.limit} /> :
                        <>{universities.map((item, index) => {
                            return (
                                <div className='card' key={index}>
                                    <div className='card__name'><span className='text'>University </span> <span className='text-value'>{item.name}</span></div>
                                    <div className='card__country'><span className='text'>Country</span><span className='text-value'> {item.country}</span></div>
                                    <span onClick={() => setUniversityDetails(item)} className='detail'>More...</span>
                                </div>
                            )
                        })}
                        </>}
                </div>
            </div>
            <div className='loadmore'>
                {universities.length < total && <Button
                    type='button'
                    onClick={() => setFilters({ ...filters, skip: universities.length })}
                >
                    Load more
                </Button>}
            </div>
            <Modal
                form={'university-details'}
                isOpen={universityDetails !== null}
                close={() => setUniversityDetails(null)}
                {...{ university: universityDetails }}
            />
        </main>


    )
}