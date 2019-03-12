import React, { Component, Dispatch } from 'react';
import { connect } from 'react-redux';
import { Carousel, Layout, Icon } from 'antd';
import { History } from 'history';

import { FETCH_MOVIES } from '../../../reducers/homepage/constantes';
import MoviesCarousel from '../shared/MoviesCarousel';
import './index.css';
import { HomepageStore } from '../../../reducers/homepage';


export interface HomepageProps {
    history: History,
    dispatch: Dispatch<any>,
    homepage: HomepageStore,
}

export class Homepage extends Component<HomepageProps, {}> {
    async componentDidMount() {
        const { dispatch } = this.props;

        dispatch({
            type: FETCH_MOVIES,
            payload: {},
        });

        dispatch({
            type: FETCH_MOVIES,
            payload: {
                latest: true,
            },
        });
    }

    render() {
        const { history, homepage } = this.props;

        return (
            <Layout className="page-container">
                <Carousel
                    autoplay
                    dots
                    className="homepage-carousel"
                    speed={2000}
                    draggable={false}
                >
                    <img src="http://www.champselyseesfilmfestival.com/2018/wp-content/uploads/sites/11/2018/04/caro2.jpg" />
                    <img src="https://wx3.sinaimg.cn/large/0078HDDZly1fryg0w2z2vj31hc0u0jus.jpg" />
                    <img src="http://www.zippyframes.com/images/stories/italy/inanimate_lucia_bulgheroni.jpg" />
                    <img src="https://i.ytimg.com/vi/qeAjs_9XLbk/maxresdefault.jpg" />
                </Carousel>
                <Layout className="movies-carousel">
                    <h1>Our selection</h1>
                    <MoviesCarousel movies={homepage.movies} history={history} />
                </Layout>
                <Layout className="movies-carousel">
                    <h1>Latest shorts</h1>
                    <MoviesCarousel movies={homepage.latestMovies} history={history} />
                </Layout>
            </Layout>
        );
    }
};

export default connect(({ homepage }: any) => ({
    homepage,
}))(Homepage);
