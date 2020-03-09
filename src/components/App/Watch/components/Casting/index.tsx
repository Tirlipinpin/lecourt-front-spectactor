import React, { FunctionComponent, Fragment } from 'react';
import { Row } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Collapse } from 'antd';
import { ActorRelation, DirectorRelation, StaffRelation } from '../../../interfaces';
import PersonPoster from './components/PersonPoster';
import styles from './index.module.scss';

const { Panel } = Collapse;

export interface CastingProps {
    actors: ActorRelation[]
    directors: DirectorRelation[]
    staff: StaffRelation[]
}

export const Casting: FunctionComponent<CastingProps> = (props) => {
    const { t } = useTranslation();

    const { staff, actors, directors } = props;

    if (![...staff, ...actors, ...directors].length) {
        return <div>{t('NO_CASTING')}</div>;
    }

    return (
        <Fragment>
            <Row
                className={styles.movieStaff}
                justify="start"
                gutter={[16, 16]}
            >
                {actors.map((actor, index) => <PersonPoster person={actor.person} role={`Role : ${actor.role}`}/>)}
            </Row>
            <Collapse
                accordion
                bordered={false}
                className={styles.CastingCollapse}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                expandIconPosition="right"
            >
                <Panel className={styles.castingCollapsePanel} header="Réalisateurs" key="realisators">
                    <Row
                        justify="start"
                        gutter={[16, 16]}
                    >
                        {directors.map((person, index) => <PersonPoster person={person.person} role="Réalisateur"/>)}
                    </Row>
                </Panel>
                {staff.length && (
                    <Panel className={styles.castingCollapsePanel} header="Staff" key="staff">
                        <Row
                            justify="start"
                            gutter={[16, 16]}
                        >
                            {staff.map((person, index) => <PersonPoster person={person.person} role={`Staff : ${person.job}`}/>)}
                        </Row>
                    </Panel>
                )}
            </Collapse>
        </Fragment>
    );
};

export default Casting;
