import { useContext } from "react";
import { FiltersContext, UinversityContext } from "@/context";
import { Button, ICON } from "@/components";
import { countries } from "@/utils";
import styles from "./conrollers.module.scss";


export const Controllers = (): JSX.Element => {
    const { setFilters, filters } = useContext(FiltersContext)
    const { total, setUniversities } = useContext(UinversityContext)
    const { order, limit, country, } = filters;

    const set = (key: "order" | "limit" | "country", value: string | number): void => {
        setUniversities([]);
        setFilters({ ...filters, [key]: value, skip:0 })
    }

    return (
        <div className={styles.container}>
            <div className={styles.sectionWrapper}>
                Total {total}
            </div>
            <div className={styles.sectionWrapper}>
                <label className={styles.label}>Order</label>
                <Button type="button" onClick={() => set("order", order === 'id' ? "-id" : "id")} >
                    <ICON name={order === 'id' ? "sort-up-solid" : "sort-down-solid"} color='white' />
                </Button>
            </div>
            <div className={styles.sectionWrapper}>
                <label className={styles.label}>Per page</label>
                <select
                    className={styles.select}
                    value={limit}
                    onChange={e => set("limit", parseInt((e.target as HTMLSelectElement).value))}
                >
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>
            <div className={styles.sectionWrapper}>
                <label className={styles.label}>Country</label>
                <select
                    className={styles.select}
                    value={country}
                    onChange={e => set("country", (e.target as HTMLSelectElement).value)}
                >
                    <option value={"all"}>All</option>
                    {countries.map(item =>
                        <option key={item} value={item}>
                            {item}
                        </option>
                    )}
                </select>
            </div>
        </div>
    )
}