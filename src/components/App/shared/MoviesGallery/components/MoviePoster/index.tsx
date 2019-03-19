import React, { PureComponent } from 'react';
import { ImageComponentProps } from 'react-photo-gallery';
import posed from 'react-pose';
import { Movie } from '../../../../interfaces';
import { Tooltip } from 'antd';


export interface MoviePosterProps extends ImageComponentProps {
    goToWatch: (id: number) => void,
    movie: Movie,
}

const Image = posed.img({
    hoverable: true,
    init: { filter: 'grayscale(80%) blur(2px)', scale: 1 },
    hover: { filter: 'grayscale(50%) blur(0px)', scale: 1.02 }
});

export default class MoviePoster extends PureComponent<MoviePosterProps, {}> {
    render() {
        const { margin, photo, index, goToWatch, movie } = this.props;

        return (
            <div
                style={{
                    margin,
                    height: photo.height,
                    width: photo.width,
                    cursor: 'pointer'
                }}
                className="movie-poster-container"
            >
                <Tooltip
                    title={movie.title}
                >
                    <Image
                        onClick={() => goToWatch(index)}
                        src={photo.src}
                        height={photo.height}
                        width={photo.width}
                        className="movie-poster"
                    />
                </Tooltip>
        </div>
        );
    }
}
