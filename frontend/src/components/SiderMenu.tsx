import { Layout, Menu,} from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
} from '@ant-design/icons';
import React from "react";
import MercurialPage from "./MercurialPage";
const { Header, Content, Footer, Sider } = Layout;

class SiderMenu extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = (collapsed: any) => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        const { collapsed } = this.state;
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                    <div>logo</div>
                    <Menu defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<PieChartOutlined />}>
                          Accueil
                        </Menu.Item>
                        <Menu.Item key="2" icon={<FileOutlined />}>
                            Créer une FT
                        </Menu.Item>
                        <Menu.Item key="3" icon={<DesktopOutlined />}>
                          Ingrédients
                        </Menu.Item>
                        <Menu.Item key="4" icon={<DesktopOutlined />}>
                            Stocks
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    {/*<Header className="site-layout-background" style={{ padding: 0 }} />*/}
                    <Content style={{ margin: '0 16px' }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Fiche Technique Manager</Footer>
                </Layout>
            </Layout>
        );
    }
}
export default SiderMenu;

