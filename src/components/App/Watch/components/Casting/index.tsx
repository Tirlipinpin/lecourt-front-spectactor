import React, { FunctionComponent, Fragment } from 'react';
import { Button, Row, Col, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { Collapse, HoverableImage } from 'designSystem';
import { ActorRelation, DirectorRelation, StaffRelation, Person } from '../../../interfaces';
import styles from './index.module.scss';
import PersonPoster from './components/PersonPoster';

const { Paragraph, Text, Title } = Typography;

export interface CastingProps {
    actors: ActorRelation[]
    directors: DirectorRelation[]
    staff: StaffRelation[]
}

export const Casting: FunctionComponent<CastingProps> = (props) => {
    const { t } = useTranslation();

    const { staff, actors, directors } = props;

    if (![...staff, ...actors, ...directors].length) {
        return <div>{t('NO_CASTING')}</div>
    }

    return (
        <Fragment>
            <Row
                className={styles.movieStaff}
                type="flex"
                justify="start"
                gutter={[16, 16]}
            >
                {actors.map((actor, index) => <PersonPoster person={actor.person} role={`Role : ${actor.role}`}/>)}
            </Row>
            <Collapse
                title="Voir tout le casting"
            >
                <div>
                    <Title level={4}>Réalisateurs</Title>
                    <Row
                        className={styles.movieStaff}
                        type="flex"
                        justify="start"
                        gutter={[16, 16]}
                    >
                        {directors.map((person, index) => <PersonPoster person={person.person} role="Réalisateur"/>)}
                    </Row>
                    <Title level={4}>Staff</Title>
                    <Row
                        className={styles.movieStaff}
                        type="flex"
                        justify="start"
                        gutter={[16, 16]}
                    >
                        {staff.map((person, index) => <PersonPoster person={person.person} role={`Staff : ${person.job}`}/>)}
                    </Row>
                </div>
            </Collapse>
        </Fragment>
    );
};

export default Casting;
