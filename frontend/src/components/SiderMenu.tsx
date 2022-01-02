import { Layout, Menu,} from 'antd';
import {
    HomeOutlined,
    FileOutlined,
    StockOutlined,
    ToolFilled,
} from '@ant-design/icons';
import React from "react";
import {Link} from "react-router-dom";

const {Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

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
                    <Menu theme="dark" defaultSelectedKeys={['1']} defaultOpenKeys={['gerer']} mode="inline">
                        <Menu.Item key={1} icon={<HomeOutlined />} >
                            <Link to='/'>Accueil</Link>
                        </Menu.Item>
                        <Menu.Item key={2} icon={<FileOutlined />} >
                            <Link to='/creerDT'>Nouvelle FT</Link>
                        </Menu.Item>
                        <Menu.Item key={3} icon={<StockOutlined />} >
                            <Link to='/mercurial'>Mercurial</Link>
                        </Menu.Item>
                        <Menu.Item key={4} icon={<StockOutlined />} >
                            <Link to='/allergenList'>Allergènes</Link>
                        </Menu.Item>
                        <SubMenu key={"gerer"} icon={<ToolFilled />} title="Gérer" >
                            <Menu.Item key={7}>
                                <Link to='/gerer/unite'>
                                    Unité
                                </Link>
                            </Menu.Item>
                            <Menu.Item key={8}>
                                <Link to='/gerer/catFT'>
                                    Cat FT
                                </Link>
                            </Menu.Item>
                            <Menu.Item key={9}>
                                <Link to='/gerer/catIngredient'>
                                    Cat Ingrédient
                                </Link>
                            </Menu.Item>
                            <Menu.Item key={10}>
                                <Link to='/gerer/catAllergene'>
                                    Cat Allergène
                                </Link>
                            </Menu.Item>
                            <Menu.Item key={11}>
                                <Link to='/gerer/auteur'>
                                    Auteur
                                </Link>
                            </Menu.Item>
                        </SubMenu>
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

