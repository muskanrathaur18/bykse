import React from 'react';
import {
  View,
  Text,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const WeddingDropSearchModal = ({
  visible,
  onClose,
  searchQuery,
  setSearchQuery,
  handleSelectDropAddress,
  filteredSearchPlaces,
  recentDropLocations,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <SafeAreaView style={{"flex":1,"backgroundColor":"#FFFFFF"}}>
        {/* TOP HEADER: Back Arrow & "Drop to" Title */}
        <View style={{"flexDirection":"row","alignItems":"center","paddingHorizontal":16,"paddingTop":12,"paddingBottom":16}}>
          <TouchableOpacity
            style={{"padding":4}}
            onPress={onClose}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-back" size={24} color="#0F172A" />
          </TouchableOpacity>
          <Text style={{"fontSize":22,"fontWeight":"800","color":"#0F172A","marginLeft":16}}>Drop to</Text>
        </View>

        {/* INPUT ROW: Red Bullseye Dot + Rounded Input Box */}
        <View style={{"flexDirection":"row","alignItems":"center","paddingHorizontal":16,"marginBottom":16}}>
          <View style={{"width":28,"alignItems":"center","justifyContent":"center"}}>
            <Ionicons name="radio-button-on" size={18} color="#DC2626" />
          </View>
          <View style={{"flex":1,"borderWidth":1.5,"borderColor":"#94A3B8","borderRadius":14,"paddingHorizontal":16,"paddingVertical":10,"marginLeft":10,"backgroundColor":"#FFFFFF","flexDirection":"row","alignItems":"center"}}>
            <TextInput
              style={{"flex":1,"fontSize":16,"color":"#0F172A","padding":0}}
              placeholder=""
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
              returnKeyType="search"
              onSubmitEditing={() => {
                if (searchQuery.trim().length > 0) {
                  handleSelectDropAddress({
                    title: searchQuery.trim(),
                    address: `${searchQuery.trim()}, Delhi NCR`,
                  });
                }
              }}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')} style={{ padding: 4 }}>
                <Ionicons name="close-circle" size={18} color="#94A3B8" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* SUGGESTIONS & SEARCH RESULTS LIST */}
        <ScrollView
          style={{"flex":1,"paddingHorizontal":16}}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {searchQuery.trim().length > 0 ? (
            <View>
              {/* Custom typed option if not exact match */}
              <TouchableOpacity
                style={{"flexDirection":"row","alignItems":"center","paddingVertical":14}}
                activeOpacity={0.7}
                onPress={() =>
                  handleSelectDropAddress({
                    title: searchQuery.trim(),
                    address: `${searchQuery.trim()}, Delhi NCR`,
                  })
                }
              >
                <View style={{"width":32,"alignItems":"flex-start","justifyContent":"center"}}>
                  <Ionicons name="location-outline" size={22} color="#D97706" />
                </View>
                <View style={{"flex":1,"marginRight":10}}>
                  <Text style={{"fontSize":16,"fontWeight":"700","color":"#0F172A","marginBottom":2}}>{searchQuery.trim()}</Text>
                  <Text style={{"fontSize":13,"color":"#64748B","lineHeight":18}}>Use this address in Delhi NCR</Text>
                </View>
              </TouchableOpacity>
              <View style={{"borderBottomWidth":1,"borderColor":"#E2E8F0"}} />

              {/* Filtered Delhi NCR locations */}
              {filteredSearchPlaces.map((item, idx) => (
                <View key={idx}>
                  <TouchableOpacity
                    style={{"flexDirection":"row","alignItems":"center","paddingVertical":14}}
                    activeOpacity={0.7}
                    onPress={() => handleSelectDropAddress(item)}
                  >
                    <View style={{"width":32,"alignItems":"flex-start","justifyContent":"center"}}>
                      <Ionicons name="location-outline" size={22} color="#64748B" />
                    </View>
                    <View style={{"flex":1,"marginRight":10}}>
                      <Text style={{"fontSize":16,"fontWeight":"700","color":"#0F172A","marginBottom":2}}>{item.title}</Text>
                      <Text style={{"fontSize":13,"color":"#64748B","lineHeight":18}} numberOfLines={1}>
                        {item.address}
                      </Text>
                    </View>
                    <Ionicons name="heart-outline" size={20} color="#94A3B8" />
                  </TouchableOpacity>
                  <View style={{"borderBottomWidth":1,"borderColor":"#E2E8F0"}} />
                </View>
              ))}
            </View>
          ) : (
            <View>
              {recentDropLocations.map((item, idx) => (
                <View key={idx}>
                  <TouchableOpacity
                    style={{"flexDirection":"row","alignItems":"center","paddingVertical":14}}
                    activeOpacity={0.7}
                    onPress={() => handleSelectDropAddress(item)}
                  >
                    <View style={{"width":32,"alignItems":"flex-start","justifyContent":"center"}}>
                      <Ionicons name="time-outline" size={22} color="#64748B" />
                    </View>
                    <View style={{"flex":1,"marginRight":10}}>
                      <Text style={{"fontSize":16,"fontWeight":"700","color":"#0F172A","marginBottom":2}}>{item.title}</Text>
                      <Text style={{"fontSize":13,"color":"#64748B","lineHeight":18}} numberOfLines={1}>
                        {item.address}
                      </Text>
                    </View>
                    <Ionicons name="heart-outline" size={20} color="#94A3B8" />
                  </TouchableOpacity>
                  <View style={{"borderBottomWidth":1,"borderColor":"#E2E8F0"}} />
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};
