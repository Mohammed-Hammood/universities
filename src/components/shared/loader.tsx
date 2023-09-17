
export const Loader = ({ size }: { size: number }) => {
    
    const cards = Array.from({ length: size }, (_, i: number) => i);

    return (
        <div className='loader'>
            {cards.map((item) => <div className='loader__card' key={item}>
                <div className="loader__card__title"></div>
                <div className="loader__card__details"></div>
            </div>)}
        </div>
    )
}