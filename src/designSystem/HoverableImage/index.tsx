import React, {
    FunctionComponent,
    ReactNode,
    useState,
} from 'react';
import posed from 'react-pose';
import styles from './index.module.scss';

export interface IHoverableImageProps {
    alt: string
    coverContent: ReactNode
    containerClassName?: string
    goTo?: () => void
    imageClassName?: string
    imageLoadingClassName?: string
    src: string
}

const Hover = posed.div({
    open: {
        opacity: 1,
    },
    closed: {
        opacity: 0,
    },
});

const HoverableImage: FunctionComponent<IHoverableImageProps> = ({
    alt,
    coverContent,
    containerClassName,
    goTo,
    imageClassName,
    imageLoadingClassName,
    src,
}) => {
    const [ cardHovered, handleCardHovered ] = useState(true);
    const showCardHover = () => handleCardHovered(true);
    const hideCardHover = () => handleCardHovered(true);

    const [ imageLoaded, handleImageLoaded ] = useState(false);
    const setImageLoaded = () => handleImageLoaded(true);

    return (
        <div
            className={`${styles.cardContainer} ${containerClassName}`}
            onMouseEnter={showCardHover}
            onMouseLeave={hideCardHover}
        >
            <img
                alt={alt}
                className={`${styles.poster} ${imageClassName} ${!imageLoaded ? styles.loading : ''}`}
                onLoad={setImageLoaded}
                src={src}
            />
            {!imageLoaded && <div className={`${styles.loading} ${imageLoadingClassName}`} />}
            {(
                <Hover
                    className={styles.hover}
                    pose={cardHovered ? 'open' : 'closed'}
                    onClick={goTo}
                >
                    {coverContent}
                </Hover>
            )}
        </div>
    );
};

export default HoverableImage;
