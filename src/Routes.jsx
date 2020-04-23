import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from 'src/components/layout/Layout';
import UsersTable from 'src/components/table/UsersTable';
import Bugs from 'src/components/bugs/Bugs';
import ModalBugCard from 'src/components/bugs/ModalBugCard';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/bugs" />} />
        <Route path="/users" component={UsersTable} />
        <Route path="/bugs" component={Bugs} />
      </Switch>
      <Route exact path="/bugs/:id" component={ModalBugCard} />
    </Layout>
  )
}

export default Routes;
