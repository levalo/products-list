import { Layout } from 'antd'
import ProductsGrid from './components/ProductsGrid'
import Categories from './components/Categories'

import './App.css'

function App() {
    return (
        <Layout style={{ height: '100%'}} hasSider>
            <Layout.Sider>
                <Categories />
            </Layout.Sider>
            <Layout.Content style={{ height: '100%', overflow: 'auto' }}>
                <div style={{ margin: '0 16px', padding: 16 }}>
                    <ProductsGrid />
                </div>
            </Layout.Content>
        </Layout>
    )
}

export default App
