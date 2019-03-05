import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

import './index.css';

import { Person, Actor, Staff } from '../../../interfaces';


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
                    <div key={staffActor.person.id}>
                        <Link to="#">{staffActor.person.firstName} {staffActor.person.lastName}</Link>
                    </div>
                ))
            }
            {
                directors.map(director => (
                    <div key={director.id}>
                        <Link to="#">{director.firstName} {director.lastName}</Link>
                    </div>
                ))
            }
            </div>
        );
    }
}
