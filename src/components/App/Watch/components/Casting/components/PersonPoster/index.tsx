import React, { FunctionComponent } from 'react';
import { Person } from 'components/App/interfaces';
import { Button, Col } from 'antd';
import styles from '../../index.module.scss';
import { HoverableImage } from '../../../../../../../designSystem';

export interface IPersonProps {
    person: Person
    role: string
}

const mock_pictures = [
    'https://s3.r29static.com/bin/entry/9e6/720x864,85/2172764/image.webp',
    'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/mh-wolverine-split-4-1559751275.jpg?crop=0.292xw:0.583xh;0.0481xw,0.103xh&resize=640:*',
    'http://broocksagency.com/wp-content/uploads/2018/10/Derek-Ugochukwu_1.jpg',
    'https://www.thenewsminute.com/sites/default/files/styles/news_detail/public/Parul_Yadav_750.jpg?itok=_zqN1BVd',
    'https://media2.s-nbcnews.com/j/newscms/2018_32/2522881/180807-ruby-rose-se-203p_84ba510721b6d71d8983f423877f3628.fit-760w.jpg',
    'http://fr.web.img3.acsta.net/pictures/19/08/22/10/21/5666493.jpg',
];

export const PersonPoster: FunctionComponent<IPersonProps> = ({ person, role }) => (
    <Col className={styles.item}>
        <HoverableImage
            alt={person.last_name}
            coverContent={
                <Button
                    className={styles.button}
                    shape="round"
                    icon="search"
                >Details</Button>
            }
            containerClassName={styles.castingCoverContainer}
            imageClassName={styles.castingCover}
            imageLoadingClassName={styles.castingLoadingImage}
            src={mock_pictures[(Date.now()) % mock_pictures.length]}
        />
        <p>{person.first_name} {person.last_name}</p>
        <p>{role}</p>
    </Col>
);

export default PersonPoster;
