import React, { PureComponent } from 'react';
import { Icon, Typography } from 'antd';
import posed from 'react-pose';

import { Movie } from '../../../../interfaces';

export interface MoviePosterProps {
    movie: Movie,
};

export interface MoviePosterState {
    hovering: boolean,
};

const Div = posed.div({
    hoverable: true,
    init: { filter: 'grayscale(80%) blur(2px)', scale: 1 },
    hover: { filter: 'grayscale(50%) blur(0px)', scale: 1.1 }
});


export default class MoviePoster extends PureComponent<MoviePosterProps, MoviePosterState> {
    state: Readonly<MoviePosterState> = {
        hovering: false,
    };

    handleHover = (value: boolean) => {
        this.setState({
            hovering: value,
        });
    }

    renderHoverContent = () => {
        const { movie } = this.props;
        const minutes = Math.floor(movie.duration / 60);
        const seconds = movie.duration - minutes * 60;

        return (
            <div className="movie-poster-hover-content">
                <Typography.Title level={4}>{movie.title}</Typography.Title>
                <Typography.Text>{minutes}.{seconds}mn</Typography.Text>
                <Icon type="play-circle" className="movie-poster-icon" />
            </div>
        );
    };

    render() {
        const { hovering } = this.state;
        const { movie } = this.props;

        return (
             <Div
                    className="movie-poster"
                    style={{ backgroundImage: `url('${movie.images[0] || 'https://wx3.sinaimg.cn/large/0078HDDZly1fryg0w2z2vj31hc0u0jus.jpg'}')` }}
                    onMouseEnter={() => this.handleHover(true)}
                    onMouseLeave={() => this.handleHover(false)}
                >
                {hovering && this.renderHoverContent()}
            </Div>
        );
    }
}
