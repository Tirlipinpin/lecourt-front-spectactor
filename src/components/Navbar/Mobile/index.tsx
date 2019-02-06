import React, { Component, Dispatch } from 'react';
import { Layout, Menu, Drawer, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const { Header } = Layout;
import { LOGOUT } from '../../../reducers/login/constantes';
import logo from '../Logo.png';

interface MobileNavbarProps {
    match: any,
    history: any,
    dispatch: Dispatch<any>,
    location: any,
};

interface MobileNavbarState {
    menuOpen: boolean,
};

export class MobileNavbar extends Component<MobileNavbarProps, MobileNavbarState> {
    state = {
        menuOpen: false,
    };

    logout = () => {
        const { dispatch, history } = this.props;

        dispatch({
            type: LOGOUT,
        });

        history.push('/login');
    }

    isActive = (): Array<string> => {
        const { location } = this.props;

        return [
            location.pathname.split('/')[2] || 'homepage',
        ];
    }

    toggleMenu = () => {
        this.setState({ menuOpen: !this.state.menuOpen });
    }

    render() {
        const { history } = this.props;
        const { url } = this.props.match;
        const { menuOpen } = this.state;

        return (
            <div>
                <Drawer
                    title='Lecourt'
                    placement='right'
                    closable
                    visible={ menuOpen }
                    onClose={this.toggleMenu}
                >
                    <Menu>
                        <Menu.Item key="homepage"><Link to={url}>Homepage</Link></Menu.Item>
                        <Menu.Item key="profile"><Link to={`${url}/profile`}>Profile</Link></Menu.Item>
                        <Menu.Item key="logout" onClick={this.logout}>Logout</Menu.Item>
                    </Menu>
                </Drawer>
                <Header
                    style={{
                        position: 'fixed',
                        zIndex: 10,
                        width: '100%', 
                        padding: '0',
                    }}
                >
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        style={{ lineHeight: '64px' }}
                        selectedKeys={this.isActive()}
                    >
                        <Menu.Item style={{ marginLeft: 'auto' }}><img src={logo} className="logo" onClick={() => history.push(url)} /></Menu.Item>
                        <Menu.Item onClick={this.toggleMenu} style={{ float: 'right' }}><Icon type="menu-unfold" /></Menu.Item>
                    </Menu>
                </Header>
            </div>
        );
    }
};

export default connect()(MobileNavbar);
