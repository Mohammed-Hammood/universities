import { Button } from '@/components';
import styles from './styles.module.scss';

type Props = {
    university: University;
    setUniversityDetails: (value: University) => void
}

export const Card = ({ university, setUniversityDetails }: Props): JSX.Element => {

    return (
        <div className={styles.card}>
            <div className={styles.title}>
                {university.name}
            </div>
            <div className='card__country'>
                    {university.country}
            </div>
            <Button
                type="button"
                onClick={() => setUniversityDetails(university)}
                className={styles.detail}
            >
                More...
            </Button>
        </div>
    )
}