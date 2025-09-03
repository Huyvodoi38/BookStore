import { Admin, Resource } from 'react-admin';
import dataProvider from './DataProvider/DataProvider';
import { authProvider } from './Authentication/AuthProvider';
import i18nProvider from './Language/i18nProvider';
import CustomLayout from './Layout/CustomLayout';
import Dashboard from './Dashboard/Dashboard';

import { allResources, resourcesByRole } from './Authentication/ResourceByRole';

const renderResources = (permissions?: string) => {
    if (!permissions) return null;
    const role = permissions;
    const resources = resourcesByRole[role] ?? [];
    return resources.map((res) => {
        const resourceConfig = typeof res === 'string' ? allResources[res] : res;
        return <Resource key={resourceConfig.name} {...resourceConfig} />;
    });
};

const App = () => (
    <Admin
        dataProvider={dataProvider}
        authProvider={authProvider}
        i18nProvider={i18nProvider}
        layout={CustomLayout}
        dashboard={Dashboard}
        requireAuth
    >
        {(permissions) => renderResources(permissions as string | undefined)}
    </Admin>
);

export default App;
