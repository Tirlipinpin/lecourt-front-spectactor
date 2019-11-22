import React, { PureComponent, Fragment } from 'react';
import { Button, Row, Col, Typography, Collapse } from 'antd';

import { ActorRelation, DirectorRelation, StaffRelation, Person } from '../../../interfaces';
import styles from './index.module.scss';

const { Paragraph, Text, Title } = Typography;
const { Panel } = Collapse;

export interface CastingProps {
    actors: ActorRelation[]
    directors: DirectorRelation[]
    staff: StaffRelation[]
};

const mock_pictures = [
    'https://s3.r29static.com/bin/entry/9e6/720x864,85/2172764/image.webp',
    'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/mh-wolverine-split-4-1559751275.jpg?crop=0.292xw:0.583xh;0.0481xw,0.103xh&resize=640:*',
    'http://broocksagency.com/wp-content/uploads/2018/10/Derek-Ugochukwu_1.jpg',
    'https://www.thenewsminute.com/sites/default/files/styles/news_detail/public/Parul_Yadav_750.jpg?itok=_zqN1BVd',
    'https://media2.s-nbcnews.com/j/newscms/2018_32/2522881/180807-ruby-rose-se-203p_84ba510721b6d71d8983f423877f3628.fit-760w.jpg',
    'http://fr.web.img3.acsta.net/pictures/19/08/22/10/21/5666493.jpg',
];

export default class Casting extends PureComponent<CastingProps, {}> {
    renderPerson(key: number, person: { node: Person }, role: string) {
        return (
            <Col xl={4} md={8} sm={12} key={key} className={styles.item}>
                <div className={styles.movieStaffCard} style={{ backgroundImage: `url(${mock_pictures[(Date.now() + key) % mock_pictures.length]})`}}>
                    <div className={styles.overlay}>
                        <Button className={styles.button} shape="round" icon="search" >Details</Button>
                    </div>
                </div>
                <Text strong>{person.node.firstName} {person.node.lastName}</Text>
                <Paragraph type="secondary">{role}</Paragraph>
            </Col>
        )
    }

    render() {
        const { staff, actors, directors } = this.props;

        return (
            <Fragment>
                <Row
                    className={styles.movieStaff}
                    type="flex"
                    justify="start"
                    gutter={[16, 16]}
                >
                    {actors.map((actor, index) => this.renderPerson(index, actor, `Role : ${actor.role}`))}
                </Row>
                <Collapse bordered={false} style={{ borderBottom: 'none', width: '100%' }}>
                    <Panel key="1" header="Afficher le staff complet" style={{ borderBottom: 'none' }}>
                        <Title level={4}>Réalisateurs</Title>
                        <Row
                            className={styles.movieStaff}
                            type="flex"
                            justify="start"
                            gutter={[16, 16]}
                        >
                            {directors.map((person, index) => this.renderPerson(index, person, 'Réalisateur'))}
                        </Row>
                        <Title level={4}>Staff</Title>
                        <Row
                            className={styles.movieStaff}
                            type="flex"
                            justify="start"
                            gutter={[16, 16]}
                        >
                            {staff.map((person, index) => this.renderPerson(index, person, `Staff : ${person.job}`))}
                        </Row>
                    </Panel>
                </Collapse>
            </Fragment>
        );
    }
}
