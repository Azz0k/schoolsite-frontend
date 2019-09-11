import React from 'react';
import { SchoolSiteServiceConsumer } from '../schoolsite-service-context/schoolsite-service-context';

const WithSchoolSiteService = Wrapped => {
    return props => {
        return (
            <SchoolSiteServiceConsumer>
                {schoolSiteService => {
                    return (
                        <Wrapped
                            {...props}
                            schoolSiteService={schoolSiteService}
                        />
                    );
                }}
            </SchoolSiteServiceConsumer>
        );
    };
};

export default WithSchoolSiteService;
