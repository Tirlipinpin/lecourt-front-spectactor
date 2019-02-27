import React, { PureComponent } from "react";
import StackGrid from 'react-stack-grid';
import posed from 'react-pose';

import './index.css';

const Div = posed.div({
    hoverable: true,
    init: { scale: 1 },
    hover: { scale: 1.1 }
});

export default class StaffGallery extends PureComponent<{}, {}> {
    pictures: string[] = [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Josh_Brolin_Berlin_2016.jpg/220px-Josh_Brolin_Berlin_2016.jpg',
        'https://m.media-amazon.com/images/M/MV5BMjY0MTY4MTYwMV5BMl5BanBnXkFtZTcwNzk2Mjg4Mw@@._V1_UY317_CR6,0,214,317_AL_.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/220px-Donald_Trump_official_portrait.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Josh_Brolin_Berlin_2016.jpg/220px-Josh_Brolin_Berlin_2016.jpg',
        'https://m.media-amazon.com/images/M/MV5BMjY0MTY4MTYwMV5BMl5BanBnXkFtZTcwNzk2Mjg4Mw@@._V1_UY317_CR6,0,214,317_AL_.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/220px-Donald_Trump_official_portrait.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Josh_Brolin_Berlin_2016.jpg/220px-Josh_Brolin_Berlin_2016.jpg',
        'https://m.media-amazon.com/images/M/MV5BMjY0MTY4MTYwMV5BMl5BanBnXkFtZTcwNzk2Mjg4Mw@@._V1_UY317_CR6,0,214,317_AL_.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/220px-Donald_Trump_official_portrait.jpg',
    ];

    render() {
        return (
            <div
                className="movie-staff"
            >
                <StackGrid
                    columnWidth={120}
                >
                {
                    this.pictures.map((picture, index) => (
                        <div key={index}>
                            <Div
                                className="movie-staff-member"
                                style={{ backgroundImage: `url(${ picture })` }}
                            />
                            <h3>Josh Brolin</h3>
                        </div>
                    ))
                }
                </StackGrid>
            </div>
        );
    }
}
