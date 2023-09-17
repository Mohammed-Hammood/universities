import SearchForm from "./search-form";
import UniversityDetail from "./university-detail";

type Props = {
    form: FormsNames;
    props: any;
}
export const Forms = (props: Props) => {

    const _forms: Record<FormsNames, JSX.Element> = {
        "search": <SearchForm {...props.props} />,
        "university-details": <UniversityDetail {...props.props} />,
    }

    return _forms[props.form];
}
