import Cookies from 'js-cookie';
import { history, store } from '../../../../store';
import { updateSearchTerm } from '../actions';
import { logout } from 'components/App/actions';

const { dispatch } = store;

export const onChangeSearchTerm = (e: any) => {
    dispatch(updateSearchTerm(e.target.value));
};

export const onSearchTerm = () => {
    const { searchTerm } = store.getState().navbar;

    if (searchTerm.length > 0)
        history.push(`/app/search/${searchTerm}`);
};

export const redirectToGenre = (value: string) => {
    history.push(`/app/genres/${value}`);
};

export const getActiveKey = (): string[] => {
    const { location } = store.getState().router;
    const { genres } = store.getState().navbar;
    const currentActive = location.pathname.split('/')[2];

    if (!currentActive) return ['homepage'];
    if (currentActive === 'genres') {
        const genreId = location.pathname.split('/')[3];
        const isGenreIdListed = genres.find(genre => genre.id === genreId);
        return isGenreIdListed ? [`genres:${genreId}`] : ['browse_genres'];
    }

    return [currentActive];
};

export const navbarLogout = () => {
    dispatch(logout());

    Cookies.remove('user_authorization', {
      domain: process.env.REACT_APP_DOMAIN_URL,
    });
    window.location.href = process.env.REACT_APP_FRONT_URL!;
};
