import React, {FunctionComponent, KeyboardEvent, useEffect, useState} from 'react';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchNavbarGenres } from './actions';
import { getActiveKeyCustom, navbarLogout, onChangeSearchTerm, onSearchTerm } from './services';
import { Genre } from '../interfaces';
import logo from 'assets/Logo.png';
import styles from './index.module.scss';

interface INavbarProps extends RouteComponentProps {}

export const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter')
        onSearchTerm();
};

export const Navbar: FunctionComponent<INavbarProps> = (props) => {
    const dispatch = useDispatch();
    const { genres, searchTerm, user } = useSelector((state: any) => ({
        genres: state.navbar.genres,
        searchTerm: state.navbar.searchTerm,
        user: state.user,
    }), shallowEqual);
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(fetchNavbarGenres());
    }, [dispatch]);

    const [isProfilePictureLoaded, handleIsProfilePictureLoaded] = useState(false);

    const [isSearchBarFocused, handleIsSearchBarFocused] = useState(false);

    return (
        <nav className={styles.navbar}>
            <Link className={styles.logoContainer} to="/app">
                <img alt="Lecourt" className={styles.logo} src={logo} />
            </Link>
            <div className={`${styles.searchBar} ${isSearchBarFocused ? styles.searchBarFocused : ''}`}>
                <div className={`${styles.seachInputContainer} ${isSearchBarFocused ? styles.searchInputContainerFocused : ''}`}>
                    <input
                        className={styles.searchInput}
                        defaultValue={searchTerm}
                        onBlur={() => handleIsSearchBarFocused(false)}
                        onChange={onChangeSearchTerm}
                        onFocus={() => handleIsSearchBarFocused(true)}
                        onKeyPress={onKeyPress}
                        placeholder={t('SEARCH_BAR_PLACEHOLDER')}
                        type="search" />
                </div>
                <SearchOutlined className={styles.searchIcon} onClick={onSearchTerm} />
            </div>
            <div className={`${styles.categories} ${getActiveKeyCustom().includes('genres') ? styles.categoriesActive : ''}`}>
                <div className={styles.categoryTitle}>
                    <DownOutlined className={styles.categoryIcon} /> {t('GENRES')}
                </div>
                <div className={`${styles.dropdown} ${styles.categoriesDropdown}`}>
                    <div className={styles.dropdownContent}>
                        <div className={styles.dropdownTitle}>{t('MOST_FREQUENT_GENRES')}</div>
                        {genres.map((genre: Genre) => (
                            <Link
                                className={`${styles.dropdownElement} ${getActiveKeyCustom().includes(`:${genre.id}`) ? styles.dropdownElementActive : ''}`}
                                key={genre.id}
                                to={`/app/genres/${genre.id}`}
                            >{t(genre.code)}</Link>
                        ))}
                        <Link className={styles.dropdownElement} to='/app/browse_genres'>{t('SEE_MORE')}</Link>
                    </div>
                </div>
            </div>
            <div className={`${styles.profilePart} ${getActiveKeyCustom() === 'profile' ? styles.profilePartActive : ''}`}>
                <div className={styles.userInfo}>
                    <img
                        alt=""
                        className={styles.userProfilePicture}
                        onLoad={() => handleIsProfilePictureLoaded(true)}
                        src={user.avatarUrl}
                    />
                    {!isProfilePictureLoaded && <div className={styles.userProfilePictureLoading} />}
                    <div className={styles.userName}>{user.firstName}</div>
                </div>
                <div className={`${styles.profileDropdown} ${styles.dropdown}`}>
                    <div className={styles.dropdownContent}>
                        <Link
                            className={`${styles.dropdownElement} ${getActiveKeyCustom() === 'profile' ? styles.dropdownElementActive : ''}`}
                            to="/app/profile"
                        >{t('YOUR_ACCOUNT')}</Link>
                        <div className={styles.dropdownElement} onClick={navbarLogout}>{t('LOGOUT')}</div>
                    </div>
                </div>
            </div>

        </nav>
    );
};

export default Navbar;
