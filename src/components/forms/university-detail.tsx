
type Props = {
    university: University
}

const UniversityDetailForm = ({ university }: Props) => {

    return (
        <div className='university-details' >
            <div className="title">{university.name}</div>
            <div className="country">{university.country}</div>
            <div className="web-pages">Web pages</div>
            {university.web_pages.map(item =>
                <div className="links">
                    <a key={item} href={(item)} target="__blank">
                        {item}
                    </a>
                </div>
            )}
        </div>
    )
}

export default UniversityDetailForm;