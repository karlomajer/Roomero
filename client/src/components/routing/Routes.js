import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import Alert from '../layout/Alert';
import Listings from '../listings/Listings';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Profile from '../profile/Profile';
import Listing from '../listing/Listing';
import ListingReservations from '../profile-listings/ListingItemReservations';
import CreateListing from '../listing-forms/CreateListing';
import EditProfile from '../profile/EditProfile';
import ProfileReservations from '../profile-reservations/ProfileReservations';
import ProfileListings from '../profile-listings/ProfileListings';
import PrivateRoute from './PrivateRoute';

const Routes = () => {
  return (
    <Fragment>
      <Alert />
      <Route exact path='/' component={Listings} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/profile/:id' component={Profile} />
      <Route exact path='/listing/:id' component={Listing} />
      <PrivateRoute
        exact
        path='/listing/:id/reservations'
        component={ListingReservations}
      />
      <PrivateRoute exact path='/new-listing' component={CreateListing} />
      <PrivateRoute exact path='/edit-profile' component={EditProfile} />
      <PrivateRoute
        exact
        path='/profile/me/reservations'
        component={ProfileReservations}
      />
      <PrivateRoute
        exact
        path='/profile/me/listings'
        component={ProfileListings}
      />
    </Fragment>
  );
};

export default Routes;
