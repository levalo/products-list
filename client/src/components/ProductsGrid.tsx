import { Divider, Input, List, Select, Space } from "antd"
import { FC, useEffect, useMemo, useState } from "react"
import ProductCard from "./ProductCard"
import { useSearchParams } from "react-router-dom"

const backendUrl = process.env.REACT_APP_BACKEND_URL

type ProductsResponse = {
    items: {
        name: string
        description: string,
        price: string,
        image: string,
        category: {
            name: string
        }
    }[]
    total: number
}

const PER_PAGE = '12'

const sortOptions = [
    { label: 'Price', value: 'price' },
    { label: 'Name', value: 'name' }
]

const sortDirections = [
    { label: 'Asc', value: 'asc' },
    { label: 'Desc', value: 'desc' }
]

const ProductsGrid: FC = () => {
    const [ data, setData ] = useState<ProductsResponse>()

    const [ searchParams, setSearchParams ] = useSearchParams()
    
    const page = useMemo(() => searchParams.get('p') || '0', [ searchParams ])
    const pageSize = useMemo(() => Number(searchParams.get('ps') || PER_PAGE), [ searchParams ])
    const term = useMemo(() => searchParams.get('t') || '', [ searchParams ])
    const category = useMemo(() => searchParams.get('c') || '', [ searchParams ])
    const sort = useMemo(() => searchParams.get('s') || 'price', [ searchParams ])
    const sortOrd = useMemo(() => searchParams.get('so') || 'asc', [ searchParams ])

    const handleChange = (args: { page?: number, pageSize?: number, term?: string, sort?: string, sortOrd?: string }) => {
        setSearchParams({ 
            'p': args.page?.toString() || page.toString(), 
            'ps': args.pageSize?.toString() || pageSize.toString(), 
            't': typeof args.term === 'string' ? args.term : term, 
            's': args.sort || sort, 
            'so': args.sortOrd || sortOrd, 
            'c': category 
        })
    }

    useEffect(() => {
        let mounted = true

        fetch(`${backendUrl}/products?${page ? `page=${page}&` : ''}${pageSize ? `perPage=${pageSize}&` : ''}${term ? `term=${term}&` : ''}${category ? `category=${category}&` : ''}${sort ? `sort=${sort}&` : ''}${sortOrd ? `sortOrd=${sortOrd}&` : ''}`).then(async (res) => {
            const { data } = await res.json() as { data: ProductsResponse }
            
            if (mounted) {
                setData(data)
            }
        })

        return () => {
            mounted = false
        }
    }, [ searchParams ])

    return (
        <>
            <Input placeholder='search' style={{ border: 0 }} value={term} onChange={({ target }) => handleChange({ page: 1, term: target.value })}/>
            <Divider />
            <List
                style={{ margin: 0 }}
                grid={{
                    gutter: 16
                }}
                dataSource={data?.items}
                header={
                    <Space direction='horizontal' style={{ width: '100%' }}>
                        <Select options={sortOptions} popupMatchSelectWidth={false} value={sort} onChange={(sort) => handleChange({ sort })}/>
                        <Select options={sortDirections} popupMatchSelectWidth={false} value={sortOrd} onChange={(sortOrd) => handleChange({ sortOrd })}/>
                    </Space>
                }
                renderItem={(item) => (
                    <List.Item key={item.name} >
                        <ProductCard 
                            name={item.name} 
                            image={item.image} 
                            price={item.price} 
                            category={item.category.name}
                        />
                    </List.Item>
                )}
                pagination={{
                    onChange: (page, pageSize) => handleChange({ page, pageSize }),
                    pageSize: pageSize,
                    total: data?.total,
                    current: Number(page)
                }}
            />
        </>
    )
}

export default ProductsGrid