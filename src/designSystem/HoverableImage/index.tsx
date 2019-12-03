import React, {
    FunctionComponent,
    ReactNode,
    useState,
} from 'react';
import posed from 'react-pose';
import styles from './index.module.scss';

export interface IHoverableImageProps {
    alt: string
    childButton: ReactNode
    containerClassName?: string
    goTo?: () => void
    imageClassName?: string
    src: string
}

const Cover = posed.div({
    open: {
        opacity: 1,
    },
    closed: {
        opacity: 0,
    },
});

const HoverableImage: FunctionComponent<IHoverableImageProps> = ({
    alt,
    childButton,
    containerClassName,
    imageClassName,
    goTo,
    src,
}) => {
    const [ cardHovered, handleCardHovered ] = useState(false);
    const showCardHover = () => handleCardHovered(true);
    const hideCardHover = () => handleCardHovered(false);

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
            {!imageLoaded && <div className={styles.loading} />}
            {(
                <Cover
                    className={styles.hover}
                    pose={cardHovered ? 'open' : 'closed'}
                    onClick={goTo}
                >
                    {childButton}
                </Cover>
            )}
        </div>
    );
};

export default HoverableImage;
