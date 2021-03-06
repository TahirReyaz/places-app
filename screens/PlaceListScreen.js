import React, { useEffect } from 'react';
import {
  StyleSheet,
  Platform,
  FlatList
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';

import HeaderButton from '../components/CustomHeaderButton';
import PlaceItem from '../components/PlaceItem';
import * as placesActions from '../store/places-actions';

const PlaceListScreen = props => {
  const places = useSelector(state => state.places.places);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(placesActions.loadPlaces());
  }, [dispatch]);

  return (
    <FlatList 
      data={places} 
      renderItem={itemData => (
        <PlaceItem 
          title={itemData.item.title}
          address={null}
          img={itemData.item.imgUri}
          onSelect={() => {
            props.navigation.navigate('Details', {
              title: itemData.item.title,
              id: itemData.item.id
            });
          }}
        />
      )} 
    />
  );
};

PlaceListScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Places',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item 
          title='NewPlace' 
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'} 
          onPress={() => navData.navigation.navigate('NewPlace')}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  
});

export default PlaceListScreen;