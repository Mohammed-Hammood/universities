import { useContext, useState } from 'react';
import { FiltersContext, UinversityContext } from '@/context';
import { useFetch } from '@/hooks/useFetch';
import { Modal, Loader, Controllers, Button, Card } from '@/components';


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

                        universities.map(item =>
                            <Card
                                {...{
                                    university: item,
                                    key: item.id,
                                    setUniversityDetails
                                }}
                            />)
                    }

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