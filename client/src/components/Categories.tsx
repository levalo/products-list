import { Menu, MenuProps } from "antd"
import { FC, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"

type CategoriesResponse = {
    name: string
}[]

const Categories: FC = () => {

    const [ data, setData ] = useState<CategoriesResponse>()

    const [ searchParams, setSearchParams ] = useSearchParams()

    const category = useMemo(() => searchParams.get('c') || 'All', [ searchParams ])

    const menuItems: MenuProps['items'] = useMemo(() => [{
            key: 'All',
            label: 'All',
        }, 
        ...(data?.map(x => ({
            key: x.name,
            label: x.name
        })) || [])
    ], [data])

    const handleChange = (category: string) => {

        if (category === 'All') {

            setSearchParams()

            return
        }

        setSearchParams({ c: category })
    }

    useEffect(() => {
        let mounted = true

        fetch(`${process.env.REACT_APP_BACKEND_URL}/categories`).then(async (res) => {
            const { data } = await res.json() as { data: CategoriesResponse }
            
            if (mounted) {
                setData(data)
            }
        })

        return () => {
            mounted = false
        }
    }, [])

    return (
        <Menu
            theme='dark'
            items={menuItems}
            selectedKeys={[ category ]}
            onClick={({ key }) => handleChange(key)}
        />
    )
}

export default Categories