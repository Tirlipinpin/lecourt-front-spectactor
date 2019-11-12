import React, { PureComponent } from "react";

import { ActorRelation, DirectorRelation, StaffRelation } from '../../../interfaces';
import { Card, Icon, Avatar } from "antd";
import Meta from "antd/lib/card/Meta";
import styles from './index.module.scss';

export interface CastingProps {
    actors: ActorRelation[]
    directors: DirectorRelation[]
    staff: StaffRelation[]
};

export default class Casting extends PureComponent<CastingProps, {}> {
    render() {
        const { staff, actors, directors } = this.props;

        return (
            <div
                className={styles.movieStaff}
            >
            {
                actors.map((actor, index) => (
                    <React.Fragment key={index}>
                        <Card
                            className={styles.movieStaffCard}
                            cover={<img className={styles.movieStaffCardImage} src="http://plus.lesoir.be/sites/default/files/dpistyles_v2/ena_16_9_extra_big/2017/06/09/node_98808/2835712/public/2017/06/09/B9712244201Z.1_20170609092446_000+GG197EKKF.1-0.jpg?itok=J5KL9BP9" />}
                            actions={[<Icon type="instagram" />, <Icon type="facebook" />]}
                        >
                            <Meta
                                avatar={<Avatar src="https://herstand.com/projects/actor/symbol.svg" />}
                                title={`${actor.node.firstName} ${actor.node.lastName}`}
                                description={actor.role}
                            />
                        </Card>
                    </React.Fragment>
                ))
            }
            {
                directors.map((director, index) => (
                    <React.Fragment key={index}>
                    <Card
                        className={styles.movieStaffCard}
                        cover={<img className={styles.movieStaffCardImage} src="https://pmcvariety.files.wordpress.com/2017/04/steven-spielberg.jpg?w=1000&h=562&crop=1" />}
                        actions={[<Icon type="instagram" />, <Icon type="facebook" />]}
                    >
                        <Meta
                            avatar={<Avatar src="https://www.shareicon.net/download/2016/01/02/696985_chair.svg" />}
                            title={`${director.node.firstName} ${director.node.lastName}`}
                            description='Realisateur'
                        />
                    </Card>
                    </React.Fragment>
                ))
            }
            {
                staff.map((staff, index) => (
                    <React.Fragment key={index}>
                    <Card
                        className={styles.movieStaffMember}
                        cover={<img className="movie-staff-card-image" src="https://resize.over-blog.com/400x400-ct.jpg?http://we.over-blog.com/0/00/12/98/2011-03/Porto-Bike-Tour--flickrurl-httpflickr-comphotos679.jpg" />}
                        actions={[<Icon type="instagram" />, <Icon type="facebook" />]}
                    >
                        <Meta
                            avatar={<Avatar src="https://png.pngtree.com/svg/20160225/staff_979285.png" />}
                            title={`${staff.node.firstName} ${staff.node.lastName}`}
                            description={staff.job}
                        />
                    </Card>
                    </React.Fragment>
                ))
            }
            </div>
        );
    }
}
