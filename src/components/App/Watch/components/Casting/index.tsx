import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

import { Person, Actor, Staff } from '../../../interfaces';
import './index.css';


export interface CastingProps {
    actors: Actor[],
    directors: Person[],
    staff: Staff[],
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
                staffActors.map(staffActor => (
                    <React.Fragment key={staffActor.person.id}>
                        <Link to="#">{staffActor.person.firstName} {staffActor.person.lastName} </Link>
                    </React.Fragment>
                ))
            }
            {
                directors.map(director => (
                    <React.Fragment key={director.id}>
                        <Link to="#">{director.firstName} {director.lastName} </Link>
                    </React.Fragment>
                ))
            }
            </div>
        );
    }
}
