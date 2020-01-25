import React, {FunctionComponent, KeyboardEvent, useEffect, useState} from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchNavbarGenres } from './actions';
import logo from 'assets/Logo.png';
import styles from './index.module.scss';
import { navbarLogout, onChangeSearchTerm, onSearchTerm } from './services';
import {Genre} from "../interfaces";

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

    return (
        <nav className={styles.navbar}>
            <Link className={styles.logoContainer} to="/app">
                <img alt="Lecourt" className={styles.logo} src={logo} />
            </Link>
            <div className={styles.searchBar}>
                <input
                    className={styles.searchInput}
                    defaultValue={searchTerm}
                    onChange={onChangeSearchTerm}
                    onKeyPress={onKeyPress}
                    placeholder={t('SEARCH_BAR_PLACEHOLDER')}
                    type="search" />
                <Icon className={styles.searchIcon} onClick={onSearchTerm} theme="outlined" type="search" />
            </div>
            <div className={styles.categories}>
                <div className={styles.categoryTitle}>
                    <Icon className={styles.categoryIcon} type="down" /> {t('GENRES')}
                </div>
                <div className={`${styles.dropdown} ${styles.categoriesDropdown}`}>
                    <div className={styles.dropdownContent}>
                        <div className={styles.dropdownTitle}>{t('MOST_FREQUENT_GENRES')}</div>
                        {genres.map((genre: Genre) => (
                            <Link className={styles.dropdownElement} to={`/app/genres/${genre.id}`}>{genre.name}</Link>
                        ))}
                        <Link className={styles.dropdownElement} to='/app/browse_genres'>{t('SEE_MORE')}</Link>
                    </div>
                </div>
            </div>
            <div className={styles.profilePart}>
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
                        <Link to="/app/profile" className={styles.dropdownElement}>
                            {t('YOUR_ACCOUNT')}
                        </Link>
                        <div className={styles.dropdownElement} onClick={navbarLogout}>{t('LOGOUT')}</div>
                    </div>
                </div>
            </div>

        </nav>
    );
};

export default Navbar;
