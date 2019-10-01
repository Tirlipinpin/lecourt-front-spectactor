import React from 'react';
import { Layout, PageHeader } from 'antd';

export interface IRenderPageStructuresProps {
    Header: JSX.Element
    Child?: JSX.Element
    title?: string
    pageContainerClass?: string
    pageHeaderClass?: string
    pageContentClass?: string
}

export const RenderPageStructures = ({
    Header,
    Child,
    title,
    pageContainerClass,
    pageHeaderClass,
    pageContentClass,
}: IRenderPageStructuresProps) => (
    <Layout className={`page-container ${pageContainerClass}`}>
            <PageHeader className={pageHeaderClass} title={title}>
                { Header }
            </PageHeader>
            <div className={pageContentClass}>
                { Child }
            </div>
        </Layout>
);
