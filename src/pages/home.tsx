import { useContext, useState } from 'react';
import { FiltersContext, UinversityContext } from '@/context';
import { useFetch } from '@/hooks/useFetch';
import { Modal, Loader } from '@/components';


export default function HomePage(): JSX.Element {
    const [universityDetails, setUniversityDetails] = useState<null | University>(null);
    const { universities } = useContext(UinversityContext);
    const { filters: { limit } } = useContext(FiltersContext);
    const { loading } = useFetch();

    return (
        <main className="home-page">
            <div className='center-content'>
                {loading ? <Loader size={limit} /> : <>{
                    universities.map((item, index) => {
                        return (
                            <div className='card' key={index}>
                                <div className='card__name'><span className='text'>University </span> <span className='text-value'>{item.name}</span></div>
                                <div className='card__country'><span className='text'>Country</span><span className='text-value'> {item.country}</span></div>
                                <span onClick={() => setUniversityDetails(item)} className='detail'>More...</span>
                            </div>
                        )
                    })
                }</>
                }
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