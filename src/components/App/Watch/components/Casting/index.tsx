import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

import { ActorRelation, DirectorRelation, StaffRelation } from '../../../interfaces';
import './index.css';


export interface CastingProps {
    actors: ActorRelation[]
    directors: DirectorRelation[]
    staff: StaffRelation[]
};

export default class Casting extends PureComponent<CastingProps, {}> {
    render() {
        const { staff, actors, directors } = this.props;
        const staffActors = [...actors, ...staff];

        return (
            <div
                className="movie-staff"
            >
            {
                staffActors.map((staffActor, index) => (
                    <React.Fragment key={index}>
                        <Link to="#">{staffActor.node.firstName} {staffActor.node.lastName} </Link>
                    </React.Fragment>
                ))
            }
            {
                directors.map((director, index) => (
                    <React.Fragment key={index}>
                        <Link to="#">{director.node.firstName} {director.node.lastName} </Link>
                    </React.Fragment>
                ))
            }
            </div>
        );
    }
}
