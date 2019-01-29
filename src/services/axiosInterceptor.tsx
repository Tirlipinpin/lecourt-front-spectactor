import React from 'react';
import axios from 'axios';
import { Modal } from 'antd';

export default (logout: () => void) =>  {
    axios.interceptors.response.use((response: any) => {
        return response;
    }, (error: any) => {
        if (error.response.status === 401) {
            Modal.error({
                title: 'You have been disconnected',
                content: (
                    <div>
                        <p>Please log in to continue watching shorts!</p>
                    </div>
                ),
                onOk() {
                    logout();
                },
            });
        }
    });
}
