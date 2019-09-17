import { Card, Icon } from 'antd';
import React, {Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { Genre } from '../interfaces';
import { FETCH_GENRES } from '../../../reducers/browseGenres/constants';
import './index.css';

const { Meta } = Card;

export interface IBrowseGenresProps extends RouteComponentProps {}

export default ({ history }: IBrowseGenresProps) => {
    const { genres, loading } = useSelector((state: any) => ({
        genres: state.browseGenres.genres,
        loading: state.browseGenres.loading,
    }));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: FETCH_GENRES })
    }, []);

    if (loading)
        return <Icon type="loading" />;

    const genresCards = genres.map((genre: Genre) => (
      <Card
        key={genre.id}
        className="genre-card"
        hoverable
        bordered={false}
        cover={
            <img
              className="genre-card-image"
              alt={genre.name}
              src="https://di.phncdn.com/is-static/images/categories/(m=qQXH4HUbetZD8zjadOf)(mh=tM-BItrY3G7KqAcK)roku_221.jpg"
            />
        }
        onClick={() => history.push(`/app/movies/genre/${genre.id}`)}
      >
          <Meta
            title={
                <Fragment>
                    {genre.name}
                </Fragment>
            }
            className="genre-card-meta"
          />
      </Card>
    ));

    return (
      <div className="page-container browseGenres-page-container">
          {genresCards}
      </div>
    )
};