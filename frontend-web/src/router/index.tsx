import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Dashboard from '@/pages/Dashboard';
import Widget from '@/pages/Widget';
import Data from '@/pages/Data';
import DataSource from '@/pages/Data/DataSource';
import DataSet from '@/pages/Data/DataSet';
import Status404 from '@/pages/Status404';
import WidgetCreate from '@/pages/Widget/WidgetCreate';
import WidgetView from '@/pages/Widget/WidgetView';
import WidgetModify from '@/pages/Widget/WidgetModify';
import DashboardView from '@/pages/Dashboard/DashboardView';
import DashboardCreate from '@/pages/Dashboard/DashboardCreate';
import DashboardModify from '@/pages/Dashboard/DashboardModify';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path=":dashboard_id" element={<DashboardView />} />
      </Route>
      <Route path="/dashboard/create" element={<DashboardCreate />}>
        <Route path=":create_type" element={<DashboardCreate />} />
      </Route>
      <Route path="/dashboard/modify" element={<DashboardModify />}>
        <Route path=":dashboard_id" element={<DashboardModify />} />
      </Route>

      <Route path="/widget" element={<Widget />}>
        <Route path=":widget_id" element={<WidgetView />} />
      </Route>
      <Route path="/widget/create" element={<WidgetCreate />} />
      <Route path="/widget/modify" element={<WidgetModify />}>
        <Route path=":widget_id" element={<WidgetModify />} />
      </Route>

      <Route path="/data" element={<Data />} />
      <Route path="/data/source/create" element={<DataSource />} />
      <Route path="/data/source/modify" element={<DataSource />}>
        <Route path=":source_id" element={<DataSource />} />
      </Route>

      <Route path="/data/set/create" element={<DataSet />} />
      <Route path="/data/set/modify" element={<DataSet />}>
        <Route path=":set_id" element={<DataSet />} />
      </Route>
      <Route path="/*" element={<Status404 />} />
    </Routes>
  );
}

export default Router;
