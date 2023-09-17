
type Props = {
    university: University
}

const UniversityDetailForm = ({ university }: Props) => {

    const url = (url:string):string =>`http://${url}`;
    
    return (
        <>
            <div className='text-container' >
                <p>University {university.name}</p>
                <p>Country {university.country}</p>
                <p>Domains {university.domains.map(item => <a key={item} href={url(item)} target="__blank">{item} </a>)}</p>
                <p>Web pages {university.web_pages.map(item => <a key={item} href={url(item)} target="__blank">{item} </a>)}</p>
            </div>

        </>
    )
}

export default UniversityDetailForm;