import React, { PureComponent } from 'react';
import { ImageComponentProps } from 'react-photo-gallery';
import posed from 'react-pose';
import { Movie } from '../../../../interfaces';
import { Popover, Typography } from 'antd';


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
                <Popover
                    title={movie.title}
                    content={
                        <div>
                            <Typography.Paragraph>Duration: {movie.duration}s</Typography.Paragraph>
                            {
                                movie.result_quality && <Typography.Paragraph>Quality of result: {movie.result_quality}%</Typography.Paragraph>
                            }
                        </div>
                    }
                >
                    <Image
                        onClick={() => goToWatch(index)}
                        src={photo.src}
                        height={photo.height}
                        width={photo.width}
                        className="movie-poster"
                    />
                </Popover>
        </div>
        );
    }
}
