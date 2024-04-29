import { Card, Image, Skeleton, Typography } from "antd"
import { FC } from "react"

export type ProductCardProps = {
    name: string,
    image: string,
    price: string,
    category: string
}

const ProductCard: FC<ProductCardProps> = (props) => {

    return (
        <Card 
            cover={
                <Image
                    width={340}
                    height={255}
                    src={props.image}
                    preview={false}
                    placeholder={<Skeleton.Image style={{ justifyContent: 'center', width: 340, height: 255, display: 'flex' }} active={true} />}
                />
            }
            style={{ width: 340, margin: '16px 0' }}
        >
            <Typography.Text>{Number(props.price).toFixed(2)}</Typography.Text>
            <Card.Meta description={props.category} />
            <Typography.Text>{props.name}</Typography.Text>
        </Card>
    )
}

export default ProductCard