import { Layout, Menu,} from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
} from '@ant-design/icons';
import React from "react";
import {Link} from "react-router-dom";

const {Content, Footer, Sider } = Layout;

class SiderMenu extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = (collapsed: any) => {
        this.setState({ collapsed });
    };

    render() {
        const { collapsed } = this.state;
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider breakpoint="lg"
                       collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                    <div>logo</div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key={1} icon={<PieChartOutlined />} >
                            <Link to='/'>Accueil</Link>
                        </Menu.Item>
                        <Menu.Item key={2} icon={<FileOutlined />} >
                            <Link to='/creerDT'>Nouvelle FT</Link>
                        </Menu.Item>
                        <Menu.Item key={3} icon={<DesktopOutlined />} >
                            <Link to='/mercurial'>Mercurial</Link>
                        </Menu.Item>
                        <Menu.Item key={4} icon={<DesktopOutlined />} >
                            <Link to='/allergenList'>Allergènes</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
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

