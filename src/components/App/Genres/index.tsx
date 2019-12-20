import React, { FunctionComponent, memo, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { fetchMoviesWithGenres } from './actions';
import { RenderPageStructures } from '../services';
import { MoviesGallery } from 'designSystem';
import { Loader } from 'designSystem';

export type IGenresPropsParams = {
    genreId: string
}

export interface IGenresProps extends RouteComponentProps<IGenresPropsParams> {}

export const Genres: FunctionComponent<IGenresProps> = ({ match, history }) => {
    const { params: { genreId } } = match;
    const dispatch = useDispatch();
    const { movies, loading } = useSelector((state: any) => ({
        movies: state.genres.movies,
        loading: state.genres.loading,
    }));
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(fetchMoviesWithGenres(genreId));
    }, [dispatch]);

    if (loading) {
        return <RenderPageStructures
            Header={(
                <Loader />
            )}
            title={`${t('OUR_MOVIES_FOR_THIS_GENRE')}`}
            pageContainerClass="genres-page-container"
            pageHeaderClass="genres-page-header"
            pageContentClass="genres-page-content"
        />;
    }

    if (!loading && movies.length < 1) {
        return <RenderPageStructures
            Header={(
                <React.Fragment>
                    <Typography.Paragraph>
                        No content found
                    </Typography.Paragraph>
                </React.Fragment>
            )}
            title={`${t('OUR_MOVIES_FOR_THIS_GENRE')}`}
            pageContainerClass="genres-page-container"
            pageHeaderClass="genres-page-header"
            pageContentClass="genres-page-content"
        />;
    }

    return <RenderPageStructures
        Header={(
            <React.Fragment>
                <Typography.Paragraph>
                    Results: {movies.length}
                </Typography.Paragraph>
            </React.Fragment>
        )}
        Child={(
            <MoviesGallery movies={movies} history={history} />
        )}
        title={`${t('OUR_MOVIES_FOR_THIS_GENRE')}`}
        pageContainerClass="genres-page-container"
        pageHeaderClass="genres-page-header"
        pageContentClass="genres-page-content"
    />;

};

export default memo(Genres);
