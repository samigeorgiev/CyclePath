import { InputAdornment, TextField } from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons'
import { LatLngLiteral } from 'leaflet'
import React, { useCallback, useState } from 'react'
import styles from './Search.module.scss'
interface Props {
    position: LatLngLiteral | null
}

interface Result extends LatLngLiteral {
    name: string
}

const Search: React.FC<Props> = (props) => {
    const [search, setSearch] = useState<string>('')
    const [results, setResults] = useState<Result[]>([])

    const getDestinationFromSearch = useCallback((search: string) => {
        if (!search.trim() || !props.position) {
            return
        }

        const searchQuery: string = `query=${search.split(' ').join('+')}`

        fetch(
            `${process.env.REACT_APP_API_URL}/search?${searchQuery}&location=${props.position.lat},${props.position.lng}`
        )
            .then((res: Response) => {
                if (!res.ok) return
                return res.json()
            })
            .then((data) => {
                setResults(data)
                console.log(data)
            })
    }, [])

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                getDestinationFromSearch(search)
            }}
        >
            <TextField
                id='input-with-icon-textfield'
                value={search}
                variant='outlined'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setSearch(e.target.value)
                }}
                fullWidth
                className={styles.search}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <SearchIcon color='primary' />
                        </InputAdornment>
                    )
                }}
            />
            <ul>
                {results.map((result) => (
                    <li key={`${result.lat},${result.lng}`}>{result.name}</li>
                ))}
            </ul>
        </form>
    )
}

export default Search
